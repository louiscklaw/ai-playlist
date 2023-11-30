public:: true

- ## Outline:
	- main component for flow handling for every `request/findings`
-
- ### source files:
- ```js
  # src/flow-handler/src/state_machine/jobsdb/transitions.js
  const transitions = [
    { name: 'extractJobDetail', from: S_NEW_JOB_FOUND, to: S_EXTRACTING_JOB_DETAIL },
    { name: 'extractDone', from: S_EXTRACTING_JOB_DETAIL, to: S_EXTRACTION_DONE },
  
    // NOTE: why i do this ??
    { name: 'askPoe', from: S_EXTRACTION_DONE, to: S_ASKING_POE },
    { name: 'askPoeDone', from: S_ASKING_POE, to: S_ASKING_POE_DONE },
  
    { name: 'poeSummarize', from: S_READY_SUMMARIZE, to: S_SUMMARIZING_JOB_DETAIL },
    { name: 'poeSummarizeDone', from: S_SUMMARIZING_JOB_DETAIL, to: S_READY_DRAFT_EMAIL },
  
    // draft CV
    { name: 'poeDraftEmail', from: S_READY_DRAFT_EMAIL, to: S_DRAFTING_EMAIL },
    { name: 'poeDraftEmailDone', from: S_DRAFTING_EMAIL, to: S_DRAFT_EMAIL_DONE },
  
    { name: 'storeResult', from: S_DRAFT_EMAIL_DONE, to: S_STORE_JSON_DONE },
    { name: 'reportJobComplete', from: S_STORE_JSON_DONE, to: S_JOB_COMPLETE },
  ];
  ```
-
- ### related container
	- - [[diff-handler]]
	- - [[changedetection]]
	- - [[dbapi]]
	- - [[v2raya]]
	- - [[bait]]
	- - [[static-share]]
	- - [[jobsdb-link-extractor]]
	- - [[busybox]]
	- - [[api-debug]]
-