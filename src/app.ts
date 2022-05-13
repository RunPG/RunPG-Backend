import express from 'express'
import { inventoryController, spellController, userController } from './controller'

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/user', userController)
app.use('/inventory', inventoryController)
app.use('/spell', spellController)


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
