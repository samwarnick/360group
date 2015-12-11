var React  = require('react');
var Link = require('react-router').Link;
var Demographics = require('./Demographics');
var Result = require('./Result');

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
    answerSelected: function(statement, answer) {
        var newkey = statement;
        this.state.stateansPairs[newkey] = answer;
        console.log(statement, answer);
    },
    getInitialState: function() {
        return {
            statements: [],
            stateansPairs: {},
            liststatements: []
        };
    },
    componentDidMount: function() {
        $.get('/api/statements', function(result) {
            this.setState({statements: result,
                liststatements: result.map(function(statement) {
                    return (
                        <Statement onAnswer={this.answerSelected} key={statement._id} statement={statement.quote} />
            );
    }.bind(this))
});
}.bind(this));


$("#rightLinks").find("li").removeClass("active");
$("#pollLink").addClass("active");
},
render: function() {

    return (
      <div>
          <div id="section1">
              <div className="container" id="quiz">
                  <div className="row">
                      <div className="col-md-8">
                      <div id="question" ><h1>How much do you agree with the following statments?</h1></div>
{this.state.liststatements}

<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">SUBMIT</button>
</div>
<Result answers={this.state.stateansPairs}/>
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
    getDefaultProps: function() {
        return {
            choice: 0,
        };
    },
    getInitialState: function() {
        this.props.choice = 0;
        return {choice: 0};
    },
    handleClick: function(index, event) {
        this.props.onAnswer(this.props.statement, index);
    },
    getState: function(){
        return this.state.choice;
    },
    render: function() {
        var answers = [{label: "Strongly Agree", value: 1 },{label: "Agree", value: 2}, {label: "Indifferent", value: 3}, {label: "Disagree", value: 4}, {label: "Strongly Disagree", value: 5}, {label: "Don't Know", value: 0} ];
        return (
          <div className="quiz-item" >
          <div id="the statement goes here"><h2>{this.props.statement}</h2></div>
          <ul className="nav nav-pills nav-justified">
          {answers.map((pillabel)=> {
              return (
                  <li>
                        <a data-toggle="pill" onClick={this.handleClick.bind(this, pillabel.value)}>{pillabel.label}</a>
                  </li>
              )
      })}
          </ul></div>
        );
    }
});

module.exports = Poll;
