import express from 'express'
import morgan from 'morgan'
import { equipmentBaseController, equipmentController, guildController, inventoryController, itemController, marketController, userController } from './controller'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import path from 'path'
import { StatusCodes } from 'http-status-codes'

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
app.use('/guild', guildController
  // #swagger.tags = ['Guild']
)
app.use('/equipment', equipmentController
  // #swagger.tags = ['Equipment']
)
app.use('/equipmentBase', equipmentBaseController
  // #swagger.tags = ['Equipment Base']
)
app.use('/item', itemController
  // #swagger.tags = ['Item']
)
app.use('/market', marketController
  // #swagger.tags = ['Market']
)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/health', (_, res) => {
  /**
   * #swagger.tags = ['Health']
   * #swagger.summary = 'Check if the server is up and running'
   */
  res.send({ version: process.env.npm_package_version })
    .sendStatus(StatusCodes.OK)
})

app.get('/', (_, res) => {
  // #swagger.ignore = true
  const options = {
    root: path.join(__dirname, 'resource'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  res.sendFile('slime.gif', options)
})

export default app
