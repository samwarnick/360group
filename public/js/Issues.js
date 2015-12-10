var React  = require('react');
var Link = require('react-router').Link;

var Issues = React.createClass({

  componentDidMount: function() {
    $("#rightLinks").find("li").removeClass("active");
    $("#issuesLink").addClass("active");
  },

  render: function() {
    return (
      <div>
        <h1>Issues</h1>
        <IssuesGroups />
      </div>
    );
  }
});

var IssuesGroups = React.createClass({
  getInitialState: function() {
    return {
      issues: []
    };
  },

  componentDidMount: function() {
    $.get('/api/issues', function(result) {
      this.setState({issues: result});
    }.bind(this));
  },

  render: function() {

    var tabs = this.state.issues.map(function(issue, index) {
      return (
        <IssueNavTab key={issue._id.topic} issue={issue._id.topic} index={index}/>
      );
    }.bind(this));

    var content = this.state.issues.map(function(issue, index) {
      return (
        <IssueContentPanel key={issue._id.topic} issue={issue._id.topic} quotes={issue.quotes} index={index}/>
      );
    }.bind(this));

    return (
      <div>
        <ul className="nav nav-pills" role="tablist">
          {tabs}
        </ul>

        <div className="tab-content">
          {content}
        </div>
      </div>
    );
  }
});

var IssueNavTab = React.createClass({
  render: function() {

    var active = "";
    if (this.props.index == 0) {
      active = " active";
    }

    return (
      <li role="presentation" className={active}><a href={"#" + this.props.index} aria-controls={this.props.index} role="tab" data-toggle="tab">{this.props.issue}</a></li>
    );
  }
});

var IssueContentPanel = React.createClass({
  render: function() {
    var quotes = this.props.quotes.map(function(quote) {
      return (
        <Quote key={quote.quote} quote={quote.quote} candidate={quote.candidate_id} name={quote.name}/>
      );
    }.bind(this));

    var active = "";
    if (this.props.index == 0) {
      active = " active";
    }

    return (
      <div role="tabpanel" className={"tab-pane" + active} id={this.props.index}>
        <div className="panel panel-default">
          <ul className="list-group">
            {quotes}
          </ul>
        </div>
      </div>
    );
  }
});

var Quote = React.createClass({
  render: function() {
    return (
      <Link className="list-group-item" to={"/candidates/"+ this.props.candidate}>
        {this.props.quote}
        <h2>{this.props.name}</h2>
      </Link>
    );
  }
});

module.exports = Issues;
