const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');  // Para firmar y verificar JWT
const path = require('path');

// Cargar el archivo de configuración de Firebase
const serviceAccount = require(path.join(__dirname, 'config', 'serviceAccountKey.json'));

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://moss-sport-default-rtdb.firebaseio.com'
});

const app = express();
const port = 5000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/auth', require('./routes/authRoutes'));

app.use('/users', require('./routes/userRoutes'));


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
