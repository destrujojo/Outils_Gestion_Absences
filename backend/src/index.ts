// src/index.ts
import express from "express";
import cors from "cors";

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

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
