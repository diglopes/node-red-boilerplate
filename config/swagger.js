module.exports = {
  swagger: "2.0",
  info: {
    description:
      "This is a simple Node-RED boilerplate, for this example we have just example routes to test the server.",
    version: "1.0.0",
    title: "Node-RED Boilerplate",
    termsOfService: "http://swagger.io/terms/",
    contact: {
      email: "diego@zerotreze.space",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  host: "",
  basePath: "/api",
  tags: [
    {
      name: "test",
      description: "Test routes",
    },
  ],
  schemes: ["http"],
  paths: {
    "/hello": {
      get: {
        tags: ["test"],
        summary: "Return if the app is running correctly",
        description: "",
        operationId: "testHello",
        produces: ["application/json"],
        responses: {
          200: {
            description: "Sucessful operation",
            schema: {
              type: "object",
              $ref: "#/definitions/Hello",
            },
          },
        },
      },
    },
  },
  securityDefinitions: {},
  definitions: {
    Hello: {
      type: "object",
      properties: {
        running: {
          type: "boolean",
          default: true,
        },
        timestamp: {
            type: "string",
            format: "date-time"
        },
        port: {
          type: "string",
          default: 1880,
        },
      },
    },
  },
};
