#!/usr/bin/env bash
import os, sys
import requests
import json

# from pprint import pprint

temp_preprompt = ""

if os.getenv("BEARER") == "":
    print("authorization is missing")
    sys.exit(1)

with open("./_input/email_preprompt.md", "r") as f_email_preprompt:
    temp_email_preprompt = "".join(f_email_preprompt.readlines())


with open("./_input/job_highlight.md", "r") as f_job_highlight:
    temp_job_highlight = "".join(f_job_highlight.readlines())

with open("./_input/candidate_background.md", "r") as f_candidate_background:
    temp_candidate_background = "".join(f_candidate_background.readlines())

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

data = {
    "prompt": temp_email_preprompt
    + "\n"
    + temp_job_highlight
    + "\n"
    + temp_candidate_background,
    "stream": False,
}

response = requests.post(url, headers=headers, json=data)

y = json.loads(response.text)
print(y["text"])
