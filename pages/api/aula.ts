import type { NextApiRequest, NextApiResponse } from "next";
import { RespostaPadraoMsg } from "../../types/RespostaPadraMsg";
import { conectaMongoDB } from "../../middlewares/conectaMongoDB";
import { AulasModel } from "../../models/AulasModel";
import { politicaCORS } from "../../middlewares/politicaCORS";

const aulaEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg> | any) => {

    try{
        if(req.method === 'GET'){

            if(req?.query?.id){
                const aulasEncontrada = await AulasModel.findById(req?.query?.id);
                if(!aulasEncontrada){
                    return res.status(400).json({erro: 'Aula não encontrada'});
                }
                return res.status(200).json(aulasEncontrada);

            }
        }

        return res.status(405).json({erro: 'Método informado não é válido'});
        

    }catch(e){
        console.log(e);
    }
    
    return res.status(400).json({erro: 'Não foi possível obter os módulos'});
}

export default politicaCORS(conectaMongoDB(aulaEndpoint));