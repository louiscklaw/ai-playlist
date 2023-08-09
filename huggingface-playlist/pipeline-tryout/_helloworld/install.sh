#!/usr/bin/env bash

set -x

rm -rf .env

set -ex

python -m venv .env

source .env/bin/activate

pip3 install torch torchvision torchaudio

pip install transformers

python -c "from transformers import pipeline; print(pipeline('sentiment-analysis')('we love you'))"
