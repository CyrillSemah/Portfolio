const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Correction du port pour Heroku

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration du transporteur d'email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cyrillsemah@gmail.com',
    pass: 'biaqjaodyvbqvras' // Remplacez par votre vrai mot de passe d'application
  }
});

// Route pour l'envoi d'email
app.post('/send-email', (req, res) => {
  const { civilite, nom, prenom, societe, email, message } = req.body;

  // Vérifier les champs requis
  if (!nom || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Tous les champs requis ne sont pas remplis' 
    });
  }
  
  const mailOptions = {
    from: email,
    to: 'cyrillsemah@gmail.com',
    subject: `Nouveau message de contact de ${civilite} ${nom}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Civilité:</strong> ${civilite}</p>
      <p><strong>Nom:</strong> ${nom}</p>
      ${prenom ? `<p><strong>Prénom:</strong> ${prenom}</p>` : ''}
      ${societe ? `<p><strong>Société:</strong> ${societe}</p>` : ''}
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur:', error);
      return res.status(500).json({ 
        success: false, 
        message: `L'email n'a pas pu être envoyé. Erreur: ${error.message}` 
      });
    }
    
    console.log('Email envoyé:', info.response);
    res.json({ success: true });
  });
});

// Servir les fichiers statiques correctement sur Heroku
app.use(express.static(__dirname + '/'));

// Route pour la page d'accueil (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Démarrer le serveur avec le port dynamique Heroku
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});