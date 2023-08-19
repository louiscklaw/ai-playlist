#!/usr/bin/env bash

set -x

docker build . -t logickee/poe-tryout-jobsdb-scraper

docker push logickee/poe-tryout-jobsdb-scraper
