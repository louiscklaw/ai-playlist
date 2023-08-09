#!/usr/bin/env bash

set -ex

#!/bin/bash

# Specify the path to the main directory
main_directory=`pwd`

# Find and delete .env directories recursively
find "$main_directory" -type d -name ".env" -exec rm -rf {} \;
echo "All .env directories deleted successfully."

# echo $main_directory