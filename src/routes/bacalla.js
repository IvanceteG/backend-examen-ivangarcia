import { Router } from "express";
// Importa l'array de dades (fa de "base de dades" en memòria)
import { bacalla } from "../data/bacalla.js";

const router = Router();

// GET /api/bacalla — retorna totes les varietats de l'array
router.get("/", (req, res) => {
  res.json(bacalla);
});

// GET /api/bacalla/:id — retorna una varietat concreta per id
router.get("/:id", (req, res) => {
  // Converteix l'id de string a número (els params sempre arriben com a string)
  const id = parseInt(req.params.id, 10);
  const varietat = bacalla.find((b) => b.id === id);

  // Si no existeix, retorna 404 amb missatge d'error
  if (!varietat) {
    return res.status(404).json({ error: `No s'ha trobat cap varietat amb id ${id}` });
  }

  res.json(varietat);
});

// POST /api/bacalla — crea una nova varietat
router.post("/", (req, res) => {
  // Extreu els camps del cos de la petició (ve en JSON gràcies a express.json())
  const { nom, origen, tipus, descripcio } = req.body;

  // Validació: si falta algun camp, retorna 400
  if (!nom || !origen || !tipus || !descripcio) {
    return res.status(400).json({ error: "Els camps nom, origen, tipus i descripcio són obligatoris" });
  }

  // Construeix el nou objecte; l'id el genera el servidor (longitud de l'array + 1)
  const novaVarietat = {
    id: bacalla.length + 1,
    nom,
    origen,
    tipus,
    descripcio,
  };

  // Afegeix la nova varietat a l'array (persistència en memòria, es perd en reiniciar)
  bacalla.push(novaVarietat);

  // Retorna 201 (Created) amb el recurs creat
  res.status(201).json(novaVarietat);
});

export default router;
