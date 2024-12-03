// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import rolesRoutes from "./Routes/RolesRoutes";
import classesRoutes from "./Routes/ClassesRoutes";
import evenementsRoutes from "./Routes/EvenementsRoutes";
import fichiersRoutes from "./Routes/FichiersRoutes";
import formatsFichiersRoutes from "./Routes/FormatsFichiersRoutes";
import GestionsRoutes from "./Routes/GestionsRoutes";
import notificationsRoutes from "./Routes/NotificationsRoutes";
import statusGestionsRoutes from "./Routes/StatusGestionsRoutes";
import statusNotificationsRoutes from "./Routes/StatusNotificationsRoutes";
import utilisateursRoutes from "./Routes/UtilisateursRoutes";
import typesEvenementsRoutes from "./Routes/TypesEvenementsRoutes";

// Initialiser l'application Express
const app = express();
const port = 5000;

// Autoriser les requêtes provenant de n'importe quelle origine (CORS)
app.use(cors());

// Définir un endpoint qui répond à l'appel du bouton React
app.get("/bonjour", (req, res) => {
  console.log("Bonjour dans le terminal !");
  res.status(200).send("Bonjour envoyé au terminal !");
});

app.get("/api/data", (req: Request, res: Response): void => {
  const data = { message: "Données récupérées avec succès !" };
  res.json(data);
});

app.use("/api/roles", rolesRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/evenements", evenementsRoutes);
app.use("/api/fichiers", fichiersRoutes);
app.use("/api/formatsFichiers", formatsFichiersRoutes);
app.use("/api/gestions", GestionsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/statusGestions", statusGestionsRoutes);
app.use("/api/statusNotifications", statusNotificationsRoutes);
app.use("/api/utilisateurs", utilisateursRoutes);
app.use("/api/typesEvenements", typesEvenementsRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
