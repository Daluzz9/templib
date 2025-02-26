SOURCE_DIR="../ps00-core-lib/"
TARGET_DIR="../templib/"

SYNC_EXCLUDE=(
  --exclude=.git
  --exclude=.github
  --exclude=.gitmodules
  --exclude=.commitlintrc.json
  --exclude=.nuxt
  --exclude=public/robots.txt
  --exclude=.output
  --exclude=jobs.yml
  --exclude=deploy.sh
  --exclude=clone.sh
  --exclude=ecosystem.config
  --exclude=.npmrc
  --exclude=plugins/match-detail.js
  --exclude=robots.config
  --exclude=server/middleware/dev.ts
  --exclude=Dockerfile
  --exclude=app_env
  --exclude=run-docker.sh
  --exclude=node_modules
)

rsync -r "${SYNC_EXCLUDE[@]}" "$SOURCE_DIR" "$TARGET_DIR"

## Delete folders and files to synchronize deleted files as well.

# Get files in TARGET_DIR folder but not in SOURCE_DIR folder
deleted_files=$(diff -qr "$TARGET_DIR" "$SOURCE_DIR" | \
grep -E "Only in $TARGET_DIR" | \
sed -E "s|Only in (.*): (.*)|\1/\2|" | \
sed "s|$TARGET_DIR/||")

# Loop through the list of deleted files and exclude the ones in the SYNC_EXCLUDE array
for file in $deleted_files; do
  exclude_file=false
  
 # Check if the file matches any of the exclude patterns
  for exclude_pattern in "${SYNC_EXCLUDE[@]}"; do
    stripped_pattern="${exclude_pattern/--exclude=/}"
    if [[ $file == *$stripped_pattern* ]]; then
      exclude_file=true
      break
    fi
  done
  
  # If the file is not excluded, remove it
  if [[ "$exclude_file" == false ]]; then
    echo "File will be deleted: $file"
    rm -rf $file
  fi
done
