import type { NextApiRequest, NextApiResponse } from "next";
import { validarTokenJWT } from "../../middlewares/validarTokenJWT";
import { RespostaPadraoMsg } from "../../types/RespostaPadraMsg";
import { conectaMongoDB } from "../../middlewares/conectaMongoDB";
import { ModulosModel } from "../../models/ModulosModel";
import { AulasModel } from "../../models/AulasModel";

const modulosEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg> | any) => {

    try{
        if(req.method === 'GET'){
            if(!req.query?.id){
                const modulo = await ModulosModel.findById(req.query?.id);
                if(!modulo){
                    return res.status(400).json({erro: 'Módulo não é válido'});
                }

                const aulas = await AulasModel
                    .find({idModulo: modulo._id})
                    .sort({nome: 1});
                    
                    return res.status(200).json(aulas);
            }
        }

        return res.status(405).json({erro: 'Método informado não é válido'});
        

    }catch(e){
        console.log(e);
    }
    
    return res.status(400).json({erro: 'Não foi possível obter os módulos'});
}

export default validarTokenJWT(conectaMongoDB(modulosEndpoint));