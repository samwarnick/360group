var React  = require('react');
var Link = require('react-router').Link;

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

                                <button type="button" className="btn btn-primary" onclick="next()">SUBMIT</button>
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

      <div>
      <div id="the statement goes here">{this.props.statement}</div>
      <ul className="answers">
          <li>
              <label for="choice1" className="label_radio">
                  <input type="radio" name="answer" value="1">
                      <div id="choice1">
                          Strongly Agree
                      </div>
                     </input>
              </label>
          </li>
          <li>
              <label for="choice2" className="label_radio">
                  <input type="radio" name="answer" value="2">
                      <div id="choice2">
                          Agree
                      </div>
                      </input>
              </label>
          </li>
          <li>
              <label for="choice3" className="label_radio">
                  <input type="radio" name="answer" value="3">
                      <div id="choice3">
                          Indifferent
                      </div>
                      </input>
              </label>
          </li>
          <li>
              <label for="choice4" className="label_radio">
                  <input type="radio" name="answer" value="4">
                      <div id="choice4">
                          Disagree
                      </div>
                      </input>
              </label>
          </li>
          <li>
              <label for="choice5" className="label_radio">
                  <input type="radio" name="answer" value="5">
                      <div id="choice5">
                          Strongly Disagree
                      </div>
                      </input>
              </label>
          </li>
          <li>
          <label for="choice6" className="label_radio">
              <input type="radio" name="answer" value="0">
                  <div id="choice6">
                      Do Not Know
                  </div>
                  </input>
              </label>
          </li>
      </ul></div>
    );
  }
});

module.exports = Poll;
