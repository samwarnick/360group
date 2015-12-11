var React  = require('react');
var Link = require('react-router').Link;
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var Login = React.createClass({



    mixins: [History],

    componentDidMount: function() {
      $("#rightLinks").find("li").removeClass("active");
      $("#loginLink").addClass("active");
    },


    // initial state
    getInitialState: function() {
        return {
            // there was an error on logging in
            error: false,
            c_error: false
        };

    },

    // handle login button submit
    login: function(event) {
        // prevent default browser submit
        event.preventDefault();
        // get data from form
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        if (!username || !password) {
            return this.setState({
                c_error: true
            });
        }
        // login via API
        if(auth.loggedIn()){
          auth.logout();
        };
        auth.login(username, password, function(loggedIn) {
            // login callback
            if (!loggedIn)
                return this.setState({
                    error: true
                });
            this.history.pushState(null, '/poll');
        }.bind(this));

    },
    componentDidMount: function() {
        $("#rightLinks").find("li").removeClass("active");
        $("#loginLink").addClass("active");
    },



    // show the login form
    render: function() {
        return (
            <div>
            <div className="col-md-8 col-md-offset-2">
            <h2>Login</h2>
            {this.state.c_error ? (
                <div className="alert"><p>All fields are required</p></div>
              ) : null }
              {this.state.error ? (
                  <div className="alert">Invalid username or password</div>
              ) : null }
            <form className="form-vertical" onSubmit={this.login}>
            <input type="text" placeholder="Username" ref="username" autoFocus={true} />
            <br/>
            <br/>
            <input type="password" placeholder="Password" ref="password"/>
            <br/>
            <br/>
            <input className="btn btn-primary" type="submit" value="Login" />
            </form>
            </div>
            </div>
            );
    }
});

// authentication object
var auth = {
    // login the user
    login: function(username, password, cb) {
        // submit login request to server, call callback when complete
        cb = arguments[arguments.length - 1];
        // check if token in local storage
        if (localStorage.token) {
            if (cb)
                cb(true);
            this.onChange(true);
            return;
        }

        // submit request to server
        var url = "/api/users/login";
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function(res) {
                // on success, store a login token
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

module.exports = Login;
