const router = require('express').Router();
const yonetimController = require('../controllers/yonetim_controller');
const auth_middleware = require('../middlewares/auth_middleware');

router.get('/', auth_middleware.oturumAcilmis, yonetimController.anaSayfayiGoster);


module.exports = router;