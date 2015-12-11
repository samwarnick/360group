var React = require('react');
var Link = require('react-router').Link;
var Demographics = require('./Demographics');
var Login = require('./Login');

var Result = React.createClass({
    getInitialState: function() {
        return {
            candidate: {}
        };
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
                                <h4 className="text-center">Please Enter Your Demographic Information</h4>
                        </div>
                        <div className="modal-body">
                        <Register answers={this.props.answers} />
                        </div>
                    </div>
                </div>
            </div>
	);
    }
});

// Register page, shows the registration form and redirects to the list if login is successful
var Register = React.createClass({
    // context so the component can access the router
    contextTypes: {
        router: React.PropTypes.func
    },

    // initial state
    getInitialState: function() {
        return {
            // there was an error registering
            error: false,
            result: {}
        };
    },

    // handle regiser button submit
    register: function(event) {
        jQuery.noConflict();
        $('#myModal').modal('hide');
        // prevent default browser submit
        //event.preventDefault();

        // get data from form
        //var username = this.refs.username.getDOMNode().value;
        //var password = this.refs.password.getDOMNode().value;
        var sex = $('#sexes').val();//this.refs.sex.getDOMNode().value;
        var age = parseInt($('#age').val());//this.refs.age.getDOMNode().value;
        var race = $('#races').val();//this.refs.race.getDOMNode().value;
        var state = $('#states').val();//this.refs.state.getDOMNode().value;

        var request = {
            age: age,
            gender: sex,
            race: race,
            state: state
        };
        for (key in this.props.answers) {
            request[key] = this.props.answers[key];
        }
        $.post('/api/pollresults',request);
        console.log(request);

        localStorage.setItem("userResults", JSON.stringify(request));
        // register via the API
        //auth.register(username, password, sex, age, race, state, function(loggedIn) {
        // register callback
        //     if (!loggedIn)
        //         return this.setState({
        //             error: true
        //         });
        // }.bind(this));
    },

    // show the registration form
    render: function() {
        return (
            <div>
            <form className="form-vertical" onSubmit={this.register}>
            <p>Please select your sex</p>
            <select id="sexes" ref="sexes">
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <br/>
            <br/>
            <p>Please select your race</p>
            <select id="races" ref="races">
                <option value=""></option>
                <option value="Caucasion">Caucasion</option>
                <option value="Black">Black</option>
                <option value="Latino">Latino</option>
                <option value="Asian">Asian</option>
                <option value="Other">Other</option>
            </select>
            <br/>
            <br/>
            <p>Please enter your age</p>
            <input id="age" placeholder="68" ref="age"/>
            <br/>
            <br/>
            <p>Please select your state</p>
            <select id="states" ref="states">
                <option value=""></option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
            </select>
            <br/>
            <br/>            
            </form>
		    <Link className="btn btn-primary" onClick={this.register} to={"/demographics"} params={{userResults: this.state.result}}>Submit</Link>
            </div>
            );
}
});

module.exports = Result;
