import express from 'express'
import bodyParser from 'body-parser';
import controller from '../controller/beverage.controller'

const router = express.Router();
router.use(bodyParser.json())
router.delete('/get/beverage/:id', controller.deleteBeverage)
router.post('/update/beverage/:id', controller.updateBeverage)
router.get('/get/beverage/:id', controller.getBeverageByID)
router.post('/create/beverage', controller.createBeverage)
router.get('/get/beverages', controller.getAllBeverage);

export = router