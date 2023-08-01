## Flow (planning)

```mermaid
  graph TD;
      A[fetch jobs] -- jobs --> B[Query poe.com];
      B[initialize louis background]-->D[draft email and CV];
      C-->D;
```


### preprompt tryout

### test 1 (testing on chatGPT)
preprompt
start a fresh talk
remember you a person live in hong kong named louis

question
what is this person name ?

![](./docs/test_preprompt.gif)

### google-palm tryout
![](./docs/google-palm.gif)

### start

```bash
# build openbox-ubuntu image
$ ./build.sh
$ docker compose up -d

# mongo-express always cannot connect to mongo at start, manually restart
$ docker compose restart mongo-express
```

### to run script inside src directory

### mapping:
  - ./openbox-firefox/src:/app

```bash
$ cd /app
$ ./test.sh
```


### high level design
  1. fetch (HLD)
  1. draft (HLD)
  1. review (HLD)
  1. send (HLD)


### References:
  - https://github.com/f/awesome-chatgpt-prompts
  - https://florianholzapfel.github.io/express-restify-mongoose

### logs
  - 2023-08-01: add expres database to store log
    - draft google-palm support
    - update pre-prompt
    