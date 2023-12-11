#!/usr/bin/env bash
import os, sys
import requests
import json

# from pprint import pprint

temp_preprompt = ""

task = """
suggest me a frontmatter with the job description above
""".strip()

if os.getenv("BEARER") == "":
    print("authorization is missing")
    sys.exit(1)

with open("./_input/frontmatter_preprompt.md", "r") as f_frontmatter_preprompt:
    temp_frontmatter_preprompt = "".join(f_frontmatter_preprompt.readlines())

with open("./_input/job_highlight.md", "r") as f_job_highlight:
    temp_job_highlight = "".join(f_job_highlight.readlines())


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
    "prompt": temp_frontmatter_preprompt + "\n" + temp_job_highlight + "\n" + task,
    "stream": False,
}

response = requests.post(url, headers=headers, json=data)

y = json.loads(response.text)
print(y["text"])
