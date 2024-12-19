const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');  // Asegúrate de que el archivo esté en la ruta correcta

// Verificar que Firebase solo se inicializa una vez
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://moss-sport-default-rtdb.firebaseio.com/'  // Usa el URL de tu Firebase Realtime Database
  });
}

const db = admin.database();  // Acceso a la base de datos
module.exports = db;  // Para usarlo en otros archivos
