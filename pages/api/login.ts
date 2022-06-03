import type {NextApiRequest, NextApiResponse} from 'next';
import {conectaMongoDB} from '../../middlewares/conectaMongoDB';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';

// eslint-disable-next-line import/no-anonymous-default-export
const endpointLogin = (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {
    if(req.method === 'POST'){
        const { login, senha } = req.body;

        if( login === 'Admin@adm.com' && senha === 'Adm@123') {
            return res.status(200).json({msg : "Usuário autenticado com sucesso! "});
        }

        return res.status(400).json({erro : "Usuário ou senha inválidos! "});
    }


    return res.status(405).json({erro : "Método informado não é válido!"});
}

export default conectaMongoDB(endpointLogin);