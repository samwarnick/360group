var React = require('react');
var Link = require('react-router').Link;
var Highcharts = require('highcharts');
var ReactHighcharts = require('react-highcharts/dist/bundle/highcharts');

var Demographics = React.createClass({
	getInitialState: function() {
		return {
			statements: [],
			config: {
			  chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
		    title: {
		      text: 'Your matches'
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
		$.get('/api/statements', function(result) {
	    this.setState({statements: result});
		}.bind(this));

	
  },
    
  render: function() {
		console.log('Demographics state: ');
		console.log(this.state.statements);
	
		return(
			<div>
				<ul className="nav nav-pills">
				  <li role="presentation" className="active"><a data-toggle="tab" onClick={() => this.handleClick(this,"Matches")}>Matches</a></li>
				  <li role="presentation"><a data-toggle="tab" onClick={() => this.handleClick(this,"Age")}>Age</a></li>
		  		<li role="presentation"><a data-toggle="tab" onClick={() => this.handleClick(this,"Gender")}>Gender</a></li>
		  		<li role="presentation"><a data-toggle="tab" onClick={() => this.handleClick(this,"Race")}>Race</a></li>
		  		<li role="presentation"><a data-toggle="tab" onClick={() => this.handleClick(this,"State")}>State</a></li>
				</ul>			
				<ReactHighcharts className="chart" config={this.state.config} ref="chart"></ReactHighcharts>
			</div>
		);
	},
	
	handleClick: function(x, type) {
		console.log('clicked');
		console.log(type);
		var conf = this.state.config;
		if (type == "Matces") {
			conf["title"]["text"] = "Answers by age";
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
