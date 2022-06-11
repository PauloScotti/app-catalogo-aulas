import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import {AulasModel} from '../../models/AulasModel';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { conectaMongoDB } from '../../middlewares/conectaMongoDB';
import nc from 'next-connect';
import { politicaCORS } from '../../middlewares/politicaCORS';
import { ModulosModel } from '../../models/ModulosModel';

const handler = nc()
    .delete(async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any[]>) => {
        try{
            const {id} = req?.query;
            const aulas = await AulasModel.findById(id);


            if(!aulas){
                return res.status(400).json({erro: 'Aula não encontrada'});
            }

            await AulasModel.findByIdAndDelete({_id : aulas._id}, aulas);
            const moduloEncontrado = await ModulosModel.findById({_id: aulas.modulo});
            moduloEncontrado.qtdAulas--;
            await ModulosModel.findByIdAndUpdate({_id: moduloEncontrado._id}, moduloEncontrado);

            return res.status(200).json({ msg: "Aula deletada com sucesso!"});

        } catch(e){
                console.log(e);
                return res.status(500).json({erro: 'Não foi possível buscar a aula'});
        }

    });


export const config = {
    api: {
        bodyParser : false
    }
}

export default politicaCORS(validarTokenJWT(conectaMongoDB(handler)));