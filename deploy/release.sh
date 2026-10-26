#!/usr/bin/env bash
set -euo pipefail
umask 022

# upload runs on the Actions runner; the other commands run on the server.
site=${SITE_DIR:-/var/www/bartgalvin}
mode=${1:-}
release=${2:-}

fail() { printf '%s\n' "$*" >&2; exit 1; }
valid_release() { [[ $1 =~ ^[0-9a-f]{40}-[0-9]+-[0-9]+$ ]]; }

link_release() {
  local name=$1 target=$2
  ln -s "releases/$target" "$site/.$name-next"
  mv -Tf "$site/.$name-next" "$site/$name"
}

linked_release() {
  local name=$1 target
  if [[ -L $site/$name ]]; then
    target=$(readlink "$site/$name")
    if [[ $target != releases/* ]] || ! valid_release "${target#releases/}"; then
      fail "Invalid $name link."
    fi
    printf '%s' "${target#releases/}"
  elif [[ -e $site/$name ]]; then
    fail "$site/$name must be a release symlink."
  fi
}

prune_releases() {
  local current previous count=0 name directory
  current=$(linked_release current)
  previous=$(linked_release previous)
  # GitHub run IDs increase over time; reruns increase the final attempt number.
  while IFS= read -r name; do
    valid_release "$name" || continue
    if (( count < 3 )) || [[ $name == "$current" || $name == "$previous" ]]; then
      count=$((count + 1))
    else
      rm -r -- "$site/releases/$name"
    fi
  done < <(
    for directory in "$site/releases/"*; do
      [[ -f $directory/.complete ]] && printf '%s\n' "${directory##*/}"
    done | sort -t- -k2,2nr -k3,3nr
  )
}

if [[ $mode == upload ]]; then
  source_dir=${2:?Usage: release.sh upload DIST RELEASE}
  release=${3:-}
  valid_release "$release" || fail 'Invalid release ID.'
  [[ -s $source_dir/index.html && -d $source_dir/assets ]] || fail 'Build dist/ before uploading.'
  host=${DEPLOY_HOST:?Set DEPLOY_HOST.}
  port=${DEPLOY_PORT:-22}
  [[ $host =~ ^[A-Za-z0-9][A-Za-z0-9.-]*$ ]] || fail 'DEPLOY_HOST must be an IP address or hostname.'
  if [[ ! $port =~ ^[0-9]+$ ]] || (( port < 1 || port > 65535 )); then
    fail 'Invalid DEPLOY_PORT.'
  fi
  destination=portfolio-deploy@$host
  ssh_options=(-p "$port" -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15)
  script=${BASH_SOURCE[0]}
  # shellcheck disable=SC2029 # The release ID is validated before SSH interpolation.
  ssh "${ssh_options[@]}" "$destination" "bash -s -- prepare $release" < "$script"
  # --delete is limited to this incomplete upload, never the live release.
  rsync -az --delete --chmod=D755,F644 \
    -e "ssh -p $port -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15" \
    "$source_dir/" "$destination:/var/www/bartgalvin/incoming/$release/"
  # shellcheck disable=SC2029 # The release ID is validated before SSH interpolation.
  ssh "${ssh_options[@]}" "$destination" "bash -s -- activate $release" < "$script"
  exit
fi

[[ $mode == prepare || $mode == activate || $mode == rollback ]] || fail 'Use upload, prepare, activate, or rollback.'
[[ $site == /* && $site != / ]] || fail 'SITE_DIR must be an absolute site directory.'
[[ -d $site ]] || fail "Create $site for portfolio-deploy first."
mkdir "$site/.release-lock" 2>/dev/null || fail 'Another release command is running (or a stale .release-lock remains).'
trap 'rm -f -- "$site/.current-next" "$site/.previous-next"; rmdir "$site/.release-lock"' EXIT
mkdir -p "$site/incoming" "$site/releases" "$site/shared/assets"

if [[ $mode == rollback ]]; then
  current=$(linked_release current)
  previous=$(linked_release previous)
  [[ -n $current && -n $previous && -s $site/releases/$previous/index.html && -f $site/releases/$previous/.complete ]] || fail 'No previous release is available.'
  link_release current "$previous"
  link_release previous "$current"
  printf 'Rolled back to %s\n' "$previous"
  exit
fi

valid_release "$release" || fail 'Invalid release ID.'
incoming=$site/incoming/$release
completed=$site/releases/$release
[[ ! -e $completed ]] || fail 'This release already exists; start a new workflow run.'

if [[ $mode == prepare ]]; then
  mkdir -p "$incoming"
  exit
fi

[[ -s $incoming/index.html && -d $incoming/assets ]] || fail 'The upload is incomplete.'
[[ -z $(find "$incoming" -type l -print -quit) ]] || fail 'A build must not contain symlinks.'
current=$(linked_release current)
# Shared hashed assets remain available to visitors who loaded an older index.
rsync -a --ignore-existing "$incoming/assets/" "$site/shared/assets/"
printf '%s\n' "$release" > "$incoming/version.txt"
touch "$incoming/.complete"
mv "$incoming" "$completed"
[[ -z $current ]] || link_release previous "$current"
link_release current "$release"
prune_releases
printf 'Activated %s\n' "$release"
