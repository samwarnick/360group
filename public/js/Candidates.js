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
        <Candidate key={candidate._id} id={candidate._id} name={candidate.name} image={candidate.image} poll={candidate.poll}/>
      );
    }.bind(this));

    var republicanList = this.state.republicans.map(function(candidate) {
      return (
        <Candidate key={candidate._id} id={candidate._id} name={candidate.name} image={candidate.image} poll={candidate.poll}/>
      );
    }.bind(this));

    return (

      <div>
      <div className="col-md-8 col-md-offset-2">
        <h1 className="text-center">Candidates</h1>
        <div className="row">
          <CandidateList list={democratList} party={"Democrats"} />
          <CandidateList list={republicanList} party={"Republicans"} />
        </div>
      </div>
      </div>
    );
  }
});

var CandidateList = React.createClass({
  render: function() {
    return (
      <div className={"col-md-6 " + this.props.party.toLowerCase()}>
        <img className="party-image center-block" src={"img/parties/" + this.props.party.toLowerCase() + ".png"}></img>
        <h2 className="text-center">{this.props.party}</h2>
        <ul className="candidates-list">
          {this.props.list}
        </ul>
      </div>
    )
  }
});

var Candidate = React.createClass({
  render: function() {
    return (
      <Link className="candidate-link" to={"/candidates/"+ this.props.id}>
        <li>
          <h2>
            <img className="candidate-list-image" src={"img/candidates/" + this.props.image}></img>
            <span className="candidate-name">
              {this.props.name}
            </span>
            <p className="candidate-poll">
              {this.props.poll}%
            </p>
          </h2>
        </li>
      </Link>
    );
  }
});

module.exports = Candidates;
