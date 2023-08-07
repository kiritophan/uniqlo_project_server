/* Create Express Router */
import express from 'express'
const router = express.Router()

import userModule from './modules/user'
router.use('/users', userModule)

import categoryApi from '../apis/modules/category.api';
router.use('/categories', categoryApi)

import productApi from '../apis/modules/product.api';
router.use('/products', productApi)

export default router;