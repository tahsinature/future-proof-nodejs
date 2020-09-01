import { Router } from 'express'
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express'
const apiSpec = require('@root/openapi.json')
import * as BookController from '@src/controllers/book'

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
}

const router = Router()

// Book routes
router.post('/book/add', BookController.add)
router.get('/book/all', BookController.all)
router.get('/book/search', BookController.search)

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions))

export default router
