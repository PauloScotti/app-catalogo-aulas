import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import type {CadastroAulasRequisicao} from '../../types/CadastroAulasRequisicao';
import {AulasModel} from '../../models/AulasModel';


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
        
        await AulasModel.create(aulas);
        return res.status(200).json({ msg: "Módulo cadastrado com sucesso"});

    }

    return res.status(405).json({erro : "Método informado não é válido! "});
}

export default endpointCadastroAulas;