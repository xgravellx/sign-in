const anaSayfayiGoster = function (req, res, next) {
    res.render('index', {layout: './layout/yonetim_layout.ejs'});

}

module.exports = {
    anaSayfayiGoster,
}