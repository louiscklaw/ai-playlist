#!/usr/bin/env bash

set -x

docker build . -t logickee/poe-tryout-glassdoor-scraper

docker push logickee/poe-tryout-glassdoor-scraper
