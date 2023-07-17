const express = require("express");
const { connectToDB, disconnectFromMongoDB, getCollection } = require("./src/mongo");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware para establecer el encabezado Content-Type en las respuestas
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// Ruta de inicio
app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de Computación");
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});