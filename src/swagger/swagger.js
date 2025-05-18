import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GOBSUCRE API",
      version: "1.0.0",
      description:
        "La API RESTful de GOBSUCRE facilita la gestión completa de usuarios practicantes, sus datos personales, documentos y procesos asociados dentro de una plataforma administrativa para la gobernación de sucre.",
      contact: {
        name: "ALBO DEV",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: [
    path.resolve(__dirname, "./routes/*.js"),
    path.resolve(__dirname, "../routes/*.js"),
    path.resolve(__dirname, "./routes/**/*.js"),
    path.resolve(__dirname, "../routes/**/*.js"),
    __filename,
  ],
};

const spec = swaggerJsdoc(options);
export default spec;
