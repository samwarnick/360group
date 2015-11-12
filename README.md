# 360group
Project for CS 360 at BYU

# **REMEMBER TO USE BRANCHES**

## Getting Started
1. Clone repository

  ```
  git clone https://github.com/samwarnick/360group.git
  ```
2. Change directory

  ```
  cd 360group
  ```
3. Install dependencies for project

  ```
  npm install
  ```
4. Install `webpack` globally

  ```
  npm install webpack -g
  ```

This gets you ready to rock and roll

## Developing
1. Start `webpack`

  ```
  webpack -w
  ```
  `webpack` with the `-w` flag will continuously watch for changes and re-bundle all the React code into `bundle.js`. Currently, it is configured to watch the `public/js/App.js` file and it's dependencies. When a change is saved, everyhthing will be re-bundled.
2. In a ***new*** terminal, start server

  ```
  npm start
  ```
  Whenever a change is saved the serve will automaticaly restart.
