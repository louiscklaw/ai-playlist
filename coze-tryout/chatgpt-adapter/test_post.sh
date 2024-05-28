curl -i -X POST \
   -H "Content-Type:application/json" \
   -H "Authorization: xxx" \
   -d \
'{
  "stream": true,
  "model": "coze",
  "messages": [
    { "role": "user", "content": "hi" }
  ]
}' \
 'http://127.0.0.1:8080/v1/chat/completions'
