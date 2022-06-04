import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import type {CadastroAulasRequisicao} from '../../types/CadastroAulasRequisicao';
import {AulasModel} from '../../models/AulasModel';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { conectaMongoDB } from '../../middlewares/conectaMongoDB';


const endpointCadastroAulas = async (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {

    if(req.method === 'POST'){
        const aulas = req.body as CadastroAulasRequisicao;

        if(!aulas.nome || aulas.nome.length < 2){
            return res.status(400).json({erro : "Nome não é válido "});
        }

        if(!aulas.modulo || aulas.modulo.length < 2){
            return res.status(400).json({erro : "Módulo não é válido "});
        }

        if(!aulas.data){
            return res.status(400).json({erro : "Data não é válida "});
        }

        const aulaComMesmoNome = await AulasModel.find({nome : aulas.nome});
        if(aulaComMesmoNome && aulaComMesmoNome.length > 0){
            return res.status(400).json({erro : "Aula já cadastrado"});
        }
        
        await AulasModel.create(aulas);
        return res.status(200).json({ msg: "Aula cadastrada com sucesso"});

    }

    return res.status(405).json({erro : "Método informado não é válido! "});
}

export default validarTokenJWT(conectaMongoDB(endpointCadastroAulas));