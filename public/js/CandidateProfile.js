var React  = require('react');
var Link = require('react-router').Link;
var _ = require('underscore');

var CandidateProfile = React.createClass({
  getInitialState: function() {
    return {
      candidate: {}
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
          <img className="center-block img-circle" src={"img/candidates/" + this.state.candidate.image}></img>
          <h1 className="text-center">{this.state.candidate.name}</h1>
          <h3 className="text-center">{this.state.candidate.position}</h3>
          <div className="row">
            <p className="col-md-6 text-justify">{this.state.candidate.bio}</p>
            <Facebook facebook={this.state.candidate.facebook} name={this.state.candidate.name} />
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
        <div className="col-md-6">
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

var Twitter = React.createClass({
  componentDidMount: function() {
    eval("!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");");
  },
  render: function() {
    var name = "HillaryClinton";
    var url = "https://twitter.com/HillaryClinton";
    var widgetid = "667779323294691328";
    return (
      <div>
        <div id="fb-root"></div>
        <div className="col-md-4">
          <a className="twitter-timeline" href={url} data-widget-id={widgetid}>
            Tweets by @{name}
          </a>
        </div>
      </div>
    );
  }
});

module.exports = CandidateProfile;
