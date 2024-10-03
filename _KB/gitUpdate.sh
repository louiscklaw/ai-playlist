#!/usr/bin/env bash

set -ex

git add .

git commit -m"update _KB,"

git push

echo "done"
