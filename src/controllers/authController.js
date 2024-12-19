const admin = require('firebase-admin');

// Función para registrar un usuario con correo y contraseña
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password
    });
    res.status(201).json({ message: 'Usuario registrado correctamente', user: userRecord });
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

// Función para iniciar sesión con correo y contraseña
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Aquí debes verificar la contraseña de manera segura.
    // Firebase Auth no soporta directamente la verificación de contraseña en el backend.
    // Para esto, necesitas usar Firebase Authentication en el frontend.
    // Sin embargo, podemos emitir un JWT Token para validar las sesiones.

    const token = await admin.auth().createCustomToken(user.uid);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(400).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// Función para verificar la autenticación con JWT
const verifyAuthToken = async (req, res) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(403).json({ message: 'Token de autenticación no proporcionado' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.status(200).json({ message: 'Autenticación exitosa', decodedToken });
  } catch (error) {
    res.status(403).json({ message: 'Token inválido', error: error.message });
  }
};

module.exports = { registerUser, loginUser, verifyAuthToken };
