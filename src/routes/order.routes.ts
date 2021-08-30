import express from 'express'
import bodyParser from 'body-parser';
import controller from '../controller/order.controller'

const router = express.Router();
router.use(bodyParser.json())
router.delete('/get/order/:id', controller.deleteOrder)
router.post('/update/order/:id', controller.updateOrder)
router.get('/get/order/:id', controller.getOrderByID)
router.post('/create/order', controller.createOrder)
router.get('/get/orders', controller.getAllOrder);

export = router