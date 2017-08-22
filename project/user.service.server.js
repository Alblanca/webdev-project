/**
 * Created by berti on 7/31/2017.
 */

//TODO passport and authentication logics are too mingled. This maybe separated to different file for better readibility
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

var blizzardAuthConfig = {
    clientID: process.env.OVERHUB_BLIZZARD_AUTH_CLIENT_ID,
    clientSecret: process.env.OVERHUB_BLIZZARD_AUTH_CLIENT_SECRET,
    callbackURL: process.env.OVERHUB_BLIZZARD_AUTH_CALLBACK_URL,
    region: "us",
    passReqToCallback: true
};

passport.use('bnet-auth', new BnetStrategy(blizzardAuthConfig, blizzardAuthenticateProfileStrategy));
passport.use('bnet', new BnetStrategy(blizzardConfig, blizzardStrategy));
passport.use(new LocalStrategy(localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

//new strategy for authentication ONLY
function blizzardAuthenticateProfileStrategy(req, token, refreshToken, profile, done) {
    var loggedInUser = req.user;
    if(!loggedInUser) {
        return done({message: "Current User Logged in for current session. Internal Server Error"});
    } else {
        //Update current user's blizzard's profile
        var newBlizzardProfile = {
            id: profile.id,
            token: token,
            provider: profile.provider,
            battletag: profile.battletag
        };

        var tempUserObj = {
            Blizzard : newBlizzardProfile
        };

        return userModel
            .updateUser(loggedInUser._id, tempUserObj)
            .then(function (user) {
                return done(null, user);
            },function (err) {
                if (err) { return done(err) ;}
            });
    }
    //TODO userModel.findUserByBlizzardId and INVALIDATE their profile.

}

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
                        provider: profile.provider,
                        battletag: profile.battletag
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
app.get('/login/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));

app.get("/api/logout", logout);
app.get('/api/currentUser', getCurrentUser);
app.get('/api/nickname/', findUserByNickname);

app.put('/api/:userId/save', savePost);
app.put('/api/:username/endorse', endorseUser);
app.put('/api/:username/fav', favoriteUser);
app.get('/api/:username/fav', getFavUsers);

//auth strategies
app.get('/login/auth/blizzard', passport.authenticate('bnet'));
app.get('/authorize/blizzard', passport.authenticate('bnet-auth'));


app.get('/blizzard/callback', passport.authenticate('bnet', {failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/project/#!/terminate-auth');
    });
//auth one does not persist session
app.get('/blizzard/authentication', passport.authenticate('bnet-auth', {failureRedirect: '/', session: false}),
    function (req, res) {
        res.redirect('/project/#!/terminate-auth');
    });



app.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/project/#!/terminate-auth');
    });

function getFavUsers(req, res) {
    var username = req.params.username;
    userModel
        .getFavUsers(username)
        .then(function (response) {
            console.log(response);
            res.send(response);
            return;
        }, function (err) {
            res.send(err.message);
            return;
        });
}

function favoriteUser(req, res) {
    var username = req.params.username;
    var toFav = req.body;
    userModel
        .favoriteUser(username, toFav)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function endorseUser(req, res) {
    var username = req.params.username;
    var user = req.body;
    userModel
        .endorseUser(username)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function savePost(req, res) {
    var userId = req.params.userId;
    var postId = req.body;
    userModel
        .savePost(postId, userId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

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
    var currentUser = req.user;

    userModel
        .createUser(user)
        .then(function(user){
                if(user){
                    if(currentUser) {
                        res.sendStatus(200);
                    } else {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }

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

function getAllUsers(req, res) {
    userModel
        .getAllUsers()
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function getUserById(req, response) {
    var userId = req.params.userId;
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