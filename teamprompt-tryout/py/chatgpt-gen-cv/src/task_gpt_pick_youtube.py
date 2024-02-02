#!/usr/bin/env bash
import os, sys
import requests
import json

# from pprint import pprint

temp_preprompt = """
try pick one youtube link below suitable according to "job highlight" and explain why.
if no link suitable, just leave it empty

- Respond with your answers in markdown (```).
- Respond explanation in markdown comment.
- keep explanation simple and clear.

- adopt the following template:
```plaintext
[link_only]

<!-- [explanation] -->
```
- if no link match, output nothing
""".strip()

temp_job_highlight = ""

if os.getenv("BEARER") == "":
    print("authorization is missing")
    sys.exit(1)

with open("./_input/youtube_list.md", "r") as f_youtube_list:
    temp_youtube_list = "".join(f_youtube_list.readlines())


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

final_message = temp_preprompt + "\n" + temp_job_highlight + "\n" + temp_youtube_list

data = {
    "prompt": final_message,
    "stream": False,
}

response = requests.post(url, headers=headers, json=data)

y = json.loads(response.text)
print(y["text"])
