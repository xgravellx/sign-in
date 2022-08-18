const LocalStrategy = require('passport-local').Strategy;
const { use } = require('passport');
const User = require('../models/user_model');

module.exports = function(passport){
    const options = {
        usernameField: 'email',
        passwordField: 'sifre',
    };
    passport.use(new LocalStrategy(options, async (email, sifre, done) => {


        try {
            const _bulunanUser = await User.findOne({email: email});

            if(!_bulunanUser) {
                return done(null, false, {message: 'User bulunamadı'});
            }

            if(_bulunanUser.sifre !== sifre) {
                return done(null, false, {message: 'Şifre Hatalı'});
            } else {
                return done(null, _bulunanUser);
            }

        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            const yeniUser = {
                id: user.id,
                email: user.email,
                ad: user.ad,
                soyad:user.soyad
            }
            done(err, yeniUser);
        });
    });
}