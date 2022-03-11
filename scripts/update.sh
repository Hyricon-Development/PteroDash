currentDir=$(pwd)
if [[ "$currentDir" != *"PterodactylDash" && "$currentDir" != *"pteroactyldash" ]]; then
  echo "Please run this script from the main PterodactylDash directory."
  exit 1
fi
mv config.json config.json.backup
git pull
echo "You will have to merge your config.json manually. They have been backed up as config.json.backup"
npm install
echo "You're all done and ready to go!"