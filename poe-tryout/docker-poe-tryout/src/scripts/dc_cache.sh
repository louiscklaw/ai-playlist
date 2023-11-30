#!/usr/bin/env bash

set -ex

myArray=(
    "logickee/openbox-poe-seat-final"
    "logickee/poe-tryout-bait"
    "logickee/poe-tryout-dbapi"
    "logickee/poe-tryout-diff-handler"
    "logickee/poe-tryout-flow-handler"
    "logickee/poe-tryout-jobsdb-link-extractor"
    "logickee/poe-tryout-jobsdb-scraper"
    "logickee/poe-tryout-page-handler"
    "logickee/poe-tryout-poe-scheduler-api"
    "logickee/poe-tryout-static-share"
    )
    # "browserless/chrome"
    # "ghcr.io/dgtlmoon/changedetection.io"
    # "mongo-express:latest"
    # "mongo:latest"
    # "mzz2017/v2raya"
    # "node:latest"
    # "ubuntu/redis:6.0-21.04_beta"

# Run echo command with the array elements
for element in "${myArray[@]}"
do
    # docker pull $element
    docker tag $element "192.168.10.61:5000/$element"
    docker push "192.168.10.61:5000/$element"

    docker push "$element"
done

wait

echo
read -p "Press Enter to continue..."
echo
