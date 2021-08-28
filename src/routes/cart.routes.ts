import express from 'express'
import bodyParser from 'body-parser';
import controller from '../controller/cart.controller'

const router = express.Router();
router.use(bodyParser.json())
router.delete('/get/cart/:id', controller.deleteCart)
router.post('/update/cart/:id', controller.updateCart)
router.get('/get/cart/:id', controller.getCartByID)
router.post('/create/cart', controller.createCart)
router.get('/get/carts', controller.getAllCart);

export = router