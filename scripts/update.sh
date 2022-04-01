#!/bin/bash

mv /var/www/PterodactylDash /var/www/PterodactylDash/Backup
cd /var/www
git clone https://github.com/Evolution-Development/PterodactylDash.git
cd PterodactylDash
npm install
cp /var/www/PterodactylDash/Backup/config.json /var/www/PterodactylDash/config.json.backup
echo "You will have to merge your config.json manually. They have been backed up as config.json.backup"
