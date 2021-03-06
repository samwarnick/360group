var React  = require('react');
var Link = require('react-router').Link;
var ReactRouter = require("react-router");
var History = ReactRouter.History;
var Demographics = require('./Demographics');


// Register page, shows the registration form and redirects to the list if login is successful
var Register = React.createClass({



    mixins: [ History ],
    // initial state

    componentDidMount: function() {
      $("#rightLinks").find("li").removeClass("active");
      $("#registerLink").addClass("active");
    },

    getInitialState: function() {
        return {
            // there was an error registering
            error: false,
            c_error: false
        };
    },
    componentDidMount: function() {
        $("#rightLinks").find("li").removeClass("active");
        $("#registerLink").addClass("active");
    },




    // handle regiser button submit
    register: function(event) {
        // prevent default browser submit
        event.preventDefault();
        // get data from form
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var sex = this.refs.sex.value;
        var age = this.refs.age.value;
        var race = this.refs.race.value;
        var state = this.refs.state.value;
        var candidate = "none";
        if(localStorage.candidate){
          candidate = localStorage.candidate;
        }
        if (!username || !password || sex=="" || age=="" || race=="" || state=="" ) {
            console.log("field empty");
            return this.setState({
                c_error: true
            });
        }
        this.setState({c_error: false});
        // register via the API
        if(auth.loggedIn()){
          auth.logout();
        };
        auth.register(username, password, sex, age, race, state, candidate, function(loggedIn) {
            // register callback
            if (!loggedIn)
                return this.setState({
                    error: true
                });
            if(localStorage.took_quiz==1){
              this.history.pushState(null, '/demographics');
            }
            else{
            this.history.pushState(null, '/poll');
          }
        }.bind(this));

    },

    // show the registration form
    render: function() {
        return (

            <div>
            <div className="col-md-8 col-md-offset-2">
            <h2>Register</h2>
            {this.state.c_error ? (
                <div className="alert"><p>All fields are required</p></div>
              ) : null }
              {this.state.error ? (
                  <div className="alert">Invalid username or password</div>
              ) : null }
            <form className="form-vertical" onSubmit={this.register}>
            <p>Please choose a username</p>
            <input type="text" placeholder="rodham@myserver.com" ref="username"/>
            <br/>
            <br/>
            <br/>
            <p>Please choose a password</p>
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
            <input className="btn btn-primary" type="submit" value="Register" />
            </form>
            </div>
            </div>
            );
    }
});

// authentication object
var auth = {
    register: function(username, password, sex, age, race, state, candidate, cb) {
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
                state: state,
                candidate: candidate
            },
            // on success, store a login token
            success: function(res) {
                localStorage.token = res.token;
                localStorage.username = res.username;
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
        localStorage.took_quiz = 0;
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
