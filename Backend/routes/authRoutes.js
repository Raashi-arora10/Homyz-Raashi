const express = require('express');
const router = express.Router();
const path = require('path');
// require('dotenv').config();
const jwt = require("jsonwebtoken");
const authController = require(path.join(__dirname, '..', 'controllers', 'authControllers'));
const emailController = require(path.join(__dirname, '..', 'controllers', 'emailController')); 

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/signup', authController.getUser);
router.post('/email', emailController.sendEmail);  
router.post('/addHotels', authController.addHotels);
router.get('/getAllHotels', authController.getAllHotels);
router.get('/searchHotels', authController.searchHotels);
router.get('/filterHotelsByPriceRange', authController.filterHotelsByPriceRange);
router.post('/addConfirmData', authController.addConfirmData);
router.get('/getConfirmData', authController.getConfirmData);
router.delete('/deleteAllHotels', authController.deleteAllHotels);
router.get('/getDetails/:id', authController.getDetails);
router.get('/updateHotel/:id', authController.updateHotel);
router.post('/registered', authController.addPaymentDetails);
router.get('/registered', authController.getPaymentDetails);

module.exports = router;
