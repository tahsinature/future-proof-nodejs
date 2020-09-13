import bookControllers from '@root/src/controllers/book'
import { Router } from 'express'
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express'
const apiSpec = require('@root/openapi.json')

const swaggerUiOptions: SwaggerUiOptions = { customCss: '.swagger-ui .topbar { display: none }' }

const router = Router()

// Book routes
router.post('/book/add', bookControllers.add.requestHandler)
router.get('/book/all', bookControllers.all.requestHandler)
router.get('/book/search', bookControllers.search.requestHandler)

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions))

export default router
