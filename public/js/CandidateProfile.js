var React  = require('react');
var Link = require('react-router').Link;

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

  render: function() {
    return (
      <div>
        <img className="center-block img-circle" src={"img/candidates/" + this.state.candidate.image}></img>
        <h1 className="text-center">{this.state.candidate.name}</h1>
        <h3 className="text-center">{this.state.candidate.position}</h3>
        <p>{this.state.candidate.bio}</p>
        <div className="row">
          <Facebook />
          <Twitter />
        </div>
      </div>
    );
  }
});

var Facebook = React.createClass({
  render: function() {
    var url = "https://www.facebook.com/hillaryclinton";
    return (
      <div className="col-md-4">
        <div className="fb-page" data-href={url} data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false" data-show-posts="true"><div className="fb-xfbml-parse-ignore"><blockquote cite={url}><a href={url}>Hillary Clinton</a></blockquote></div></div>
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
