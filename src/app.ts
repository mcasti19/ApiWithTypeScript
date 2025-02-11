import express, { Application } from "express";
import morgan from "morgan";
import 'module-alias/register';

// Importa tus rutas y configuración de base de datos
import "./config/db";
import routes from "./routes/routes";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use('/', routes());

// Manejador de errores global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

export default app;