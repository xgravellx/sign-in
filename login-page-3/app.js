const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
// session işlemleri için gereken paket
const session = require('express-session');
// render edilen sayfalarda mesaj göstermek için kullanılan
// ve çalışmak için session paketi isteyen yardımcı paket
const flash = require('connect-flash');
const passport = require('passport');


// Template Engine Ayarları
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
/* const passport = require('passport'); */
app.use(expressLayout);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));



// Veritabanı bağlantısı (db)
require('./src/config/database');

const MongoDBStore = require('connect-mongodb-session')(session);
const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_CONNECTION_STRING,
  collection: 'mySessions'
});



// session cookie ve flash message
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  store: sessionStore
}));


// flash mesajların middleware olarak kullanılmasını sağladık
app.use(flash());
app.use((req, res, next) => {
  res.locals.validation_error = req.flash('validation_error');
  res.locals.success_message = req.flash('success_message');
  res.locals.email = req.flash('email');
  res.locals.ad = req.flash('ad');
  res.locals.soyad = req.flash('soyad');
  res.locals.sifre = req.flash('sifre');
  res.locals.resifre = req.flash('resifre');

  res.locals.login_error = req.flash('error');
  next();
})

app.use(passport.initialize());
app.use(passport.session());


// routers include edilir.
const authRouter = require('./src/routers/auth_router');
const yonetimRouter = require('./src/routers/yonetim_router');


// FORMDAN GELEN VERİLERİ OKUNABİLMESİ İÇİN KULLANILIR!!!! Formdan geldiği için urlencoded kullanılır
app.use(express.urlencoded({extended: true}));



// Sayfama gelen kişilerin sayısı
let sayac = 0;

// Routers
// Herkese açık olan kaizen.com sayfasıdır.
app.get('/', (req, res) => {
  if(req.session.sayac) {
    req.session.sayac++;
  } else{
    req.session.sayac = 1;
  }
  res.json({mesaj:'merhaba', sayacim: req.session.sayac, kullanici: req.user});
});

app.use('/', authRouter);
app.use('/yonetim', yonetimRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} portundan ayaklandı`);  
});