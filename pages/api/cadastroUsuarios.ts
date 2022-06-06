import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import type {CadastroRequisicao} from '../../types/CadastroRequisicao';
import {UsuarioModel} from '../../models/UsuarioModel';
import { upload, uploadImagemCosmic } from '../../services/uploadImagemCosmic';
import { conectaMongoDB } from '../../middlewares/conectaMongoDB';
import nc from 'next-connect';

const handler = nc()
    .use(upload.single('file'))
    .post(async (
        req: NextApiRequest,
        res: NextApiResponse<RespostaPadraoMsg>
    ) => {
    
            const usuario = req.body as CadastroRequisicao;
    
            if(!usuario.nome || usuario.nome.length < 2){
                return res.status(400).json({erro : "Nome não é válido"});
            }
    
            if(!usuario.email || usuario.email.length < 5
                || !usuario.email.includes('@')
                || !usuario.email.includes('.')){
                return res.status(400).json({erro : 'Email invalido'});
            }
            
            if(!usuario.senha || usuario.senha.length < 4){
                return res.status(400).json({erro : "Senha não é válido"});
            }
    
            if(!usuario.nivelAcesso || usuario.nivelAcesso.length < 5) {
                return res.status(400).json({erro: "Nível de acesso não é válido"});
            }
    
            const usuariosComMesmoEmail = await UsuarioModel.find({email : usuario.email});
            if(usuariosComMesmoEmail && usuariosComMesmoEmail.length > 0){
                return res.status(400).json({erro : "E-mail já cadastrado em outra conta"});
            }

            const image = await uploadImagemCosmic(req);

            const bcrypt = require('bcryptjs');
            const salt = bcrypt.genSaltSync(10);
    
            const usuarioASerSalvo = {
                nome : usuario.nome,
                email : usuario.email,
                senha : bcrypt.hashSync(usuario.senha, salt),
                nivelAcesso : usuario.nivelAcesso,
                avatar: image?.media?.url
            }
            
            await UsuarioModel.create(usuarioASerSalvo);
            return res.status(200).json({ msg: "Usuário cadastrado com sucesso"});

    });

export const config = {
    api: {
        bodyParser : false
    }
}


export default (conectaMongoDB(handler));