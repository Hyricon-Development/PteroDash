#!/bin/bash

echo "================================="
echo "Offical PteroDash install script"
echo "By ! Rian#0001"
echo "================================="
echo "Please select your installation option:"
echo "[1] Full PteroDash Install (Dependencies, Files, Reverse Proxy Configuration)"
echo "[2] Install the Dependencies."
echo "[3] Install the Files"
echo "[4] Create and configure a reverse proxy"
echo "[5] Check for Updates"
echo "================================="
read OPTION

elif [ "$OPTION" = "1" ]; then
echo "============================="
echo "Starting PteroDash Install..."
echo "============================="
sudo apt -y update 
sudo apt -y install git
sudo apt-get -y install nodejs
sudo apt-get -y install jq 
sudo apt -y install nginx
sudo apt -y install npm
cd /var/www
sudo git clone https://github.com/Evolution-Development/PterodactylDash.git
cd PterodactylDash
sudo npm install
echo "What is your domain? [dash.example.com]"
read DOMAIN
echo "Do you want to use SSL? [Y/N]"
read SSL
elif [ "$SSL" = "Y" ]; then
sudo apt -y install certbot
certbot certonly -d $DOMAIN
sudo wget -O /etc/nginx/sites-enabled/pterodash.conf https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/assets/NginxHTTPS.conf
port=$(jq -r '.["webserver"]["port"]' /var/www/PterodactylDash/config.json)
sed -i 's/PORT/'$port'/g' /etc/nginx/sites-enabled/pterodash.conf
sed -i 's/DOMAIN/'$DOMAIN'/g' /etc/nginx/sites-enabled/pterodash.conf
sudo systemctl restart nginx
fi
elif [ "$SSL" = "N"]; then
sudo wget -O /etc/nginx/sites-enabled/pterodash.conf https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/assets/NginxHTTP.conf
port=$(jq -r '.["webserver"]["port"]' /var/www/PterodactylDash/config.json)
sed -i 's/PORT/'$port'/g' /etc/nginx/sites-enabled/pterodash.conf
sed -i 's/DOMAIN/'$DOMAIN'/g' /etc/nginx/sites-enabled/pterodash.conf
sudo systemctl restart nginx
fi
echo "============================"
echo "PteroDash Install Completed!"
echo "============================"
echo "You will have to manually setup config.json"
exit 1
fi

elif [ "$OPTION" = "2" ]; then
echo "=============================="
echo "Starting Dependency Install..."
echo "=============================="
sudo apt -y update 
sudo apt -y install git
sudo apt-get -y install nodejs
sudo apt -y install npm
echo "============================="
echo "Dependency Install Completed!"
echo "============================="
exit 1
fi

elif [ "$OPTION" = "3" ]; then
echo "========================"
echo "Starting File Install..."
echo "========================"
cd /var/www
sudo git clone https://github.com/Evolution-Development/PterodactylDash.git
cd PterodactylDash
sudo npm install
echo "======================="
echo "File Install Completed!"
echo "======================="
exit 1
fi

elif [ "$OPTION" = "4" ]; then
echo "======================================="
echo "Starting Reverse Proxy Configuration..."
echo "======================================="
sudo apt -y install nginx
echo "What is your domain? [dash.example.com]"
read DOMAIN
echo "Do you want to use SSL? [Y/N]"
read SSL
elif [ "$SSL" = "Y" ]; then
apt -y install certbot
certbot certonly -d $DOMAIN
sudo wget -O /etc/nginx/sites-enabled/pterodash.conf https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/assets/NginxHTTPS.conf
sudo apt-get -y -y install jq 
port=$(jq -r '.["webserver"]["port"]' /var/www/PterodactylDash/config.json)
sed -i 's/PORT/'$port'/g' /etc/nginx/sites-enabled/pterodash.conf
sed -i 's/DOMAIN/'$DOMAIN'/g' /etc/nginx/sites-enabled/pterodash.conf
sudo systemctl restart nginx
fi
elif [ "$SSL" = "N"]; then
sudo wget -O /etc/nginx/sites-enabled/pterodash.conf https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/assets/NginxHTTP.conf
sudo apt-get -y install jq 
port=$(jq -r '.["webserver"]["port"]' /var/www/PterodactylDash/config.json)
sed -i 's/PORT/'$port'/g' /etc/nginx/sites-enabled/pterodash.conf
sed -i 's/DOMAIN/'$DOMAIN'/g' /etc/nginx/sites-enabled/pterodash.conf
sudo systemctl restart nginx
fi
echo "======================================"
echo "Reverse Proxy Configuration Completed!"
echo "======================================"
exit 1
fi

elif [ "$OPTION" = "5" ]; then
sudo apt-get -y -y install jq 
lv=$(curl -s 'https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/assets/lv.json' | jq -r '.version')
if [ "$lv" =  "1.0.0" ]; then
    echo "======================================================="
    echo "You're running the latest version of PteroDash."
    echo "======================================================="
    else 
    echo "You're running an outdated version of PteroDash."
    echo "======================================================="
    echo "Would you like to update to the latest version? [Y/N]"
    echo "======================================================="
    read UPDATE_OPTION
    if [ "$UPDATE_OPTION" = "Y" ]; then
    bash <(curl -s https://raw.githubusercontent.com/Evolution-Development/PterodactylDash/main/scripts/update.sh) 
    fi
  fi
    exit 1
fi
