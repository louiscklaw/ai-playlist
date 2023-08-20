#!/usr/bin/env bash

set -ex

docker push logickee/poe-tryout-bait                    
docker push logickee/poe-tryout-dbapi                   
docker push logickee/poe-tryout-flow-handler            
docker push logickee/poe-tryout-jobsdb-link-extractor   
docker push logickee/poe-tryout-page-handler            
docker push logickee/poe-tryout-poe-scheduler-api       
docker push logickee/poe-tryout-static-share            
