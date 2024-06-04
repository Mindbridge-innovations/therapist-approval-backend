// swagger.js 
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CENTE-CONTACTS API',
    version: '1.0.0',
    description: 'This is the cente contacts backend API documentation made with Express and documented with Swagger',
  },
  servers: [
    {
        url: 'https://contacts-backend-production-32eb.up.railway.app/api',
        description: 'Production server',
      },
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    }
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec, swaggerUi };