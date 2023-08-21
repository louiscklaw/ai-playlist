#!/usr/bin/env bash

set -e

./scripts/dc_gen.sh

echo 
echo -e "\033[31m re-up docker compose ? \033[0m"
read -p "Press Enter to continue..."
echo 

docker compose -f ./docker-compose.gen.yml up -d --remove-orphans
# --build

exit 0

