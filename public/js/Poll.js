var React  = require('react');
var Link = require('react-router').Link;
var Demographics = require('./Demographics');

var Poll = React.createClass({
  render: function() {
    return (
      <div>
      <Quiz />
      </div>

    );
  }
});

var Quiz = React.createClass({
    handleClick: function(event) {
    //get all the states from the questions.
    //send them off with an API call
  },
    getInitialState: function() {
    return {
      statements: []
    };
  },
    componentDidMount: function() {
    $.get('/api/statements', function(result) {
	this.setState({statements: result});
    }.bind(this));

    $("#rightLinks").find("li").removeClass("active");
    $("#PollLink").addClass("active");
},
    render: function() {
        var statementsList = this.state.statements.map(function(statement) {
	    return (
		    <Statement key={statement._id} statement={statement.statement} />
	    );
    	}.bind(this));
      return (
        <div>
            <div id="section1">
                <div className="container" id="quiz">
                    <div className="row">
                        <div className="col-md-8">
                        <div id="question" ><h1>How much do you agree with the following statments?</h1></div>
                            	{statementsList}

                                <button type="button" className="btn btn-primary" onClick={this.handleClick}>SUBMIT</button>
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
});

var Statement = React.createClass({
    handleClick1: function(event) {
    this.setState({active: 1});
  },
  handleClick2: function(event) {
  this.setState({active: 2});
},
handleClick3: function(event) {
this.setState({active: 3});
},
handleClick4: function(event) {
this.setState({active: 4});
},
handleClick5: function(event) {
this.setState({active: 5});
},
handleClick0: function(event) {
this.setState({active: 0});
},
  render: function() {
    return (

      <div className="quiz-item" >
      <div id="the statement goes here"><h2>{this.props.statement}</h2></div>
      <ul className="nav nav-pills nav-justified">
          <li>

                  <a data-toggle="pill" onClick={this.handleClick1}>Strongly Agree</a>

          </li>
          <li>
                <a data-toggle="pill" onClick={this.handleClick2}>Agree</a>
          </li>
          <li>
              <a data-toggle="pill" onClick={this.handleClick3}>Indifferent</a>
          </li>
          <li>
              <a data-toggle="pill" onClick={this.handleClick4}>Disagree</a>
          </li>
          <li>
              <a data-toggle="pill" onClick={this.handleClick5}>Strongly Disagree</a>
          </li>
          <li>
              <a data-toggle="pill" onClick={this.handleClick6}>Do Not Know</a>
          </li>
      </ul></div>
    );
  }
});

module.exports = Poll;
