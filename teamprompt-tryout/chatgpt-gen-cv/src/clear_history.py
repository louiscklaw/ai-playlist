#!/usr/bin/env bash
import requests
import json
from pprint import pprint
import random
import time
import os, sys

temp_preprompt = ""

if os.getenv("BEARER") == "":
    print("authorization is missing")
    sys.exit(1)

url = "https://gptapi.apoidea.ai/v1/conversation/conversations"
headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
    "Accept": "text/event-stream",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://teamprompt.ai/",
    "Content-Type": "application/json",
    "Authorization": os.getenv("BEARER"),
    "Origin": "https://teamprompt.ai",
    "Connection": "keep-alive",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
    "TE": "trailers",
}

response = requests.get(url, headers=headers)

y = json.loads(response.text)
conversationIds = list(map(lambda x: x["conversationId"], y))
# pprint(y[0]['conversationId'])

for c_id in conversationIds:
    delay = random.uniform(0, 0.3)
    time.sleep(delay)

    delete_url = (
        "https://gptapi.apoidea.ai/v1/conversation/conversations/{c_id}".format(
            c_id=c_id
        )
    )
    print("clearing {c_id} => {delete_url}".format(c_id=c_id, delete_url=delete_url))
    response = requests.delete(delete_url, headers=headers)
    print(response.status_code)
