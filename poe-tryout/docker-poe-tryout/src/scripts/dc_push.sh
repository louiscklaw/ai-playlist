#!/usr/bin/env bash

set -ex

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

