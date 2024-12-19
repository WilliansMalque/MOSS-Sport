const admin = require('firebase-admin');

// Crear un usuario con rol
exports.createUserWithRole = async (req, res) => {
  try {
    const { uid, nombre, email, rol } = req.body;

    // Validar datos
    if (!uid || !nombre || !email || !rol) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Guardar usuario en Firestore
    await admin.firestore().collection('Usuarios').doc(uid).set({
      nombre,
      email,
      rol,
      fechaRegistro: new Date().toISOString(),
    });

    return res.status(201).json({ message: 'Usuario creado con éxito.' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario.' });
  }
};
