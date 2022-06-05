import type { NextApiRequest, NextApiResponse } from "next";
import { RespostaPadraoMsg } from "../../types/RespostaPadraMsg";
import { conectaMongoDB } from "../../middlewares/conectaMongoDB";
import { AulasModel } from "../../models/AulasModel";

const aulasEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg> | any) => {

    try{
        if(req.method === 'GET'){
            const {id} = req?.query;
                const aulasModulo = await AulasModel.find({"modulo": id}).sort({nome: 1});
                if(!aulasModulo){
                    return res.status(400).json({erro: 'Módulo não é válido'});
                }
                    console.log(id);
                return res.status(200).json(aulasModulo);

        }

        return res.status(405).json({erro: 'Método informado não é válido'});
        

    }catch(e){
        console.log(e);
    }
    
    return res.status(400).json({erro: 'Não foi possível obter os módulos'});
}

export default (conectaMongoDB(aulasEndpoint));