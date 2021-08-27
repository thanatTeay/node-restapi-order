import express from 'express'
import controller from '../controller/beverage.controller'

const router = express.Router();

router.post('/create/beverage', controller.createBeverage)
router.get('/get/beverages', controller.getAllBeverage);

export = router