#!/usr/bin/env bash

set -ex

pushd app
  npm i -D
  npm run build-ghpages
  npm run publish-ghpages
popd
