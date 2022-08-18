const router = require('express').Router();
const authController = require('../controllers/auth_controller');
const validaterMiddleware = require('../middlewares/validation_middleware');
const auth_middleware = require('../middlewares/auth_middleware');


router.get('/login', auth_middleware.oturumAcilmamis, authController.loginFormunuGöster);
router.post('/login', auth_middleware.oturumAcilmamis, validaterMiddleware.validateLogin(), authController.login);
  
router.get('/register', auth_middleware.oturumAcilmamis, authController.registerFormunuGöster);
router.post('/register', auth_middleware.oturumAcilmamis, validaterMiddleware.validateNewUser(), authController.register);

router.get('/forget-password',auth_middleware.oturumAcilmamis, authController.forgetPasswordFormunuGöster);
router.post('/forget-password', auth_middleware.oturumAcilmamis, authController.forgetPassword);

router.get('/logout', auth_middleware.oturumAcilmis, authController.logout);

module.exports = router;