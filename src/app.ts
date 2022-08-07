import express from 'express'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'
import { equipementBaseController, equipementController, guildController, inventoryController, itemController, spellController, userController } from './controller'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const ENV = process.env.ENV
if (ENV === undefined) {
  console.error('ENV variable missing')
}

const app = express()

app.use(express.json())
if (ENV !== 'TEST') {
  app.use(morgan('common'))
}

app.use('/user', userController
  // #swagger.tags = ['User']
)
app.use('/inventory', inventoryController
  // #swagger.tags = ['Inventory']
)
app.use('/spell', spellController
  // #swagger.tags = ['Spell']
)
app.use('/guild', guildController
  // #swagger.tags = ['Guild']
)
app.use('/equipement', equipementController
  // #swagger.tags = ['Equipement']
)
app.use('/equipementBase', equipementBaseController
  // #swagger.tags = ['Equipement Base']
)
app.use('/item', itemController
  // #swagger.tags = ['Item']
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
