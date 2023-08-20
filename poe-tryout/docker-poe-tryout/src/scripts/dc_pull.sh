#!/usr/bin/env bash

set -ex

docker pull logickee/openbox-poe-seat-final           &                   

docker pull browserless/chrome                        &          
docker pull ghcr.io/dgtlmoon/changedetection.io       &                       
docker pull mongo-express:latest                      &        
docker pull mongo:latest                              &
wait

docker pull mzz2017/v2raya                            &  
docker pull node:latest                               &
docker pull redis:6.2-alpine                          &    
docker pull redislabs/redisinsight:latest             &    
wait

docker pull logickee/poe-tryout-bait                  &            
docker pull logickee/poe-tryout-dbapi                 &             
wait

docker pull logickee/poe-tryout-diff-handler          &                    
docker pull logickee/poe-tryout-flow-handler          &                    
docker pull logickee/poe-tryout-jobsdb-link-extractor &                             
wait

docker pull logickee/poe-tryout-jobsdb-scraper        &                      
docker pull logickee/poe-tryout-page-handler          &                    
docker pull logickee/poe-tryout-poe-scheduler-api     &                         
docker pull logickee/poe-tryout-static-share          &                    
wait 

