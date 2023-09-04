#!/usr/bin/env bash

set -e

echo 1 > ../src/volumes/logs/combined.log
echo 1 > ../src/volumes/logs/error.log

./scripts/dc_gen.sh

docker compose -f ./docker-compose.gen.yml pull

echo 
echo -e "\033[31m re-up docker compose ? \033[0m"
read -p "Press Enter to continue..."
echo 

# docker compose -f ./docker-compose-openbox.gen.yml up -d
docker compose -f ./docker-compose.gen.yml up -d
# --build

exit 0

