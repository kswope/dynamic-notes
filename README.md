

This repo is served over at http://kswope.github.io/dynamic-notes

You are currently on master.  The good stuff is over on gh-pages

To run generator, server, etc (don't forget to turn on browsers LiveReload):


```
> git checkout gh-pages
> sudo npm -g install gulp
> npm install
> npm start
```

A bunch of files are watched, including those in ./content.  When a file
changes, convert_content.rb is run and LiveUpdate is triggered (if the plugin
installed)

The content files (.js files in ./content) are "html commented" javascript
files that are converted into html files by ./convert_content.rb.  They are
dropped in the same ./content directory and served up there.

You edit the index.html page yourself and link to generated files in ./content.
The index.html file also serves as the outer html wrapper for the content
files.

To add new content file.
* make a file named ./content/my_new_content.js with your notes
* in index.html link to ./content/my_new_content.html
* if gulp is running my_new_content.js file will be generated, if not, run ./content_combine.rb


