const router = require('express').Router();
const userController = require('../controllers/userControllers');
const userMiddleware = require('../middlewares/userMiddleware');
const { validate } = require('../utils/validation');

//REGISTER ROUTE
router.post(
  '/register',
  validate(userMiddleware.registerValidate),
  userMiddleware.checkExistsEmail,
  userController.register
);

//LOGIN ROUTE
router.post('/login', userController.login);

//LẤY TẤT CẢ USER TRÊN DATABASE
router.get('/', userController.getAllUsers);

//GET ME PROFILE
router.get('/me/:id', userMiddleware.authMiddleware, userController.getMeProfile);

//GET suggest follow
router.get('/suggest-follow', userMiddleware.authMiddleware, userController.suggestFollow);

//GET USER BY ID
router.get('/:id', userController.getUserById);



module.exports = router;
