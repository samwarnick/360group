![logo](https://github.com/samwarnick/360group/blob/master/public/img/swyftvote_logo_color.png)

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
  
## Using React
Example external React component
```javascript
var React  = require('react');

var Sample = React.createClass({
  render: function() {
    return (
      <h1>Sample</h1>
    );
  }
});

module.exports = Sample;
```
Example on how to include external component and use router
```javascript
var React = require('react')
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var NavBar = require('./Sample');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Sample />
        {this.props.children || <Home />}
      </div>
    );
  }
});

var Home = React.createClass({
    render: function() {
      return (
        <h1>Home</h1>
      );
    }
});

var Page1 = React.createClass({
  render: function() {
    return (
      <h1>Page1</h1>
    );
  }
});

var Error = React.createClass({
  render: function() {
    return (
      <h1>404</h1>
    );
  }
});

var routes = (
  <Router>
    <Route path="/" component={App}>
      <Route path="page1" component={Page1}/>
      <Route path="*" component={Error}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
```
