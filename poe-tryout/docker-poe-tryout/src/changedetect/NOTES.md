### script to filter the job links from list page

```javascript
var div = document.createElement('div');
div.setAttribute('id', 'job-link');
var fragment = document.createDocumentFragment();

document.querySelectorAll('a[href*="/hk/en/job"]').forEach(ele => {
  var div_link = ele;
  fragment.appendChild(div_link);
});

div.appendChild(fragment);

var body = document.querySelector('body');
body.appendChild(div);
```

# apprise configuration

http://localhost:8000/cfg/helloworld
