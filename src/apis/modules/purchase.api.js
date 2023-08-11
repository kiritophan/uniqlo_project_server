import express from 'express'
const router = express.Router()

import purchaseController from '../../controllers/purchase.controller';
import authencation from "../../middlewares/authencation";

router.post('/:user_id', authencation.checkToken, purchaseController.addToCart);
router.get('/:user_id', authencation.checkToken, purchaseController.findCart);
router.delete('/:product_id', purchaseController.deleteProductFromCart);
router.patch('/:user_id', purchaseController.updateCart);
export default router;