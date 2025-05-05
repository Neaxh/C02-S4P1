import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import expressEjsLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layout');

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', superHeroRoutes);

app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/api/home`);
});
