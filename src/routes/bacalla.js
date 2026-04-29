import { Router } from "express";
import Bacalla from "../models/Bacalla.js";

const router = Router();

// GET /api/bacalla — totes les varietats, ordenades per id ascendent
router.get("/", async (req, res) => {
  try {
    const varietats = await Bacalla.find().sort({ id: 1 });
    res.json(varietats);
  } catch (err) {
    res.status(500).json({ error: "Error obtenint les varietats" });
  }
});

// GET /api/bacalla/:id — detall per id numèric
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "L'id ha de ser un número" });
  }

  try {
    const varietat = await Bacalla.findOne({ id });
    if (!varietat) {
      return res.status(404).json({ error: `No s'ha trobat cap varietat amb id ${id}` });
    }
    res.json(varietat);
  } catch (err) {
    res.status(500).json({ error: "Error obtenint la varietat" });
  }
});

// POST /api/bacalla — crear una nova varietat
router.post("/", async (req, res) => {
  const { nom, origen, tipus, descripcio } = req.body;

  if (!nom || !origen || !tipus || !descripcio) {
    return res.status(400).json({
      error: "Els camps nom, origen, tipus i descripcio són obligatoris",
    });
  }

  try {
    // Genera el següent id agafant el màxim actual + 1
    const ultim = await Bacalla.findOne().sort({ id: -1 }).select("id");
    const nouId = (ultim?.id || 0) + 1;

    const novaVarietat = await Bacalla.create({
      id: nouId,
      nom,
      origen,
      tipus,
      descripcio,
    });

    res.status(201).json(novaVarietat);
  } catch (err) {
    res.status(500).json({ error: "Error creant la varietat" });
  }
});

export default router;
