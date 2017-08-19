/**
 * Created by berti on 7/31/2017.
 */
var app = require("../express");
var userModel = require("./models/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BnetStrategy = require('passport-bnet').Strategy;


var auth = authorized;

var googleConfig = {
    clientID     : process.env.OVERHUB_GOOGLE_CLIENT_ID,
    clientSecret : process.env.OVERHUB_GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.OVERHUB_GOOGLE_CALLBACK_URL
};

var blizzardConfig = {
    clientID: process.env.OVERHUB_BLIZZARD_CLIENT_ID,
    clientSecret: process.env.OVERHUB_BLIZZARD_CLIENT_SECRET,
    callbackURL: process.env.OVERHUB_BLIZZARD_CALLBACK_URL,
    region: "us"
};

passport.use(new BnetStrategy(blizzardConfig, blizzardStrategy));
passport.use(new LocalStrategy(localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function blizzardStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByBlizzardId(profile.id)
        .then(function (user) {
            if(user) {
                return done(null, user);
            } else {
                var newBlizzardUser = {
                    username: profile.battletag.split('#').join('-'),
                    blizzard: {
                        id: profile.id,
                        token: token,
                        provider: profile.provider
                    }
                }
            }
            return userModel.createUser(newBlizzardUser);
        }, function (err) {
            if(err) { return done(err); }
        })
        .then(function (user) {
            return done(null, user);
        }, function (err) {
            if(err) { return done(err); }
        });
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(!user) {
                return done(null, false);
            }
            return done(null, user);
        }, function (err) {
            if(err) {
                return done(err);
            }
        });
}

//http handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
// app.post("/api/login", findUser);
app.post("/api/findUser", findUser);
app.post  ('/api/login', passport.authenticate('local'), login);
app.post("/api/register", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", unregisterUser);
app.get("/api/checkLogin", checkLogin);
app.get('/login/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get("/api/logout", logout);
app.get('/api/currentUser', getCurrentUser);
app.get('/api/nickname/', findUserByNickname);

//auth strategies
app.get('/login/auth/blizzard', passport.authenticate('bnet'));

app.get('/blizzard/callback',
    passport.authenticate('bnet', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/'
    }));
//
// app.get('/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/project/#!/profile',
//         failureRedirect: '/project/#!/login'
//     }));

app.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/project/#!/terminate-auth');
    });


function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.json(200);
}

function getCurrentUser (req, res) {
    if (req.user === undefined) {
        res.json(null);
    } else {
        res.json(req.user);
    }
}

function findUserByNickname(req, res) {
    var nickname = req.query.nickname;

    userModel
        .findUserByNickname(nickname)
        .then(function (response) {
            res.send(response);
            return;
        }, function (err) {
            res.send(err.message);
            return;
        });
}

function unregisterUser(req, res) {
    var userId = req.params.userId;

    userModel
        .unregisterUser(userId)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = user._id;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function registerUser(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });


}

function findUser(req, res) {
    var user = req.body;
    var username = user.username;
    var password = user.password;

    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            })
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
                return;
            }, function (err) {
                res.sendStatus(500).send(err);
                return;
            })
    }
}

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    var userId = req.params.userId;
    var what;
    return userModel
        .findUserById(userId)
        .then(function (user) {
            response.json(user);
            return;
        });
    response.send("can't find matched user");
    return;
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}