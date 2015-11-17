var React  = require('react');
var Link = require('react-router').Link;

var Candidates = React.createClass({
  getInitialState: function() {
    return {
      candidates: []
    };
  },

  componentDidMount: function() {
    // console.log('mounting');
    $.get('/api/candidates', function(result) {
      // console.log('getting');
      this.setState({candidates: result});
      // console.log(this.state.candidates);
    }.bind(this));
  },

  render: function() {
    // console.log('rendering');
    var candidatesList = this.state.candidates.map(function(candidate) {
      return (
        <Candidate key={candidate._id} name={candidate.name} />
      );
    }.bind(this));

    return (
      <div>
        <h1>Candidates</h1>
        <ul>
          {candidatesList}
        </ul>
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

module.exports = Candidates;
