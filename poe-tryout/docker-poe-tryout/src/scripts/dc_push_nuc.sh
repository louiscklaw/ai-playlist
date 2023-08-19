#!/usr/bin/env bash

set -ex

docker push logickee/poe-tryout-bait                    
docker push logickee/poe-tryout-dbapi                   
docker push logickee/poe-tryout-flow-handler            
docker push logickee/poe-tryout-jobsdb-link-extractor   
docker push logickee/poe-tryout-page-handler            
docker push logickee/poe-tryout-poe-scheduler-api       
docker push logickee/poe-tryout-static-share            

docker tag logickee/poe-tryout-bait                    logickee/nuc_poe-tryout-bait                    &
docker tag logickee/poe-tryout-dbapi                   logickee/nuc_poe-tryout-dbapi                   &
docker tag logickee/poe-tryout-flow-handler            logickee/nuc_poe-tryout-flow-handler            &
docker tag logickee/poe-tryout-jobsdb-link-extractor   logickee/nuc_poe-tryout-jobsdb-link-extractor   &
docker tag logickee/poe-tryout-page-handler            logickee/nuc_poe-tryout-page-handler            &
docker tag logickee/poe-tryout-poe-scheduler-api       logickee/nuc_poe-tryout-poe-scheduler-api       &
docker tag logickee/poe-tryout-static-share            logickee/nuc_poe-tryout-static-share            &
wait

docker push logickee/nuc_poe-tryout-bait                    
docker push logickee/nuc_poe-tryout-dbapi                   
docker push logickee/nuc_poe-tryout-flow-handler            
docker push logickee/nuc_poe-tryout-jobsdb-link-extractor   
docker push logickee/nuc_poe-tryout-page-handler            
docker push logickee/nuc_poe-tryout-poe-scheduler-api       
docker push logickee/nuc_poe-tryout-static-share            
