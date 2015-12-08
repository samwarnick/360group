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
        if (!username || !password || !sex || !age || !race || !state) {
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
                <select name="sex" ref = "sex">
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            <br/>
            <br/>
            <br/>
            <p>Please select your race</p>
                <select name="race" ref = "race">
                    <option value=""></option>
                    <option value="Caucasion">Caucasion</option>
                    <option value="Black">Black</option>
                    <option value="Latino">Latino</option>
                    <option value="Asian">Asian</option>
                    <option value="Other">Other</option>
                </select>
            <br/>
            <br/>
            <br/>
            <p>Please enter your age</p>
            <input type="age" placeholder="68" ref="age"/>
            <br/>
            <br/>
            <br/>
            <p>Please select your state</p>
                <select name="state" ref = "state">
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
