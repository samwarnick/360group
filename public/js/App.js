var React = require('react')
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Link = require('react-router').Link;
var Route = require('react-router').Route;
var NavBar = require('./NavBar');
var Candidates = require('./Candidates');
var Issues = require('./Issues');
var Register = require('./Register');
var Login = require('./Login');

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
      <Route path="register" component={Register}/>
      <Route path="login" component={Login}/>
      <Route path="*" component={Error}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
