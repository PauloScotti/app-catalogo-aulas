import mongoose, {Schema} from "mongoose";

const ModulosSchema = new Schema({
    nome: {type: String, required: true},
    descricao: {type: String, required: true},
    qtdAulas : {type : Number, default : 0},
});

export const ModulosModel = (mongoose.models.modulos || 
    mongoose.model('modulos', ModulosSchema));