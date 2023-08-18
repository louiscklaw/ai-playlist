#!/usr/bin/env bash

set -ex

docker image tag logickee/openbox-poe-seat 192.168.10.61:5000/openbox-poe-seat
docker push 192.168.10.61:5000/openbox-poe-seat

docker image tag logickee/poe-tryout-diff-handler           192.168.10.61:5000/poe-tryout-diff-handler           
docker push 192.168.10.61:5000/poe-tryout-diff-handler       

docker image tag logickee/poe-tryout-bait                   192.168.10.61:5000/poe-tryout-bait                   
docker push 192.168.10.61:5000/poe-tryout-bait               

docker image tag logickee/poe-tryout-static-share           192.168.10.61:5000/poe-tryout-static-share           
docker push 192.168.10.61:5000/poe-tryout-static-share       

docker image tag logickee/poe-tryout-flow-handler           192.168.10.61:5000/poe-tryout-flow-handler           
docker push 192.168.10.61:5000/poe-tryout-flow-handler       

docker image tag logickee/poe-tryout-jobsdb-link-extractor  192.168.10.61:5000/poe-tryout-jobsdb-link-extractor  
docker push 192.168.10.61:5000/poe-tryout-jobsdb-link-extractor

docker image tag logickee/poe-tryout-page-handler           192.168.10.61:5000/poe-tryout-page-handler           
docker push 192.168.10.61:5000/poe-tryout-page-handler       

docker image tag logickee/poe-tryout-poe-scheduler-api      192.168.10.61:5000/poe-tryout-poe-scheduler-api      
docker push 192.168.10.61:5000/poe-tryout-poe-scheduler-api  

docker image tag logickee/poe-tryout-dbapi                  192.168.10.61:5000/poe-tryout-dbapi                  
docker push 192.168.10.61:5000/poe-tryout-dbapi              

docker image tag logickee/openbox-poe-seat                  192.168.10.61:5000/openbox-poe-seat                  
docker push 192.168.10.61:5000/openbox-poe-seat              