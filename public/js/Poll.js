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
        for (var key2 in this.state.liststatements){
            console.log(this.state.liststatements[key2].type().getState());
        }

    //get all the states from the questions.
    //send them off with an API call
  },
    getInitialState: function() {
    return {
      statements: [],
      liststatements: []
    };
  },
    componentDidMount: function() {
    $.get('/api/statements', function(result) {
	this.setState({statements: result,
        liststatements: result.map(function(statement) {
	    return (
		    <Statement key={statement._id} statement={statement.statement} />
	    );
    	}.bind(this))
    });
    }.bind(this));


    $("#rightLinks").find("li").removeClass("active");
    $("#PollLink").addClass("active");
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

                                <button type="button" className="btn btn-primary" onClick={this.handleClick} data-toggle="modal" data-target="#myModal">SUBMIT</button>
                        </div>
	                <div id="myModal" className="modal fade" role="dialog">
	                     <div className="modal-dialog">
	                          <div className="modal-content">
	                               <div className="modal-header">
                                           <button type="button" className="close" data-dismiss="modal">&times;</button>
                                           <h4 className="modal-title">Modal Header</h4>
	                               </div>
	                               <div className="modal-body">
                                           <Demographics/>
	                               </div>
	                               <div className="modal-footer">
                                           <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
	                               </div>
	                         </div>
	                     </div>
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
    getDefaultProps: function() {
    return {
      choice: 0
  };
  },
    getInitialState: function() {
        this.props.choice = 0;
        return {choice: 0};
    },
    handleClick1: function(event) {
    this.props.choice = 1;
  },
  handleClick2: function(event) {
  this.props.choice = 2;
},
handleClick3: function(event) {
this.props.choice = 3;
},
handleClick4: function(event) {
this.props.choice = 4;
},
handleClick5: function(event) {
this.props.choice = 5;
console.log(this.props.choice);
},
handleClick0: function(event) {
this.props.choice = 6;
},
getState: function(){
    return this.state.choice;
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
