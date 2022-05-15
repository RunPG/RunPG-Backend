import express from 'express'
import morgan from 'morgan'
import { inventoryController, spellController, userController } from './controller'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('common'))

app.use('/user', userController)
app.use('/inventory', inventoryController)
app.use('/spell', spellController)

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
