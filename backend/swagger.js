const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce Store API',
      version: '1.0.0',
      description: 'API documentation for the E-commerce Store',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Cart: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: { type: 'integer' },
                  quantity: { type: 'integer' },
                },
              },
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: { type: 'integer' },
                  quantity: { type: 'integer' },
                },
              },
            },
            total: { type: 'number' },
            discountCode: { type: 'string' },
            discountAmount: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        DiscountCode: {
          type: 'object',
          properties: {
            code: { type: 'string' },
            percentage: { type: 'number' },
            used: { type: 'boolean' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            error: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

module.exports = specs;