import type {NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import {ModulosModel} from '../../models/ModulosModel';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { conectaMongoDB } from '../../middlewares/conectaMongoDB';
import nc from 'next-connect';
import { politicaCORS } from '../../middlewares/politicaCORS';

const handler = nc()
    .put(async (req: any, res: NextApiResponse<RespostaPadraoMsg> | any) => {
        try{
            const {id} = req?.query;
            const modulo = await ModulosModel.findById(id);
            const { nome, descricao } = req.body;

            if(!modulo){
                return res.status(400).json({erro: 'Módulo não encontrado'});
            }


            await ModulosModel.findByIdAndUpdate({_id : modulo._id}, { $set: { nome : nome, descricao: descricao } });

            return res.status(200).json({msg: 'Módulo atualizado com sucesso!'});


        }catch(e){
            console.log(e);
            return res.status(400).json({erro: `Não foi possível atualizar o módulo` + e});
        }

    });


export default politicaCORS(validarTokenJWT(conectaMongoDB(handler)));