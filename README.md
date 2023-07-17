# backend-untref-proy2

Este es el Proyecto 2 de la comisión 1 del curso de Backend de Argentina Programa, dictado por la UNTREF.

## Descripción del proyecto

Se eligió trabajar con los endpoints de `Computacion.json`. El archivo con la data de ejemplo puede encontrarse en `src/sample_data.json`.

## Configuración
Crear el archivo `.env` en la raiz del proyecto, en base al `.env.example`.
```bash
cp .env.example .env
```

Ahí se encontrarán 3 variables de entorno
```bash
PORT=3000 # Puerto en el que corre la aplicación
MONGODB_URLSTRING=mongodb://localhost:27017 # URL string de la base de datos
MONGODB_DBNAME=computacion # Nombre de la base de datos
```

### Base de Datos
Es requerimiento tener instalado MongoDB. Se debe crear una nueva base de datos cuyo nombre coincida con la variable de entorno
`MONGODB_DBNAME` y dentro una colección llamada `productos`. Luego, importar `src/sample_data.json` para tener cargar el ejemplo de `computacion.json` del enunciado.
