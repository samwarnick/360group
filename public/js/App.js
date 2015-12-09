var React = require('react')
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Link = require('react-router').Link;
var Route = require('react-router').Route;
var NavBar = require('./NavBar');
var Candidates = require('./Candidates');
var Poll = require('./Poll');
var Demographics = require('./Demographics');
var CandidateProfile = require('./CandidateProfile');
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
  componentDidMount: function() {
    $("#rightLinks").find("li").removeClass("active");
  },

  render: function() {
    return (
    <div>
      <div className="intro-header container-fluid">
        <div className="background-image container-fluid"></div>
        <div className="col-lg-12">
            <div className="intro-message" >
                <h1><img src="img/swyftvote_logo_light.png" ></img></h1>
            </div>
            <div className="button-section">
                <Link className="poll-link" to="poll">
                    <button type="button" className="button-front text-center" >TAKE THE POLL</button>
                </Link>
            </div>
        </div>
      </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">Got a Suggestion?</h2>
                    <hr className="primary">
                        <p>Give us a call or send us an email and we will get back to you as soon as possible!</p>
                    </hr>
                </div>
                <div className="col-md-6 text-center">
                    <img src="/img/phone.png" className="phone" ></img>
                    <p>555-555-5555</p>
                </div>
                <div className="col-md-6 text-center">
                    <img src="/img/envelope.png" className="envelope" ></img>
                    <p>
                        <a href="mailto:feedback@Swyftvote.com">feedback@Swyftvote.com</a>
                    </p>
                </div>
            </div>
        </div>
      </div>
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
      <Route path="demographics" component={Demographics}/>
      <Route path="candidates" component={Candidates}/>
      <Route path="candidates/:id" component={CandidateProfile}/>
      <Route path="issues" component={Issues}/>
      <Route path="register" component={Register}/>
      <Route path="login" component={Login}/>
      <Route path="*" component={Error}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
