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
        $.get('/api/statements', function(result) {
            this.setState({statements: result}, function() {

                $.get('/api/candidates/party/democrat', function(result) {
                    this.setState({candidateList: result}, function() {

                        $.get('/api/candidates/party/republican', function(result) {
                            this.setState({candidateList: this.state.candidateList.concat(result)}, function() {
                                var results = JSON.parse(localStorage.userResults);
                                var candList = this.state.candidateList;
                                var scores = {};
                                for (cand in candList) {
                                    scores[candList[cand].name] = 0;
                                }
                                var qcount = 0;
                                var stmts = this.state.statements;
                                for (question in stmts) {
                                    var stmt = stmts[question];
                                    if (stmt.quote in results && results[stmt.quote] != 0) {
                                        qcount++;
                                        for (i = 0; i < candList.length; i++) {
                                            scores[stmt.raw[i].user] += Math.abs(stmt.raw[i].rating - results[stmt.quote]);
                                        }
                                    }
                                }

                                // find best match
                                var lowScore = 1000;
                                var cand = "";
                                var c_name = "";
                                for (score in scores) {
                                    if (scores[score] < lowScore) {
                                        lowScore = scores[score];
                                        cand = score;
                                    }
                                }
                                for (c in candList) {
                                    if (candList[c].name == cand) {
                                        c_name = candList[c].name;
                                    }
                                }

                                $.get('/api/candidates/id/' + c_name, function(result) {
                                    this.setState({candidate: result}, function() {
		

                                        //PUT THE API CALL FOR THE USER HERE

                                    });
                                }.bind(this));

                                // calculate percent match
                                var data = [];
                                var total = qcount * 5;
                                var sum = 0;
                                var perScores = {};
                                for (c in scores) {
                                    var per = (total - scores[c]) / total;
                                    sum += per;
                                    perScores[c] = per;
                                }
                                for (c in perScores) {
                                    var per = perScores[c] / sum * 100;
                                    data.push({
                                        name: c,
                                        y: per
                                    });
                                }

                                var conf = this.state.config;
                                conf["series"][0]["data"] = data;
                                this.setState({config: conf}, function() {
                                    console.log(this.state.config);
                                });
						

                                // calculate average matches
                                // for (cand in candList) {
                                // 	scores[candList[cand].name] = 0;
                                // }
						
                                // for (question in stmts) {
                                // 	var stmt = stmts[question];
                                // 	var sum = 0;
                                // 	for (i = candList.length; i < stmt.raw.length ; i++) {
                                // 		sum += stmt.raw[i].rating;
                                // 	}
                                // 	var avg = sum / (stmt.raw.length - candList.length);

                                // 	for (i = 0; i < candList.length; i++) {
                                // 		scores[stmt.raw[i].user] += Math.abs(avg - stmt.raw[i].rating);
                                // 	}
							
                                //    }

                            });
                        }.bind(this));
                    });
                }.bind(this));		
            });
        }.bind(this));
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
				<ReactHighcharts className="chart" config={this.state.config} ref="chart" visibility="hidden"></ReactHighcharts>
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
