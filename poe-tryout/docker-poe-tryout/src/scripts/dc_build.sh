#!/usr/bin/env bash

set -ex
myArray=("./changedetect/diff-handler" "./changedetect/scraper/jobsdb" "./changedetect/scraper/ctgoodjob")

# Run echo command with the array elements
for element in "${myArray[@]}"
do
    cd "$element"
      ./build_docker.sh
    cd -
done

echo -e "\033[31m changedetect done !!! \033[0m"
read -p "Press Enter to continue..."

myArray=("./openbox-poe-seat")

# Run echo command with the array elements
for element in "${myArray[@]}"
do
    cd "$element"
      ./build_docker.sh
    cd -
done

# echo -e "\033[31m openbox-poe-seat !!! \033[0m"
# read -p "Press Enter to continue..."

# Declare an array
myArray=("./bait" "./dbapi" "./flow-handler" "./jobsdb-link-extractor")

# Run echo command with the array elements
for element in "${myArray[@]}"
do
    cd "$element"
      ./build_docker.sh
    cd -
done

myArray=("./page-handler" "./poe-scheduler-api" "./static-share")

# Run echo command with the array elements
for element in "${myArray[@]}"
do
    cd "$element"
      ./build_docker.sh
    cd -
done

docker image ls
