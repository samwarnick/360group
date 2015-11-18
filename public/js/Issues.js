var React  = require('react');

var Issues = React.createClass({
  componentDidMount: function() {
    $("#rightLinks").find("li").removeClass("active");
    $("#issuesLink").addClass("active");
  },
  render: function() {
    return (
      <h1>Issues</h1>
    );
  }
});

module.exports = Issues;
