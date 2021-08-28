import express from 'express'
import bodyParser from 'body-parser';
import controller from '../controller/option.controller'

const router = express.Router();
router.use(bodyParser.json())
router.delete('/get/option/:id', controller.deleteOption)
router.post('/update/option/:id', controller.updateOption)
router.get('/get/option/:id', controller.getOptionByID)
router.post('/create/option', controller.createOption)
router.get('/get/options', controller.getAllOption);

export = router