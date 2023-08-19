#!/usr/bin/env bash

set -ex

docker pull logickee/poe-tryout-bait                    
docker pull logickee/poe-tryout-dbapi                   
docker pull logickee/poe-tryout-flow-handler            
docker pull logickee/poe-tryout-jobsdb-link-extractor   
docker pull logickee/poe-tryout-page-handler            
docker pull logickee/poe-tryout-poe-scheduler-api       
docker pull logickee/poe-tryout-static-share            

docker tag logickee/poe-tryout-bait                    192.168.10.61:5000/nuc_poe-tryout-bait                    &
docker tag logickee/poe-tryout-dbapi                   192.168.10.61:5000/nuc_poe-tryout-dbapi                   &
docker tag logickee/poe-tryout-flow-handler            192.168.10.61:5000/nuc_poe-tryout-flow-handler            &
docker tag logickee/poe-tryout-jobsdb-link-extractor   192.168.10.61:5000/nuc_poe-tryout-jobsdb-link-extractor   &
docker tag logickee/poe-tryout-page-handler            192.168.10.61:5000/nuc_poe-tryout-page-handler            &
docker tag logickee/poe-tryout-poe-scheduler-api       192.168.10.61:5000/nuc_poe-tryout-poe-scheduler-api       &
docker tag logickee/poe-tryout-static-share            192.168.10.61:5000/nuc_poe-tryout-static-share            &
wait

docker push 192.168.10.61:5000/nuc_poe-tryout-bait                    
docker push 192.168.10.61:5000/nuc_poe-tryout-dbapi                   
docker push 192.168.10.61:5000/nuc_poe-tryout-flow-handler            
docker push 192.168.10.61:5000/nuc_poe-tryout-jobsdb-link-extractor   
docker push 192.168.10.61:5000/nuc_poe-tryout-page-handler            
docker push 192.168.10.61:5000/nuc_poe-tryout-poe-scheduler-api       
docker push 192.168.10.61:5000/nuc_poe-tryout-static-share            
