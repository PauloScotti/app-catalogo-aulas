import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import type {CadastroRequisicao} from '../../types/CadastroRequisicao';
import {UsuarioModel} from '../../models/UsuarioModel';


const endpointCadastro = async (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>
) => {

    if(req.method === 'POST'){
        const usuario = req.body as CadastroRequisicao;

        if(!usuario.nome || usuario.nome.length < 2){
            return res.status(400).json({erro : "Nome não é válido "});
        }

        if(!usuario.email || usuario.email.length < 5
            || !usuario.email.includes('@')
            || !usuario.email.includes('.')){
            return res.status(400).json({erro : 'Email invalido'});
        }
        
        if(!usuario.senha || usuario.senha.length < 4){
            return res.status(400).json({erro : "Senha não é válido "});
        }

        if(!usuario.nivelAcesso || usuario.nivelAcesso.length < 5) {
            return res.status(400).json({erro: "Nível de acesso não é válido"});
        }

        const bcrypt = require('bcryptjs');

        const salt = bcrypt.genSaltSync(10);

        const usuarioASerSalvo = {
            nome : usuario.nome,
            email : usuario.email,
            senha : bcrypt.hashSync(usuario.senha, salt),
            nivelAcesso : usuario.nivelAcesso
        }
        
        await UsuarioModel.create(usuarioASerSalvo);
        return res.status(200).json({ msg: "Usuário cadastrado com sucesso"});

    }

    return res.status(405).json({erro : "Método informado não é válido! "});
}

export default endpointCadastro;