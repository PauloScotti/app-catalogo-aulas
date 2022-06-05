import type { NextApiResponse } from "next";
import { validarTokenJWT } from "../../middlewares/validarTokenJWT";
import { RespostaPadraoMsg } from "../../types/RespostaPadraMsg";
import { conectaMongoDB } from "../../middlewares/conectaMongoDB";
import { AulasModel } from "../../models/AulasModel";
import nc from 'next-connect';

const handler = nc()
    .put(async (req: any, res: NextApiResponse<RespostaPadraoMsg> | any) => {
        try{
            const {id} = req?.query;
            const aulas = await AulasModel.findById(id);
            const { nome, data } = req.body;

            if(!aulas){
                return res.status(400).json({erro: 'Aula não encontrada'});
            }

            await AulasModel.findByIdAndUpdate({_id : aulas._id}, { $set: { nome : nome, data: data } });

            return res.status(200).json({msg: 'Aula atualizada com sucesso!'});


        }catch(e){
            console.log(e);
            return res.status(400).json({erro: `Não foi possível atualizar a aula` + e});
        }

    });


export default validarTokenJWT(conectaMongoDB(handler));