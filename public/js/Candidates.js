var React  = require('react');
var Link = require('react-router').Link;

var Candidates = React.createClass({
  getInitialState: function() {
    return {
      democrats: [],
      republicans: []
    };
  },

  componentDidMount: function() {
    $.get('/api/candidates/party/democrat', function(result) {
      this.setState({democrats: result});
    }.bind(this));
    $.get('/api/candidates/party/republican', function(result) {
      this.setState({republicans: result});
    }.bind(this));

    $("#rightLinks").find("li").removeClass("active");
    $("#candidatesLink").addClass("active");
  },

  render: function() {
    var democratList = this.state.democrats.map(function(candidate) {
      return (
        <Candidate key={candidate._id} id={candidate._id} name={candidate.name} />
      );
    }.bind(this));

    var republicanList = this.state.republicans.map(function(candidate) {
      return (
        <Candidate key={candidate._id} id={candidate._id} name={candidate.name} />
      );
    }.bind(this));

    return (
      <div>
        <h1 className="text-center">Candidates</h1>
        <div className="row">
          <CandidateList list={democratList} party={"Democrats"} />
          <CandidateList list={republicanList} party={"Republicans"} />
        </div>
      </div>
    );
  }
});

var CandidateList = React.createClass({
  render: function() {
    return (
      <div className={"col-md-6 " + this.props.party.toLowerCase()}>
        <h2 className="text-center">{this.props.party}</h2>
        <ul>
          {this.props.list}
        </ul>
      </div>
    )
  }
});

var Candidate = React.createClass({
  render: function() {
    return (
      <h2><Link to={"/candidates/"+ this.props.id} >{this.props.name}</Link></h2>
    );
  }
});

module.exports = Candidates;
