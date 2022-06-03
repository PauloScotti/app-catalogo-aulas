import mongoose, {Schema} from "mongoose";

const ModulosSchema = new Schema({
    nome: {type: String, required: true},
});

export const ModulosModel = (mongoose.models.modulos || 
    mongoose.model('modulos', ModulosSchema));