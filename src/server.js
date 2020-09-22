const fastify = require("fastify")({ logger: true });
require('dotenv').config()

const db = require("./models");
db.sequelize.sync();

// const dbModels = require("./models");
const Tutorial = db.tutorials;

const routes = [
  {
    method: "GET",
    url: "/test",
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      try {
        const data = await Tutorial.findAll();
        return data;
      } catch (err) {
        return {
          message:
            `---> Error: ${err.message}` || "Some error occurred while retrieving tutorials.",
        };
      }
    },
  },
  {
    method: "POST",
    url: "/test",
    handler: async (request, reply) => {
      try {
        if (!request.body.title) {
          return {
            message: "Content can not be empty!",
          };
        }

        // Create a Tutorial
        const tutorial = {
          title: request.body.title,
          description: request.body.description,
          published: request.body.published ? request.body.published : false,
        };

        // Save Tutorial in the database
        const data = await Tutorial.create(tutorial);
        return data;
      } catch (err) {
        return {
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        };
      }
    },
  },
  {
    method: "DELETE",
    url: "/test/:id",
    handler: async (request, reply) => {
      try {
        if (!request.params.id) {
          return {
            message: "Id can not be empty!",
          };
        }

        const { id } = request.params;

        const dataAlreadyExists = await Tutorial.findByPk(id);

        if (!dataAlreadyExists) {
          return {
            message: "Data not exists",
          };
        }

        // Save Tutorial in the database
        const data = await Tutorial.destroy({ where: { id } });
        return data && "Deleted";
      } catch (err) {
        return {
          message:
            err.message || "Some error occurred while deleting the Tutorial.",
        };
      }
    },
  },
];

routes.forEach((route, index) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3001, '0.0.0.0');
    fastify.log.info(`🏃--------> server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
