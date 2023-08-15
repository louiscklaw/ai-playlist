#!/usr/bin/env bash

set -ex

for ((i=1; i<=10; i++))
do
    # Replace the command below with the desired command you want to execute in each iteration
    echo "Running iteration $i"
    curl -x "http://localhost:20172" "http://httpbin.org/ip"
done
