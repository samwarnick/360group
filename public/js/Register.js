var React  = require('react');
var Link = require('react-router').Link;

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
            error: false
        };
    },

    // handle regiser button submit
    register: function(event) {
        // prevent default browser submit
        event.preventDefault();
        // get data from form
        var username = this.refs.username.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        var sex = this.refs.sex.getDOMNode().value;
        var age = this.refs.age.getDOMNode().value;
        var race = this.refs.race.getDOMNode().value;
        var state = this.refs.state.getDOMNode().value;
        if (!username || !password) {
            return;
        }
        // register via the API
        auth.register(username, password, sex, age, race, state, function(loggedIn) {
            // register callback
            if (!loggedIn)
                return this.setState({
                    error: true
                });
            this.context.router.replaceWith('/list');
        }.bind(this));
    },

    // show the registration form
    render: function() {
        return (
            <div>
            <h2>Register</h2>
            <form className="form-vertical" onSubmit={this.register}>
            <p>Please choose a username *</p>
            <input type="text" placeholder="rodham@myserver.com" ref="username"/>
            <br/>
            <br/>
            <br/>
            <p>Please choose a password *</p>
            <input type="password" placeholder="dem4life" ref="password"/>
            <br/>
            <br/>
            <br/>
            <p>Please select your sex</p>
            <input list="sexes" name="sex">
                <datalist id="sexes">
                    <option value="Male"/>
                    <option value="Female"/>
                </datalist>
            </input>
            <br/>
            <br/>
            <br/>
            <p>Please select your race</p>
            <input list="races" name="race">
                <datalist id="races">
                    <option value="Caucasion"/>
                    <option value="Black"/>
                    <option value="Latino"/>
                    <option value="Asian"/>
                    <option value="Other"/>
                </datalist>
            </input>
            <br/>
            <br/>
            <br/>
            <p>Please enter your age</p>
            <input type="age" placeholder="68" ref="age"/>
            <br/>
            <br/>
            <br/>
            <p>Please select your state</p>
            <input list="states" name="state">
                <datalist id="states">
                    <option value="AL"/>
                    <option value="AK"/>
                    <option value="AZ"/>
                    <option value="AR"/>
                    <option value="CA"/>
                    <option value="CO"/>
                    <option value="CT"/>
                    <option value="DE"/>
                    <option value="FL"/>
                    <option value="GA"/>
                    <option value="HI"/>
                    <option value="ID"/>
                    <option value="IL"/>
                    <option value="IN"/>
                    <option value="IA"/>
                    <option value="KS"/>
                    <option value="KY"/>
                    <option value="LA"/>
                    <option value="ME"/>
                    <option value="MD"/>
                    <option value="MA"/>
                    <option value="MI"/>
                    <option value="MN"/>
                    <option value="MS"/>
                    <option value="MO"/>
                    <option value="MT"/>
                    <option value="NE"/>
                    <option value="NV"/>
                    <option value="NH"/>
                    <option value="NJ"/>
                    <option value="NM"/>
                    <option value="NY"/>
                    <option value="NC"/>
                    <option value="ND"/>
                    <option value="OH"/>
                    <option value="OK"/>
                    <option value="OR"/>
                    <option value="PA"/>
                    <option value="RI"/>
                    <option value="SC"/>
                    <option value="SD"/>
                    <option value="TN"/>
                    <option value="TX"/>
                    <option value="UT"/>
                    <option value="VT"/>
                    <option value="VA"/>
                    <option value="WA"/>
                    <option value="WV"/>
                    <option value="WI"/>
                    <option value="WY"/>
                </datalist>
            </input>
            <br/>
            <br/>
            <br/>
            <input className="btn" type="submit" value="Register" />
            {this.state.error ? (
                <div className="alert">Invalid username or password.</div>
                ) : null }
            </form>
            </div>
            );
    }
});

// authentication object
var auth = {
    register: function(username, password, sex, race, age, state, cb) {
        // submit request to server, call the callback when complete
        var url = "/api/users/register";
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            data: {
                username: username,
                password: password,
                sex: sex,
                race: race,
                age: age,
                state: state
            },
            // on success, store a login token
            success: function(res) {
                localStorage.token = res.token;
                localStorage.name = res.name;
                if (cb)
                    cb(true);
                this.onChange(true);
            }.bind(this),
            error: function(xhr, status, err) {
                // if there is an error, remove any login token
                delete localStorage.token;
                if (cb)
                    cb(false);
                this.onChange(false);
            }.bind(this)
        });
    },
    // get the token from local storage
    getToken: function() {
        return localStorage.token;
    },
    // get the name from local storage
    getName: function() {
        return localStorage.name;
    },
    // logout the user, call the callback when complete
    logout: function(cb) {
        delete localStorage.token;
        if (cb) cb();
        this.onChange(false);
    },
    // check if user is logged in
    loggedIn: function() {
        return !!localStorage.token;
    },
    // default onChange function
    onChange: function() {},
};

module.exports = Register;