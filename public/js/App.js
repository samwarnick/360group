var React = require('react')
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Link = require('react-router').Link;
var Route = require('react-router').Route;
var NavBar = require('./NavBar');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
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

var Page2 = React.createClass({
  render: function() {
    return (
      <h1>Page2</h1>
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
      <Route path="page2" component={Page2}/>
      <Route path="*" component={Error}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
