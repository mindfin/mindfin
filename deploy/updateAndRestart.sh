#!/bin/bash

# any future command that fails will exit the script
set -e


echo "remove repo"
# Delete the old repo
rm -rf ~/mindfin/mindfin

echo "clone repo"
# clone the repo again
git clone git@gitlab.com:mindfin1/mindfin.git ~/mindfin/mindfin 



#source the nvm file. In an non
#If you are not using nvm, add the actual path like
# PATH=/home/ubuntu/node/bin:$PATH
#source /home/ubuntu/.nvm/nvm.sh

# stop the previous pm2
echo "pm2 stop mindfin_live"
pm2 stop mindfin_live

echo "changeing to mindfin"
cd ~/mindfin/mindfin

#install npm packages
echo "Running npm install"
npm install

echo "pm2 start"
#Restart the node server
pm2 -- start --name midfin_test
