#!/bin/bash

# Set up environment
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm

# Log file path with date stamp
LOG_DIR="/Users/alexander/code/sa-gov-charts/server/scripts/logs"
LOG_FILE="$LOG_DIR/update.log"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Function to log to both console and file
log_message() {
    echo "$1"
    echo "$1" >> "$LOG_FILE"
}

# Navigate to project directory
cd /Users/alexander/code/sa-gov-charts/server || {
    log_message "Failed to change directory"
    exit 1
}

# Add timestamp and blank line for readability
log_message "----------------------------------------"
log_message "Starting update at $(date '+%Y-%m-%d %H:%M:%S')"

# Run the update script with full node path and error handling
if node /Users/alexander/code/sa-gov-charts/server/scripts/seed.js 2>&1 | tee -a "$LOG_FILE"; then
    log_message "Update completed successfully at $(date '+%Y-%m-%d %H:%M:%S')"
else
    log_message "Update failed at $(date '+%Y-%m-%d %H:%M:%S')"
fi

log_message "----------------------------------------"
log_message ""

# Cleanup old test files (keep only last 10)
cd "$LOG_DIR" && ls -t cron_test_* | tail -n +11 | xargs -r rm --

# Ensure execute permissions: ls -l /Users/alexander/code/sa-gov-charts/server/scripts/update.sh
# If not executable, set permissions with: chmod +x /Users/alexander/code/sa-gov-charts/server/scripts/update.sh
# crontab -e
# 0 0 * * 5 /Users/alexander/code/sa-gov-charts/server/scripts/update.sh
# script runs everyday at midnight
# crontab -l
# monitor logs: tail -f /Users/alexander/code/sa-gov-charts/server/scripts/logs/update.log
# mail