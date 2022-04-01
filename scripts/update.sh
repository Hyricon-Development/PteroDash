#!/bin/bash

directory=$(pwd)
if [[ "$directory" != *"PterodactylDash" && "$directory" != *"pterodactyldash" ]]; then
  echo "Please run this script from the main PterodactylDash directory."
  exit 1
fi
mv config.json config.json.backup
git pull
npm install
echo "You will have to merge your config.json manually. They have been backed up as config.json.backup"
