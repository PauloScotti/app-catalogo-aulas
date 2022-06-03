import mongoose, {Schema} from "mongoose";

const AulasSchema = new Schema({
    nome: {type: String, required: true},
    modulo: {type: String, required: true},
    data: {type: String, required: true},
});

export const AulasModel = (mongoose.models.aulas || 
    mongoose.model('aulas', AulasSchema));