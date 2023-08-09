#!/usr/bin/env bash

set -x

rm -rf .env

set -ex

# pipenv 

pipenv install torch torchvision torchaudio transformers

pipenv shell "python ./main.py"

pipenv lock
