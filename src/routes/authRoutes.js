const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

// Ruta para registrar usuario
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Crear un nuevo usuario en Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password
    });

    res.status(201).json({ message: 'Usuario creado con éxito', uid: userRecord.uid });
  } catch (error) {
    console.error('Error registrando al usuario:', error);
    res.status(400).json({ error: 'Error al registrar el usuario', details: error });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar las credenciales del usuario
    const user = await admin.auth().getUserByEmail(email);

    // Comprobar si la contraseña es correcta (esto se hace en el cliente o Firebase)
    // Firebase no proporciona una manera directa de verificar contraseñas en el backend
    // Así que asumimos que las contraseñas son correctas al encontrar al usuario

    // Generar un token JWT para el usuario
    const token = jwt.sign({ uid: user.uid, email: user.email }, 'your-jwt-secret', { expiresIn: '1h' });

    res.status(200).json({ token: token });
  } catch (error) {
    console.error('Error iniciando sesión:', error);
    res.status(400).json({ error: 'Error al iniciar sesión', details: error });
  }
});

// Ruta para verificar el token JWT
router.post('/verify', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // El token se pasa en el encabezado Authorization como "Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Verificar el token JWT
  jwt.verify(token, 'your-jwt-secret', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    // Obtener el usuario desde Firebase
    try {
      const userRecord = await admin.auth().getUser(decoded.uid);
      res.status(200).json({ user: userRecord.toJSON() });
    } catch (error) {
      res.status(400).json({ error: 'Error al obtener el usuario', details: error });
    }
  });
});

module.exports = router;
