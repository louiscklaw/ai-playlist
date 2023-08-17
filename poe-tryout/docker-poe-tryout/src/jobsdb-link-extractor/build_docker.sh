#!/usr/bin/env bash

set -x

docker build . -t poe-tryout-jobsdb-link-extractor

docker image tag poe-tryout-jobsdb-link-extractor logickee/poe-tryout-jobsdb-link-extractor

docker push logickee/poe-tryout-jobsdb-link-extractor
