# Build

Grunt is used to

 - fetch dependencies from bower
   - copy them into place
 - compile Sass
 - autoprefix CSS
 - minify CSS
 
## Getting Started
 Navigate to neat-sass/_build and install our node_modules like so:
 
 ```
 cd neat-sass/_build
 npm install
 ```
 
## Grunt Commands
 
### build
 Run `grunt build` to build project assets.
 
## watch
 Run `grunt` to watch Sass files for changes and automatically compile them on save