const {body} = require('express-validator');

// Yeni bir kayıt olduğu zamanki doğrulama
const validateNewUser = () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage('Geçerli bir email giriniz'),

        body('sifre')
            .trim()
            .isLength({min:6}).withMessage('Şifre en az 6 karakter olmalı')
            .isLength({max:20}).withMessage('Şifre en fazla 20 karakter olmalı'),

        body('ad')
            .trim()
            .isLength({min:2}).withMessage('İsim en az 2 karakter olmalı')
            .isLength({max:30}).withMessage('İsim en fazla 30 karakter olmalı'),

        body('soyad')
        .trim()
        .isLength({min:2}).withMessage('Soyisim en az 2 karakter olmalı')
        .isLength({max:30}).withMessage('Soyisim en fazla 30 karakter olmalı'),

        body('resifre').trim().custom((value, {req}) => {
                if (value !== req.body.sifre) {
                    throw new Error('Şifreler aynı değil');
                }
                return true;
            })
    ]
}

// Login olduğu zamanki doğrulama
const validateLogin= () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage('Geçerli bir email giriniz'),

        body('sifre')
            .trim()
            .isLength({min:6}).withMessage('Şifre en az 6 karakter olmalı')
            .isLength({max:20}).withMessage('Şifre en fazla 20 karakter olmalı'),
    ]
}

module.exports = {
    validateNewUser,
    validateLogin,
}