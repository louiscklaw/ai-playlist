#!/usr/bin/env bash

set -ex


docker build -t python-langchain-ws .
docker run -it --rm -v $(pwd):/app -w /app python-langchain-ws bash
