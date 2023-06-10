const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

/**
 * Configuration de mustache
 * comme moteur de template
 * pour l'extension .mustache
 */
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

/**
 * Configuration de express
 * pour récupérer les données d'un formulaire
 * et pour servir les fichiers statiques
 * (css, js, images, etc.)
 */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes à ajouter ici
const db = require('./database');

/**
 * Route pour afficher la liste des personnages
 */
app.get("/", (req, res) => {
    // Requête SQL pour récupérer la liste des personnages
    const query = /*sql*/ `
      SELECT p.*, e.nom as nom_equipe 
      FROM personnages as p 
      JOIN equipes AS e 
      ON p.equipe_id = e.id
  `;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render("index", { personnages: result });
    });
});
/**
 * Route pour traiter le formulaire de création
 */
app.post("/create", (req, res) => {
    const { nom, photo, description, equipe_id } = req.body;

    const query = /*sql*/ `
        INSERT INTO personnages (nom, photo, description, equipe_id) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [nom, photo, description, equipe_id], (err, result) => {
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});