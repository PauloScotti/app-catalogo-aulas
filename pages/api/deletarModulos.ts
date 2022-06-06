import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import {ModulosModel} from '../../models/ModulosModel';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { conectaMongoDB } from '../../middlewares/conectaMongoDB';
import nc from 'next-connect';
import { politicaCORS } from '../../middlewares/politicaCORS';

const handler = nc()
    .delete(async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any[]>) => {
        try{
            const {id} = req?.query;
            const modulo = await ModulosModel.findById(id);

            if(!modulo){
                return res.status(400).json({erro: 'Módulo não encontrado'});
            }

            await ModulosModel.findByIdAndDelete({_id : modulo._id}, modulo);

            return res.status(200).json({ msg: "Módulo deletado com sucesso!"});

        } catch(e){
                console.log(e);
                return res.status(500).json({erro: 'Não foi possível buscar os módulos'});
        }

    });


export const config = {
    api: {
        bodyParser : false
    }
}

export default politicaCORS(validarTokenJWT(conectaMongoDB(handler)));