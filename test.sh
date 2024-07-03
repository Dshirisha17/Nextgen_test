#!/bin/bash
set -x

# Function to check if port 4444 is in use
check_port() {
    netstat -aon | findstr :4444 | findstr LISTENING
}

# Path to webdriver-manager directory
WEBDRIVER_DIR="/c/Users/sandhata/AppData/Roaming/npm/node_modules/protractor/node_modules/"

# Function to check if the server is up
check_server() {
    if grep -q "Selenium Server is up and running on port 4444" selenium_server.log; then
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
        echo "Starting webdriver-manager..."
        # Start webdriver-manager in the background and redirect output to selenium_server.log
        webdriver-manager start > selenium_server.log 2>&1 &

        # Wait for the server to start
        while ! check_server; do
            echo "Waiting for Selenium Server to start..."
            sleep 2
        done

        echo "Selenium Server is up and running on port 4444"
    else 
        echo "Selenium Server is already running on port 4444"
    fi    
}

# Function to stop webdriver-manager
stop_webdriver() {
    echo "Stopping webdriver-manager..."
    netstat -ano | findstr :4444 | findstr LISTENING | awk '{print $5}' | xargs -I{} taskkill //PID {} //F
    echo "Selenium Server is stopped."
}

# Function to run Protractor tests
run_protractor_cases() {
  # Define the project path
  PROJECT_PATH="C:/Users/sandhata/shirisha dodla/UI_testing_nextgen/Nextgen_test"
  
  # Run Protractor tests
  echo "Running Protractor tests..."
  npx protractor "${PROJECT_PATH}/protractor.conf.js" || { echo "Protractor tests failed"; exit 1; }
}

# Main script logic based on argument
if [ "$1" == "start" ]; then
    start_webdriver
    run_protractor_cases
    stop_webdriver
elif [ "$1" == "stop" ]; then
    stop_webdriver
else
    echo "Usage: $0 [start|stop]"
    exit 1
fi
