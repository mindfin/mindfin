#!/bin/bash

# any future command that fails will exit the script
set -e


echo "remove repo"
# Delete the old repo
rm -rf /root/mindfin/mindfin

echo "clone repo"
# clone the repo again
git clone git@gitlab.com:mindfin1/mindfin.git /root/mindfin/mindfin 



#source the nvm file. In an non
#If you are not using nvm, add the actual path like
# PATH=/home/ubuntu/node/bin:$PATH
#source /home/ubuntu/.nvm/nvm.sh

# stop the previous pm2
echo "pm2 stop mindfin-webapp"
/root/.nvm/versions/node/v10.13.0/bin/pm2 stop mindfin-webapp

echo "changeing to mindfin"
cd /home/mindfinadmin/mindfin

#install npm packages
echo "Running npm install"
/root/.nvm/versions/node/v10.13.0/bin/npm install

echo "Running ng build"
/root/.nvm/versions/node/v10.13.0/bin/npm run postinstall


echo "pm2 start"
#Restart the node server
/root/.nvm/versions/node/v10.13.0/bin/pm2 start mindfin-webapp
