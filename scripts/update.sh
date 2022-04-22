#!/bin/bash

echo "==================="
echo "PteroDash®"
echo "Hyricon Dev © 2022"
echo "==================="
echo "Are you sure you would like to run the update script? [Y/N]"
read OPTION

elif [ "$OPTION" = "Y" ]; then

if [ -d "/var/www/PterodactylDash/Backup" ]; then
  rm -r /var/www/PterodactylDash/Backup
fi

mv /var/www/PterodactylDash /var/www/PterodactylDash/Backup
cd /var/www
git clone https://github.com/Evolution-Development/PterodactylDash.git
cd PterodactylDash
npm install

gitlog=$(git log -1 --pretty=%B)
if [[ "$gitlog" == *"config-updated"* ]]; then

  cp /var/www/PterodactylDash/Backup/config.json /var/www/PterodactylDash/config.json.backup
  echo "=========================================================================================="
  echo "You will have to merge your config.json manually, it has been saved as config.json.backup"
  echo "After you are done merging, restart PteroDash using systemctl restart pterodash"
  echo "=========================================================================================="
  else
  rm /var/www/PterodactylDash/config.json
  cp /var/www/PterodactylDash/Backup/config.json /var/www/PterodactylDash/config.json
  echo "PteroDash has been successfully updated"
  fi
fi
exit 1

