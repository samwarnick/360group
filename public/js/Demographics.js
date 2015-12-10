var React = require('react');
var Link = require('react-router').Link;
var Highcharts = require('highcharts');
var ReactHighcharts = require('react-highcharts/dist/bundle/highcharts');

var Demographics = React.createClass({
	getInitialState: function() {
		


		return {
			id: "5661c3a2aee7bcb5ff5809f1",
			candidate: {},
			candidateList: [],
			statements: [],
			config: {
			  chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
		    title: {
		      text: 'Your Matches'
		    },
		    tooltip: {
		      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		      pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        dataLabels: {
		          enabled: false
		        },
		        showInLegend: true
		      }
		    },
		    series: [{
		      name: 'Percent Match',
		    	colorByPoint: true,
		    	data: [
						{
							name: 'Him',
							y: 56.33
						}, {
							name: 'Her',
							y: 24.03,
						}, {
							name: 'Me',
							y: 10.38
						}, {
							name: 'You',
							y: 4.77
						}, {
							name: 'It',
							y: 0.91
						}, {
							name: 'Trump',
							y: 0.2
						}
					]
				}]
			}
		};
	},
    
  componentDidMount: function() {
  	var results = JSON.parse(localStorage.userResults);
	var candidates = [];
	var scores = {};
	
	$.get('/api/statements', function(result) {
		this.setState({statements: result}, function() {

			$.get('/api/candidates/party/democrat', function(result) {
			this.setState({candidates: result}, function() {

				$.get('/api/candidates/party/republican', function(result) {
					this.setState({candidateList: this.state.candidateList.concat(result)}, function() {
						console.log(this.state.candidateList);
						console.log(this.state.statements);

						for (key in this.state.statements) {
							console.log(key);
					        if (key != 'age' && key != 'gender' && key != 'race' && key != 'state') {
					     		// calculations       
					        }
					    }

					    //
						var c_id = this.state.id;
						$.get('/api/candidates/id/' + c_id, function(result) {
						    this.setState({candidate: result}, function() {
		

								//PUT THE API CALL FOR THE USER HERE

						    });
						}.bind(this));


					});
			    }.bind(this));
			});
		}.bind(this));		
		});
	}.bind(this));

	
	

	console.log(this.state.candidates);

	
  },
    
  render: function() {
		return(
			<div className="text-center">
				<ul className="nav nav-pills">
				  <li role="presentation" className="active"><a data-toggle="tab" onClick={() => this.handleClick(this,"Matches")}>Matches</a></li>
				  <li role="presentation"><a data-toggle="tab" onClick={() => this.handleClick(this,"Age")}>Age</a></li>
		  		  <li role="presentation"><a data-toggle="tab" onClick={() => this.handleClick(this,"Gender")}>Gender</a></li>
		  		  <li role="presentation"><a data-toggle="tab" onClick={() => this.handleClick(this,"Race")}>Race</a></li>
		  		  <li role="presentation"><a data-toggle="tab" onClick={() => this.handleClick(this,"State")}>State</a></li>
				</ul>
				<div className="result">
					<h1 className="text-left">Your Result:</h1>
					<img className="center-block img-circle" src={"img/candidates/" + this.state.candidate.image}></img>
			        <h2 className="text-center">{this.state.candidate.name}</h2>
		        </div>
		        <br/>
		        <br/>
				<ReactHighcharts className="chart" config={this.state.config} ref="chart"></ReactHighcharts>
			</div>
		);
	},
	
	handleClick: function(x, type) {
		var conf = this.state.config;
		if (type == "Matches") {
			conf["title"]["text"] = "Your Matches";
		}
		else if (type == "Age") {
			conf["title"]["text"] = "Answers by age";
		}
		else if (type == "Gender") {
			conf["title"]["text"] = "Answers by gender";
		}
		else if (type == "Race") {
			conf["title"]["text"] = "Answers by race";
		}
		else if (type == "State") {
			conf["title"]["text"] = "Answers by state";
		}
		this.setState({config: conf});
	}
});

module.exports = Demographics;
