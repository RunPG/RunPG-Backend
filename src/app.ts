import express from 'express'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'
import { inventoryController, spellController, userController } from './controller'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const app = express()

app.use(express.json())
app.use(morgan('common'))

app.use('/user', userController
// #swagger.tags = ['User']
)
app.use('/inventory', inventoryController
// #swagger.tags = ['Inventory']
)
app.use('/spell', spellController
// #swagger.tags = ['Spell']
)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/health', (_, res) => {
  /**
   * #swagger.tags = ['Health']
   * #swagger.summary = 'Check if the server is up and running'
   */
  res.sendStatus(StatusCodes.OK)
})

export default app
