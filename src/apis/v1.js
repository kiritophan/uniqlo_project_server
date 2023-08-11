/* Create Express Router */
import express from 'express';
const router = express.Router();

import userModule from './modules/user';
import categoryModule from './modules/category.api';
import productModule from './modules/product.api';
import purchaseModule from './modules/purchase.api';

router.use('/users', userModule);
router.use('/categories', categoryModule);
router.use('/products', productModule);
router.use('/purchase', purchaseModule);

export default router;