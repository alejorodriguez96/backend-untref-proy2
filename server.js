const express = require("express");
const { connectToDB, disconnectFromMongoDB, getCollection } = require("./src/mongo");
const app = express();
const PORT = process.env.PORT || 3000;

const PRODUCT_REQUIRED_FIELDS = ["codigo", "nombre", "categoria", "precio"];

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

// Ruta para obtener todos los documentos de la colección
app.get("/productos", async (req, res) => {
    const collection = await getCollection("productos");
    const productos = await collection.find({}).toArray();
    res.status(200).json(productos);
});

// Ruta para obtener un documento de la colección por su id
app.get("/productos/:id", async (req, res) => {
    try {
        const collection = await getCollection("productos");
        const producto = await collection.findOne({ codigo: parseInt(req.params.id) });
        console.log(producto);
        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.status(200).json(producto);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse a la BBDD" });
    }
});

// Ruta para obtener un documento de la colección por su nombre o parte de él
app.get("/productos/nombre/:nombre", async (req, res) => {
    try {
        const collection = await getCollection("productos");
        const producto = await collection.find({ nombre: { $regex: req.params.nombre, $options : 'i' } }).toArray();
        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.status(200).json(producto);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse a la BBDD" });
    }
});

// Ruta para obtener un documento de la colección por su categoría o parte de ella
app.get("/productos/categoria/:categoria", async (req, res) => {
    try {
        const collection = await getCollection("productos");
        const producto = await collection.find({ categoria: { $regex: req.params.categoria, $options : 'i' } }).toArray();
        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.status(200).json(producto);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse a la BBDD" });
    }
});

// Ruta para crear un documento en la colección
app.post("/productos", async (req, res) => {
    const isValidOperation = Object.keys(req.body).every(
        (key) => PRODUCT_REQUIRED_FIELDS.includes(key)
    );
    if (!isValidOperation) {
        return res.status(400).json({ error: "Campos inválidos" });
    }
    try {
        const collection = await getCollection("productos");
        const producto = await collection.insertOne(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse a la BBDD" });
    }
});

// Ruta para actualizar un documento de la colección
app.put("/productos/:id", async (req, res) => {
    // Check if the new price is given
    if (!req.body.precio) {
        return res.status(400).json({ error: "Campos inválidos" });
    }
    try {
        const collection = await getCollection("productos");
        const producto = await collection.findOne({ codigo: parseInt(req.params.id) });
        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            await collection.updateOne(
                { codigo: parseInt(req.params.id) },
                { $set: { precio: req.body.precio } }
            );
            res.status(200).json(producto);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse a la BBDD" });
    }
});

// Ruta para eliminar un documento de la colección
app.delete("/productos/:id", async (req, res) => {
    try {
        const collection = await getCollection("productos");
        const producto = await collection.findOne({ codigo: parseInt(req.params.id) });
        if (!producto) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            await collection.deleteOne({ codigo: parseInt(req.params.id) });
            res.status(200).json(producto);
        }
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse a la BBDD" });
    }
});

app.get("*", (req, res) => {
    res.status(404).end("URL no encontrada");
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});