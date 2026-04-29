// Script per pujar les dades inicials a MongoDB Atlas.
// Executar amb: npm run seed
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './db/connect.js';
import Bacalla from './models/Bacalla.js';
import { bacalla as dadesInicials } from './data/bacalla.js';

async function seed() {
  await connectDB();

  console.log("🧹 Esborrant col·lecció existent...");
  await Bacalla.deleteMany({});

  console.log(`📦 Inserint ${dadesInicials.length} varietats...`);
  await Bacalla.insertMany(dadesInicials);

  const total = await Bacalla.countDocuments();
  console.log(`✅ Seed completat: ${total} varietats a la BD`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error al seed:", err);
  process.exit(1);
});
