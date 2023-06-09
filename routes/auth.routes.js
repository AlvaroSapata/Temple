const User = require("../models/User.model.js");

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAdminBack = require("../middlewares/isAdminBack.js")

const isAuthenticated = require("../middlewares/isAuthenticated.js");

// GET "/api/auth/signup" => Registra al usuario
router.post("/signup", async (req, res, next) => {
  // Destructuramos req.body
  const { username, email, password } = req.body;

  // Validaciones del servidor
  if (!username || !email || !password) {
    res.status(400).json({ message: "Debes rellenar todos los campos" });
    return;
  }

  

  try {
    // Validar que el usuario no exista
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    // Validacion REGEX contraseña
    const regexPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!regexPattern.test(password)) {
      res.status(400).json({
        message:
          "La contraseña no es sufucientemente fuerte, necesitas mayus,minus,caracter especial",
      });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    

    // Crear el usuario
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "Usuario creado" });
  } catch (error) {
    next(error);
    // console.log("error");
  }
});

// POST "/api/auth/login" => Inicia sesión
router.post("/login", async (req, res) => {
  // Destructuramos req.body
  const { email, password } = req.body;
  // Validaciones del servidor
  if (!email || !password) {
    res.status(400).json({ message: "Debes rellenar todos los campos" });
    return;
  }
  try {
    // Usuario existe en la base de datos
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "El usuario no existe" });
      return;
    }

    // Contraseña correcta
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Contraseña incorrecta" });
      return;
    }

    // Crear el token y enviarlo al usuario

    // 1. Creamos el payload
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    };
    console.log(payload);
    // 2. Creamos el token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    // 3. Enviamos el token al usuario
    res.json({
      authToken,
    });
  } catch (error) {
   
    next(error);
  }
});

// GET "/api/auth/verify" => Verifica quien es el usuario logueado
router.get("/verify", isAuthenticated, (req, res, next) => {
  // 1. Recibir y validar el token a traves del middleware
  // 2. Extraer el payload para indicar quien es el usuario de ese token

  

  res.json({ payload: req.payload });
});

module.exports = router;
