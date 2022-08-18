const {validationResult} = require('express-validator');
const passport = require('passport');
const User = require('../models/user_model');
require('../config/passport_local')(passport);

const loginFormunuGöster = (req, res, next) => {
    res.render('login', {layout: './layout/auth_layout.ejs'});
}
const login = (req, res, next) => {
    const hatalar = validationResult(req);

    if(!hatalar.isEmpty()) {
        req.flash('validation_error', hatalar.array());
        req.flash('email', req.body.email);
        req.flash('sifre', req.body.sifre);

        res.redirect('login');
    } else {
        passport.authenticate('local', {
            successRedirect: '/yonetim',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res, next);
    }
}

const registerFormunuGöster = (req, res, next) => {
    res.render('register', {layout: './layout/auth_layout.ejs'});
}
const register = async (req, res, next) => {
    const hatalar = validationResult(req);

    if(!hatalar.isEmpty()) {
        req.flash('validation_error', hatalar.array());
        req.flash('email', req.body.email);
        req.flash('ad', req.body.ad);
        req.flash('soyad', req.body.soyad);
        req.flash('sifre', req.body.sifre);
        req.flash('resifre', req.body.resifre);
        res.redirect('/register');
        /* res.render('register', {layout: './layout/auth_layout.ejs', hatalar: hatalar.array()}); */
    } else {

        try {
            const _user = await User.findOne({email:req.body.email});

            if(_user) {
                req.flash('validation_error', [{msg: "Bu mail kullanımda"}]); 
                req.flash('email', req.body.email);
                req.flash('ad', req.body.ad);
                req.flash('soyad', req.body.soyad);
                req.flash('sifre', req.body.sifre);
                req.flash('resifre', req.body.resifre);
                res.redirect('/register');
            } else {
                const newUser = new User({
                    email:req.body.email,
                    ad:req.body.ad,
                    soyad:req.body.soyad,
                    sifre:req.body.sifre,
                });
                await newUser.save();
                console.log("kullanıcı kaydedildi");

                req.flash('success_message', [{msg: 'Giriş yapabilirsiniz'}]);
                res.redirect('/login');
            }
        } catch (err) {
            console.log("user kaydedilirken hata çıktı" + err);
        }
    }
}

const forgetPasswordFormunuGöster = (req, res, next) => {
    res.render('forget_password', {layout: './layout/auth_layout.ejs'});
}
const forgetPassword = (req, res, next) => {
    console.log(req.body);
    res.render('forget_password', {layout: './layout/auth_layout.ejs'});
}

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { 
            return next(err); 
        } else {
            req.session.destroy((error) => {
                res.clearCookie('connect.sid');
                res.render('login', {layout: './layout/auth_layout.ejs', success_message : [{msg: 'Başarıyla çıkış yapıldı'}] });
            })
        }
    })}




module.exports = {
    loginFormunuGöster,
    login,
    registerFormunuGöster,
    register,
    forgetPasswordFormunuGöster,
    forgetPassword,
    logout,
};