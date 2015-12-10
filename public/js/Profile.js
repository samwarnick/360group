var React  = require('react');
var Link = require('react-router').Link;

var Profile = React.createClass({
  getInitialState: function() {
    return {
      race: "",
      sex: "",
      age: "",
      state: "",
      candidate:
    };
  },

  componentDidMount: function() {
    $.get('/api/profile', function(result) {
      this.setState({Profile: result});
    }.bind(this));

    $("#rightLinks").find("li").removeClass("active");
    $("#candidatesLink").addClass("active");
  },

  render: function() {
    var candidatesList = this.state.candidates.map(function(candidate) {
      return (
        <Candidate key={candidate._id} name={candidate.name} />
      );
    }.bind(this));

    return (
      <div>
      <div className="col-md-8 col-md-offset-2">
        <h1>Candidates</h1>
        <ul>
          {candidatesList}
        </ul>
      </div>
      </div>
    );
  }
});

var Candidate = React.createClass({
  render: function() {
    return (
      <h2 >{this.props.name}</h2>
    );
  }
});

module.exports = Profile;
