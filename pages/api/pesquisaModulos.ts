import type { NextApiRequest, NextApiResponse } from "next";
import { validarTokenJWT } from "../../middlewares/validarTokenJWT";
import { RespostaPadraoMsg } from "../../types/RespostaPadraMsg";
import { conectaMongoDB } from "../../middlewares/conectaMongoDB";
import { ModulosModel } from "../../models/ModulosModel";

const endpointPesquisaModulos = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any[]>) => {
    try{
        if(req.method === 'GET'){

            if(req?.query?.id){
                const moduloEncontrado = await ModulosModel.findById(req?.query?.id);
                if(!moduloEncontrado){
                    return res.status(400).json({erro: 'Módulo não encontrado'});
                }
                return res.status(200).json(moduloEncontrado);

            } else {
                const {filtro} = req.query;

                if(!filtro && filtro.length < 2){
                    return res.status(400).json({erro: 'Favor informar ao menos dois caracteres na busca'});
                }

                const modulosEncontrados = await ModulosModel
                .find({nome : {$regex : filtro, $options: 'i'}})
                .sort({nome: 1});

                return res.status(200).json(modulosEncontrados);
            }

        }
        
        return res.status(405).json({erro: 'Método informado não é válido'});
    }catch(e){
        console.log(e);
        return res.status(500).json({erro: 'Não foi possível buscar os módulos'});
    }
}

export default validarTokenJWT(conectaMongoDB(endpointPesquisaModulos));