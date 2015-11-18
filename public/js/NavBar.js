var React  = require('react');
var Link = require('react-router').Link;

var NavBar = React.createClass({
  render: function() {
    return (
      // var active = this.props.active ? 'active' : '';

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img alt="SwyftVote" src="/img/swyftvote_logo_color.png" height="100%"/>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul id="rightLinks" className="nav navbar-nav navbar-right">
              <li id="pollLink"><Link to="/poll">Poll</Link></li>
              <li id="candidatesLink"><Link to="/candidates">Candidates</Link></li>
              <li id="issuesLink"><Link to="/issues">Issues</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
