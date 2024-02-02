#!/usr/bin/env bash

set -ex

```bash
curl 'https://gptapi.apoidea.ai/v1/conversation/conversations' -X POST \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0' \
  -H 'Accept: text/event-stream' \
  -H 'Accept-Language: en-US,en;q=0.5' \
  -H 'Accept-Encoding: gzip, deflate, br' \
  -H 'Referer: https://teamprompt.ai/' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvdWlzbGFicy5oaUBnbWFpbC5jb20iLCJkaXNwbGF5TmFtZSI6ImxvdWlzIGxhdyIsInJvbGUiOiJzdGFmZiIsInVzZXJJZCI6ImIyNTg4NjY3LTI4OWUtNDMyNy1iOGJhLTVkYmE3ZWZkZWU1ZSIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMDJUMTA6NDQ6NTcuMzk2WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMDJUMTA6NDQ6NTcuMzk2WiIsImlhdCI6MTcwNjg3MDY5N30.n_OxLrq0FBYMS1jEL-R8CTm6W3k9M0Hww7MJD1toqGA' \
  -H 'Origin: https://teamprompt.ai' \
  -H 'Connection: keep-alive' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'TE: trailers' --data-raw '{"prompt":"hello","stream":true}'
```

convert to javascript 

