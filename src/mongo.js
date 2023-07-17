const dotenv = require("dotenv");
dotenv.config(); // Carga las variables de entorno desde el archivo .env

const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URLSTRING; // Obtiene la URL de conexión a MongoDB desde las variables de entorno
const client = new MongoClient(URI); // Crea una instancia del cliente de MongoDB

const connectToDB = async () => {
  try {
    await client.connect();
    return client;
  } catch (error) {
    return null;
  }
};

const disconnectFromMongoDB = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error("Error al desconectar de MongoDB:", error);
    return null;
  }
};

const getCollection = async (collectionName) => {
    try {
        const db = client.db(process.env.MONGODB_DBNAME);
        const collection = db.collection(collectionName);
        return collection;
    } catch (error) {
        console.error("Error al obtener la colección:", error);
        return null;
    }
};

module.exports = { connectToDB, disconnectFromMongoDB, getCollection };