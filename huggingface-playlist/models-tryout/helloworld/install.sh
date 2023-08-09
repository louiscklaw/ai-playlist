#!/usr/bin/env bash

set -x

rm -rf .env

set -ex

python -m venv .env

source .env/bin/activate

pip install torch torchvision torchaudio transformers

pipenv shell "python ./main.py"
