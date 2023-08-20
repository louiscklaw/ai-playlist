#!/usr/bin/env bash

set -ex

pushd /workspace/ai-playlist/poe-tryout/docker-poe-tryout/src/volumes/mongo
  rm -rf data

  mkdir data
  mkdir data/db
  mkdir data/configdb
  
  chmod g+w data/db
  touch data/db/.gitkeep

  chmod g+w data/configdb
  touch data/configdb/.gitkeep

  chown logic:logic -R data
popd
