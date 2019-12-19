#!/bin/bash

# any future command that fails will exit the script
set -e

# Delete the old repo
rm -rf /home/mindfinadmin/mindfin
 
# clone the repo again
git clone git@gitlab.com:Harishraj/mindfin.git /home/mindfinadmin/mindfin 



#source the nvm file. In an non
#If you are not using nvm, add the actual path like
# PATH=/home/ubuntu/node/bin:$PATH
#source /home/ubuntu/.nvm/nvm.sh

# stop the previous pm2

/home/mindfinadmin/.npm-global/bin/pm2 stop mindfin-webapp


cd /home/mindfinadmin/mindfin

#install npm packages
echo "Running npm install"
/usr/bin/npm install

#Restart the node server
/home/mindfinadmin/.npm-global/bin/pm2 start mindfin-webapp
