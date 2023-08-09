#!/usr/bin/env bash

set -x

rm -rf .env

set -ex

pipenv --rm

pipenv install torch 
pipenv install torchvision 
pipenv install torchaudio 
pipenv install transformers

# pipenv run 'python -c "from transformers import pipeline; print(pipeline('sentiment-analysis')('we love you'))"'

pipenv shell "python ./main.py"

# python -m venv .env

# source .env/bin/activate

# pip3 install torch torchvision torchaudio

# pip install transformers

# python -c "from transformers import pipeline; print(pipeline('sentiment-analysis')('we love you'))"
