#!/usr/bin/env bash

set -ex

docker push logickee/poe-tryout-bait                    
docker push logickee/poe-tryout-dbapi                   
docker push logickee/poe-tryout-flow-handler            
docker push logickee/poe-tryout-jobsdb-link-extractor   
docker push logickee/poe-tryout-page-handler            
docker push logickee/poe-tryout-poe-scheduler-api       
docker push logickee/poe-tryout-static-share            

docker tag logickee/poe-tryout-bait                    192.168.10.61:5000/poe-tryout-bait                    
docker tag logickee/poe-tryout-dbapi                   192.168.10.61:5000/poe-tryout-dbapi                   
docker tag logickee/poe-tryout-flow-handler            192.168.10.61:5000/poe-tryout-flow-handler            
docker tag logickee/poe-tryout-jobsdb-link-extractor   192.168.10.61:5000/poe-tryout-jobsdb-link-extractor   
docker tag logickee/poe-tryout-page-handler            192.168.10.61:5000/poe-tryout-page-handler            
docker tag logickee/poe-tryout-poe-scheduler-api       192.168.10.61:5000/poe-tryout-poe-scheduler-api       
docker tag logickee/poe-tryout-static-share            192.168.10.61:5000/poe-tryout-static-share            


docker push 192.168.10.61:5000/poe-tryout-bait                    
docker push 192.168.10.61:5000/poe-tryout-dbapi                   
docker push 192.168.10.61:5000/poe-tryout-flow-handler            
docker push 192.168.10.61:5000/poe-tryout-jobsdb-link-extractor   
docker push 192.168.10.61:5000/poe-tryout-page-handler            
docker push 192.168.10.61:5000/poe-tryout-poe-scheduler-api       
docker push 192.168.10.61:5000/poe-tryout-static-share            
