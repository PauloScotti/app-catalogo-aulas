import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import {AulasModel} from '../../models/AulasModel';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { conectaMongoDB } from '../../middlewares/conectaMongoDB';
import { ModulosModel } from '../../models/ModulosModel';
import { politicaCORS } from '../../middlewares/politicaCORS';


const handler = nc()
    .post(async (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {

        const {id} = req.query;
        
        const moduloEncontrado = await ModulosModel.findById(id);
        if(!moduloEncontrado){
            return res.status(400).json({erro : 'Módulo não encontrado'});
        }

        if(!req.body.nome || req.body.nome.length < 2){
            return res.status(400).json({erro : "Nome não é válido "});
        }

        if(!req.body.data){
            return res.status(400).json({erro : "Data não é válida "});
        }

        const aulaComMesmoNome = await AulasModel.find({nome : req.body.nome});
        if(aulaComMesmoNome && aulaComMesmoNome.length > 0){
            return res.status(400).json({erro : "Aula já cadastrado"});
        }

        const aulas = {
            nome : req.body.nome,
            modulo : moduloEncontrado._id,
            data: req.body.data
        }
        
        moduloEncontrado.qtdAulas++;
        await ModulosModel.findByIdAndUpdate({_id : moduloEncontrado._id}, moduloEncontrado);
        await AulasModel.create(aulas);
        return res.status(200).json({ msg: "Aula cadastrada com sucesso"});

    })
    .delete(async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any[]>) => {
        try{
            const {id} = req?.query;
            const aulas = await AulasModel.findById(id);

            if(!aulas){
                return res.status(400).json({erro: 'Aula não encontrada'});
            }

            moduloEncontrado.qtdAulas--;
            await ModulosModel.findByIdAndUpdate({_id : moduloEncontrado._id}, moduloEncontrado);
            await AulasModel.findByIdAndDelete({_id : aulas._id}, aulas);

            return res.status(200).json({ msg: "Aulas deletada com sucesso!"});

        } catch(e){
                console.log(e);
                return res.status(500).json({erro: 'Não foi possível buscar as aulas'});
        }

    });


export const config = {
    api: {
        bodyParser : false
    }
}

export default politicaCORS(validarTokenJWT(conectaMongoDB(handler)));
