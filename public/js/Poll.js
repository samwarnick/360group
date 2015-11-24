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
                        <div className="col-md-6">
                        <div id="question" >How much do you agree with the following statments?</div>
                            <form className="quiz">
                            	{statementsList}

                                <button type="button" className="btn btn-primary" onclick="next()"><Link to="/demographics">SUBMIT</Link></button>
                            </form>
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
  render: function() {
    return (

      <div className="quiz" >
      <div id="the statement goes here">{this.props.statement}</div>
      <ul className="answers">
          <li>

                  <input id="radiobutton1" type="radio" name={this.props.statement} value="1">
                      <label className="StronglyAgree" for="radiobutton1">Strongly Agree</label>
                     </input>

          </li>
          <li>
              <input id="radiobutton2" type="radio" name={this.props.statement} value="1">
                  <label for="radiobutton2"><span><span></span></span>Agree</label>
                 </input>
          </li>
          <li>
              <input id="radiobutton3" type="radio" name={this.props.statement} value="1">
                  <label for="radiobutton3">Indifferent</label>
                 </input>
          </li>
          <li>
              <input id="radiobutton4" type="radio" name={this.props.statement} value="1">
                  <label for="radiobutton4">Disagree</label>
                 </input>
          </li>
          <li>
              <input id="radiobutton5" type="radio" name={this.props.statement} value="1">
                  <label for="radiobutton5">Strongly Disagree</label>
                 </input>
          </li>
          <li>
              <input id="radiobutton6" type="radio" name={this.props.statement} value="1">
                  <label for="radiobutton6">Do Not Know</label>
                 </input>
          </li>
      </ul></div>
    );
  }
});

module.exports = Poll;
