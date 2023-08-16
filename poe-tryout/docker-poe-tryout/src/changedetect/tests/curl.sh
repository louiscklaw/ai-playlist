curl -X POST -d '{"urls":"mailto://user:pass@gmail.com","body":"test body","title":"test title"}' \
    -H "Content-Type: application/json" \
    "http://localhost:8000/notify/"
