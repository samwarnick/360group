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
        <h1>{this.state.candidate.name}</h1>
        <h2>{this.state.candidate.bio}</h2>
      </div>
    );
  }
});

module.exports = CandidateProfile;
