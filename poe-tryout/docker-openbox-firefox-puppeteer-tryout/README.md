## Flow (planning)

```mermaid
  graph TD;
      A[fetch jobs] -- jobs --> B[Query poe.com];
      B[initialize louis background]-->D[draft email and CV];
      C-->D;
```


### preprompt

#### test 1
preprompt
start a fresh talk
remember you a person live in hong kong named louis

question
what is this person name ?

![](./docs/test_preprompt.gif)

### start

```bash
# build openbox-ubuntu image
$ ./build.sh

$ docker compose up -d
```

### to run script inside src directory

### mapping:
  - ./openbox-firefox/src:/app

```bash
$ cd /app
$ ./test.sh
```


### References:
https://github.com/f/awesome-chatgpt-prompts