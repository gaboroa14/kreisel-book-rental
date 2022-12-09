import swaggerJsonDoc from 'swagger-jsdoc'

const swaggerOptions = {
  openapi: '3.0.0',
  swaggerDefinition: {
    info: {
      title: 'Documentación - Kreisel Book Rental',
      description:
        'Documentación del proyecto Kreisel Book Rental utilizando Swagger como plataforma.'
    },
    basePath: '/api',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header'
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/components/*/*.yml', './src/components/*/*/*.yml']
}

export const swaggerDocs = swaggerJsonDoc(swaggerOptions)
