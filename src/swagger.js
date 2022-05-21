const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'src/swagger.json'
const endpointsFiles = ['src/app.ts']

const doc = {
  info: {
    title: 'RunPG API',
    description: 'API for the RunPG mobile game and watch app',
  },
  host: null,
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

swaggerAutogen(outputFile, endpointsFiles, doc)
