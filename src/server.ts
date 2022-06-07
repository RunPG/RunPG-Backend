import app from './app'

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
  console.log(`Swagger started on http://localhost:${PORT}/doc`)
})
