### To develop

```bash
# first, start docker
# it will start openbox, chrome and express server
$ ./dc_up.sh


# then on the host
# to send test request
$ cd test
$ node ./route_teamprompt_ask.js

```

# directory structure
```
.
├── dockerfiles  # dockerfile home
├── src          # REST server home
├── test         # test script home
└── volumes      # docker volumes
```
