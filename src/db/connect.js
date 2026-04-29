import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Falta la variable d'entorn MONGODB_URI");
  }

  // strictQuery=false treu un warning de Mongoose 7+
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(uri);
    console.log("✅ Connectat a MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error connectant a MongoDB:", err.message);
    process.exit(1);
  }
}
