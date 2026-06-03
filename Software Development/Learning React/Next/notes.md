To create app:
```$npx create-next-app@latest```
<br />

### Reserved filenames

`page, layout, error, not-found, route, loading, etc`

### Reserved variable and const names

`metadata`

### Routing via filesystem

Following project folder structure having a page.js file. Ex:
<pre>
app
 |-about
 |  |-page.js
 |
 |-contact
     |-page.js
</pre>

### Dynamic names

In `[ ... ]` (square brackets). ex: dynamic blog pages directories, with its many page
<pre>
blog
  |-[slug]  dynamic dir name (slug is the param name, the name is up to u, ex: [jklm])
  |    |-page.js  
  |
  |---page.js
</pre>
