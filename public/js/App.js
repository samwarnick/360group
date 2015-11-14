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

var Poll = React.createClass({
  render: function() {
    return (
      <h1>Poll</h1>
    );
  }
});

var Candidates = React.createClass({
  render: function() {
    return (
      <h1>Candidates</h1>
    );
  }
});

var Issues = React.createClass({
  render: function() {
    return (
      <h1>Issues</h1>
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
      <Route path="poll" component={Poll}/>
      <Route path="candidates" component={Candidates}/>
      <Route path="issues" component={Issues}/>
      <Route path="*" component={Error}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
