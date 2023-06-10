// Importer le module MySQL
const mysql = require('mysql');

// Créer une connexion à la base de données en utilisant les paramètres de connexion
const connection = mysql.createConnection({
    host: 'localhost', // Adresse du serveur de la base de données
    user: 'root', // Nom d'utilisateur pour se connecter à la base de données
    password: '', // Mot de passe pour se connecter à la base de données
    database: 'marvel' // Nom de la base de données à laquelle se connecter
});

// Établir la connexion à la base de données
connection.connect((err) => {
    // Si une erreur se produit lors de la connexion, la lancer
    if (err) throw err;
    // Sinon, afficher un message indiquant que la connexion a réussi
    console.log('Connected to the database!');
});

// Exporter la connexion pour pouvoir l'utiliser dans d'autres modules
module.exports = connection;