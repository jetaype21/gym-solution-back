// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const db = require("./db");


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Endpoint para obtener todos los precios
app.get("/precios", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM precios");
    res.json(result.rows);
  } catch (err) {
    console.error("Error obteniendo precios:", err);
    res.status(500).json({ error: "Error obteniendo precios" });
  }
});

// Endpoint para crear un nuevo precio
app.post("/precios", async (req, res) => {
  const { precio, nombre_plan, features } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO precios (precio, nombre_plan, features) VALUES ($1, $2, $3) RETURNING *",
      [precio, nombre_plan, features]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creando precio:", err);
    res.status(500).json({ error: "Error creando precio" });
  }
});

// Endpoint para actualizar un precio por ID
app.put("/precios/:id", async (req, res) => {
  const { id } = req.params;
  const { precio, nombre_plan, features } = req.body;
  try {
    const result = await db.query(
      "UPDATE precios SET precio = $1, nombre_plan = $2, features = $3 WHERE id = $4 RETURNING *",
      [precio, nombre_plan, features, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Precio no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error actualizando precio:", err);
    res.status(500).json({ error: "Error actualizando precio" });
  }
});

// Endpoint para obtener todos los horarios
app.get("/horarios", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM horarios");
    res.json(result.rows);
  } catch (err) {
    console.error("Error obteniendo horarios:", err);
    res.status(500).json({ error: "Error obteniendo horarios" });
  }
});

// Endpoint para obtener un horario por ID
app.get("/horarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM horarios WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Horario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error obteniendo horario por ID:", err);
    res.status(500).json({ error: "Error obteniendo horario por ID" });
  }
});

// Endpoint para crear un nuevo horario
app.post("/horarios", async (req, res) => {
  const { nombre_clase, tiempo, encargado } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO horarios (nombre_clase, tiempo, encargado) VALUES ($1, $2, $3) RETURNING *",
      [nombre_clase, tiempo, encargado]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creando horario:", err);
    res.status(500).json({ error: "Error creando horario" });
  }
});

// Endpoint para actualizar un horario por ID
app.put("/horarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre_clase, tiempo, encargado } = req.body;
  try {
    const result = await db.query(
      "UPDATE horarios SET nombre_clase = $1, tiempo = $2, encargado = $3 WHERE id = $4 RETURNING *",
      [nombre_clase, tiempo, encargado, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Horario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error actualizando horario:", err);
    res.status(500).json({ error: "Error actualizando horario" });
  }
});

// Endpoint para eliminar un horario por ID
app.delete("/horarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM horarios WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Horario no encontrado" });
    }
    res.json({ message: "Horario eliminado correctamente" });
  } catch (err) {
    console.error("Error eliminando horario:", err);
    res.status(500).json({ error: "Error eliminando horario" });
  }
});

// Endpoint para obtener todas las imágenes
app.get("/imagenes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM imagenes");
    res.json(result.rows);
  } catch (err) {
    console.error("Error obteniendo imágenes:", err);
    res.status(500).json({ error: "Error obteniendo imágenes" });
  }
});

// Endpoint para obtener una imagen por ID
app.get("/imagenes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM imagenes WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error obteniendo imagen por ID:", err);
    res.status(500).json({ error: "Error obteniendo imagen por ID" });
  }
});

// Endpoint para crear una nueva imagen
app.post("/imagenes", async (req, res) => {
  const { url } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO imagenes (url) VALUES ($1) RETURNING *",
      [url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creando imagen:", err);
    res.status(500).json({ error: "Error creando imagen" });
  }
});

// Endpoint para actualizar una imagen por ID
app.put("/imagenes/:id", async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  try {
    const result = await db.query(
      "UPDATE imagenes SET url = $1 WHERE id = $2 RETURNING *",
      [url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error actualizando imagen:", err);
    res.status(500).json({ error: "Error actualizando imagen" });
  }
});

// Endpoint para eliminar una imagen por ID
app.delete("/imagenes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM imagenes WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    res.json({ message: "Imagen eliminada correctamente" });
  } catch (err) {
    console.error("Error eliminando imagen:", err);
    res.status(500).json({ error: "Error eliminando imagen" });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
