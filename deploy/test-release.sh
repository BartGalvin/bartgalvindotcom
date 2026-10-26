#!/usr/bin/env bash
set -euo pipefail

script=$(cd "$(dirname "$0")" && pwd)/release.sh
site=$(mktemp -d)
trap 'rm -rf -- "$site"' EXIT
export SITE_DIR=$site

# The server uses GNU mv. On macOS, use Homebrew coreutils for the same behavior.
if [[ $(uname) == Darwin ]]; then
  mkdir "$site/bin"
  ln -s "$(command -v gmv)" "$site/bin/mv"
  export PATH=$site/bin:$PATH
fi

make_release() {
  local number=$1 id
  printf -v id '%040d-%d-1' "$number" "$number"
  bash "$script" prepare "$id"
  mkdir "$site/incoming/$id/assets"
  printf '<html>Release %s</html>\n' "$number" > "$site/incoming/$id/index.html"
  printf 'asset %s\n' "$number" > "$site/incoming/$id/assets/app-$number.js"
  bash "$script" activate "$id"
}

make_release 1
first=$(readlink "$site/current")
test "$(cat "$site/current/version.txt")" = "${first#releases/}"
test ! -e "$site/previous"

incomplete=0000000000000000000000000000000000000002-2-1
bash "$script" prepare "$incomplete"
if bash "$script" activate "$incomplete"; then
  echo 'An incomplete release was accepted.' >&2
  exit 1
fi
test "$(readlink "$site/current")" = "$first"

mkdir "$site/incoming/$incomplete/assets"
printf 'not a valid upload\n' > "$site/incoming/$incomplete/index.html"
ln -s /etc/passwd "$site/incoming/$incomplete/secret"
if bash "$script" activate "$incomplete"; then
  echo 'An upload containing a symlink was accepted.' >&2
  exit 1
fi
rm -r "$site/incoming/$incomplete"

make_release 2
second=$(readlink "$site/current")
test "$(readlink "$site/previous")" = "$first"
test -f "$site/shared/assets/app-1.js"
test -f "$site/shared/assets/app-2.js"
bash "$script" rollback
test "$(readlink "$site/current")" = "$first"
test "$(readlink "$site/previous")" = "$second"
bash "$script" rollback
test "$(readlink "$site/current")" = "$second"

make_release 3
make_release 4
test ! -d "$site/$first"
test -s "$site/current/index.html"
test -s "$site/previous/index.html"
test "$(find "$site/releases" -name .complete | wc -l | tr -d ' ')" = 3
test -f "$site/shared/assets/app-1.js"

# A rollback into an older completed release must survive the next cleanup.
rm "$site/current"
ln -s "$second" "$site/current"
make_release 5
test -s "$site/previous/index.html"
test "$(readlink "$site/previous")" = "$second"
test "$(find "$site/releases" -name .complete | wc -l | tr -d ' ')" = 4
make_release 6
test "$(find "$site/releases" -name .complete | wc -l | tr -d ' ')" = 3

if bash "$script" prepare '../outside'; then
  echo 'An invalid release ID was accepted.' >&2
  exit 1
fi
mkdir "$site/.release-lock"
if bash "$script" rollback; then
  echo 'A concurrent release was accepted.' >&2
  exit 1
fi
rmdir "$site/.release-lock"

# A transfer error must never reach the activate command.
mkdir -p "$site/mocks" "$site/dist/assets"
printf '<html>test</html>\n' > "$site/dist/index.html"
cat > "$site/mocks/ssh" <<'MOCK'
#!/usr/bin/env bash
printf '%s\n' "$*" >> "$SITE_DIR/ssh.log"
MOCK
cat > "$site/mocks/rsync" <<'MOCK'
#!/usr/bin/env bash
exit 23
MOCK
chmod +x "$site/mocks/ssh" "$site/mocks/rsync"
if PATH="$site/mocks:$PATH" DEPLOY_HOST=example.invalid bash "$script" upload "$site/dist" "$incomplete"; then
  echo 'A failed upload was accepted.' >&2
  exit 1
fi
test "$(wc -l < "$site/ssh.log" | tr -d ' ')" = 1
case $(cat "$site/ssh.log") in
  *"prepare $incomplete") ;;
  *) echo 'Unexpected SSH command during a failed upload.' >&2; exit 1 ;;
esac
printf 'Release checks passed.\n'
