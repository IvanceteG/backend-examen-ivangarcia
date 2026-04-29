import mongoose from "mongoose";

const bacallaSchema = new mongoose.Schema(
  {
    // id numèric propi (a més del _id automàtic de Mongo)
    // Així mantenim el contracte de l'API original (rutes /api/bacalla/:id amb id numèric).
    id: { type: Number, required: true, unique: true, index: true },
    nom: { type: String, required: true, trim: true },
    descripcio: { type: String, required: true, trim: true },
    origen: { type: String, required: true, trim: true },
    // Camps opcionals: les dades inicials porten temporada/textura,
    // i el POST original accepta "tipus". Acceptem tots tres.
    tipus: { type: String, trim: true },
    temporada: { type: String, trim: true },
    textura: { type: String, trim: true },
  },
  {
    // Convertim el document a JSON amagant _id i __v perquè la resposta
    // tingui exactament la mateixa forma que abans (només "id", "nom", etc.)
    toJSON: {
      virtuals: false,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
    timestamps: false,
  }
);

const Bacalla = mongoose.model("Bacalla", bacallaSchema);

export default Bacalla;
