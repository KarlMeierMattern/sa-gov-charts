#!/bin/zsh

# Log file path
LOG_FILE="/Users/alexander/code/sa-gov-charts/server/scripts/logs/update.log"
   
# Navigate to your project directory
cd /Users/alexander/code/sa-gov-charts/server

# Check that logs directory exists
mkdir -p /Users/alexander/code/sa-gov-charts/server/scripts/logs

# Run the update script and log output
echo "Starting update at $(date '+%Y-%m-%d %H:%M:%S')" >> $LOG_FILE
node /Users/alexander/code/sa-gov-charts/server/scripts/seed.js >> $LOG_FILE 2>&1
echo "Finished tender update at $(date '+%Y-%m-%d %H:%M:%S')" >> $LOG_FILE
echo "" >> $LOG_FILE  # Add a blank line for spacing

# Ensure execute permissions: ls -l /Users/alexander/code/sa-gov-charts/server/scripts/update.sh
# If not executable, set permissions with: chmod +x /Users/alexander/code/sa-gov-charts/server/scripts/update.sh
# crontab -e
# 0 0 * * 5 /Users/alexander/code/sa-gov-charts/server/scripts/update.sh
# script runs everyday at midnight
# crontab -l