var React = require('react');
var Link = require('react-router').Link;
var Demographics = require('./Demographics');

var Result = React.createClass({
    getInitialState: function() {
	return {
	    id: '5661c3a2aee7bcb5ff5809e2',
	    candidate: {}
	};
    },

    componentDidMount: function() {
	var c_id = this.state.id;
	$.get('/api/candidates/id/' + c_id, function(result) {
	    this.setState({candidate: result});
	}.bind(this));
    },
    closeModal: function() {
	jQuery.noConflict();
	$('#myModal').modal('hide');
    },

    render: function() {
	return (
	    <div id="myModal" className="modal fade" role="dialog">
		<div className="modal-dialog">
		    <div className="modal-content">
	                <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="text-center">Your Best Match!</h4>
	                </div>
	                <div className="modal-body">
                            <img className="center-block img-circle" src={"img/candidates/" + this.state.candidate.image}></img>
		            <h1 className="text-center">{this.state.candidate.name}</h1>
		            <h3 className="text-center">{this.state.candidate.position}</h3>
	                </div>
	                <div className="modal-footer">
		<p style={{"text-align": "left"}}>You are not currently logged in. Please log in or create an account to continue.</p>
		            <Link className="btn btn-primary" onClick={this.closeModal} to={"/register"}>Create Account</Link>
		<Link className="btn btn-primary" onClick={this.closeModal} to={"/login"}>Log In</Link>
		<Link className="skip-log-in" onClick={this.closeModal} to={"/demographics"}>Or continue as guest</Link>
	                </div>
	            </div>
	        </div>
	    </div>
	);
    }
});

module.exports = Result;
