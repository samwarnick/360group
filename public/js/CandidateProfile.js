var React  = require('react');
var Link = require('react-router').Link;
var _ = require('underscore');

var CandidateProfile = React.createClass({
  getInitialState: function() {
    return {
      candidate: {},
      issues: []
    };
  },

  componentDidMount: function() {
    var c_id = this.props.params.id;
    $.get('/api/candidates/id/' + c_id, function(result) {
      this.setState({candidate: result});
    }.bind(this));

    $("#rightLinks").find("li").removeClass("active");
    $("#candidatesLink").addClass("active");
  },

  fbInit: _.once(function fbInit () {
    if (this.state.candidate.image) {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '175801862767972',
          xfbml      : true,
          version    : 'v2.5'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    }
  }),

  componentDidUpdate: function() {
    this.fbInit();
  },

  render: function() {
    if (this.state.candidate.image) {
      return (
        <div>
        <div className="col-md-8 col-md-offset-2">
          <img className="center-block img-circle" src={"img/candidates/" + this.state.candidate.image}></img>
          <h1 className="text-center">{this.state.candidate.name}</h1>
          <h3 className="text-center">{this.state.candidate.position}</h3>
          <div className="row">
            <p className="col-md-5 text-justify">{this.state.candidate.bio}</p>
            <Facebook facebook={this.state.candidate.facebook} name={this.state.candidate.name} />
          </div>
          <div className="row">
            <h2 className="text-center">Statements by {this.state.candidate.name}</h2>
            <IssuesGroups c_id={this.props.params.id}/>
          </div>
        </div>
        </div>
      );
    } else {
      return false;
    }

  }
});

var Facebook = React.createClass({
  render: function() {
    var url = "https://www.facebook.com/" + this.props.facebook;
    return (
      <div>
        <div id="fb-root"></div>
        <div className="col-md-7">
          <div className="fb-page" data-tabs="timeline,events,messages" data-href={url} data-small-header="false" data-adapt-container-width="true" data-width="500" data-hide-cover="false" data-show-facepile="false" data-show-posts="true">
            <div className="fb-xfbml-parse-ignore"><blockquote cite={url}>
              <a href={url}>{this.props.name}</a></blockquote>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var IssuesGroups = React.createClass({
  getInitialState: function() {
    return {
      quotes: []
    };
  },

  componentDidMount: function() {
    $.get('/api/issues/' + this.props.c_id, function(result) {
      this.setState({quotes: result});
    }.bind(this));
  },

  render: function() {

    var tabs = this.state.quotes.map(function(quote, index) {
      return (
        <IssueNavTab key={quote._id} issue={quote.topic} index={index}/>
      );
    }.bind(this));

    var content = this.state.quotes.map(function(quote, index) {
      return (
        <IssueContentPanel key={quote._id} issue={quote.topic} quote={quote.quote} index={index}/>
      );
    }.bind(this));

    return (
      <div>
        <ul className="nav nav-pills" role="tablist">
          {tabs}
        </ul>

        <div className="tab-content">
          {content}
        </div>
      </div>
    );
  }
});

var IssueNavTab = React.createClass({
  render: function() {

    var active = "";
    if (this.props.index == 0) {
      active = " active";
    }

    return (
      <li role="presentation" className={active}><a href={"#" + this.props.index} aria-controls={this.props.index} role="tab" data-toggle="tab">{this.props.issue}</a></li>
    );
  }
});

var IssueContentPanel = React.createClass({
  render: function() {

    var active = "";
    if (this.props.index == 0) {
      active = " active";
    }

    return (
      <div role="tabpanel" className={"tab-pane" + active} id={this.props.index}>
        <div className="panel panel-default">
          <ul className="list-group">
            <li className="list-group-item">{this.props.quote}</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = CandidateProfile;
