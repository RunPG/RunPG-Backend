import express from 'express'
import { inventoryController, playerController, spellController, userController } from './controller'

const app = express()
const PORT = 5000 // TODO: Move port to env

app.use(express.json())

app.use('/user', userController)
app.use('/player', playerController)
app.use('/inventory', inventoryController)
app.use('/spell', spellController)


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
