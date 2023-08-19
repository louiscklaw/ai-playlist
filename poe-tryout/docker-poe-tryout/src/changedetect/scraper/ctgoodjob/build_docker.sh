#!/usr/bin/env bash

set -x

docker build . -t logickee/poe-tryout-ctgoodjob-scraper

docker push logickee/poe-tryout-ctgoodjob-scraper
