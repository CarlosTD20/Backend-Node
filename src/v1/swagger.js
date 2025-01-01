const swaggerJSDOC = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const { version } = require('uuid')

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Workout API',
          version: '1.0.0',
          description: 'API for managing workouts',
        },
        servers: [
          {
            url: 'http://localhost:3000/api/v1',
          },
        ],
      },
      apis: ['./src/v1/routes/*.js', './src/database/Workout.js']
}

const swaggerSpec = swaggerJSDOC(options)

const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    app.use('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    )
}

module.exports = { swaggerDocs }