import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import UserRoutes from "./routes/users.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import DocumnetsRoutes from "./routes/documents.routes.js";
import DocumnetTypesRoutes from "./routes/documentTypes.routes.js";
import InstitutionsRoutes from "./routes/intitution.routes.js";
import FacultiesRoutes from "./routes/faculties.routes.js";
import ProgramsRoutes from "./routes/programs.routes.js";
import PractitionerInformationRouter from "./routes/practitionerInformation.routes.js";
import StudentsRoutes from "./routes/students.routes.js";
import DependenciesRoutes from "./routes/dependencies.routes.js";
import PrivateRoutes from "./routes/private.routes.js";

const app = express();

// ⚡ Configurar CORS
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/gobsucre/v1/auth", AuthRoutes);
app.use("/api/gobsucre/v1/users", UserRoutes);
app.use("/api/gobsucre/v1/documents", DocumnetsRoutes);
app.use("/api/gobsucre/v1/documents-types", DocumnetTypesRoutes);
app.use("/api/gobsucre/v1/intitutions", InstitutionsRoutes);
app.use("/api/gobsucre/v1/faculties", FacultiesRoutes);
app.use("/api/gobsucre/v1/programs", ProgramsRoutes);
app.use(
  "/api/gobsucre/v1/practitioner-information",
  PractitionerInformationRouter
);
app.use("/api/gobsucre/v1/students", StudentsRoutes);
app.use("/api/gobsucre/v1/dependencies", DependenciesRoutes);
app.use("/api/gobsucre/v1/private/route/admin", PrivateRoutes);
export default app;
