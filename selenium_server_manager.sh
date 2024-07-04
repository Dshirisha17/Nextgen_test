#!/bin/bash
#set -x

# To check if port 4444 is in use
check_port() {
    netstat -aon | findstr :4444 | findstr LISTENING > /dev/null 2>&1
}

WEBDRIVER_DIR="/c/Users/sandhata/AppData/Roaming/npm/node_modules/protractor/node_modules/"  # Path to webdriver-manager directory
PROJECT_PATH="E:\users\sandhata\Next_genbank_UI_testing" # Path to protractor project directory


# To check if the server is up
check_server() {
    if grep -q "Selenium Server is up and running on port 4444" ${WEBDRIVER_DIR}/selenium_server.log; then
        return 0
    else
        return 1
    fi
}

# Start webdriver-manager 
start_webdriver() {
    check_port
    if [ $? -ne 0 ]; then
        cd "$WEBDRIVER_DIR"
        echo -e "\nStarting webdriver-manager...\n"
        # Start webdriver-manager in the background and redirect output to selenium_server.log
        webdriver-manager start > ${WEBDRIVER_DIR}/selenium_server.log 2>&1 &

        # Wait for the server to start
        while ! check_server; do
            echo "Waiting for Selenium Server to start..."
            sleep 2
        done

        echo -e "\nSelenium Server is up and running on port 4444.\n"
    else 
        echo -e "\nSelenium Server is already running on port 4444."
        exit 1
    fi    
}

# Stop webdriver-manager
stop_webdriver() {
    echo -e "\nStopping webdriver-manager...\n" 
    netstat -ano | findstr :4444 | findstr LISTENING | awk '{print $5}' | xargs -I{} taskkill //PID {} //F > ${WEBDRIVER_DIR}/selenium_server.log 2>&1
    echo "Selenium Server is stopped." 
}

# To run Protractor testcases
run_protractor_cases() {
  
  RED='\033[0;31m'
  NC='\033[0m'

  # Run Protractor tests
  echo "Running Protractor testcases..." 
  npx protractor "${PROJECT_PATH}/protractor.conf.js" >> ${WEBDRIVER_DIR}/selenium_server.log 2>&1 || { echo -e "\n${RED}Protractor testcases failed${NC}"; return 1; } 
}

# Main script
start_webdriver
run_protractor_cases
stop_webdriver

echo -e "\nCheck selenium_server.log for details"   
