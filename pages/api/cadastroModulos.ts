import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraMsg';
import type {CadastroModulosRequisicao} from '../../types/CadastroModulosRequisicao';
import {ModulosModel} from '../../models/ModulosModel';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { conectaMongoDB } from '../../middlewares/conectaMongoDB';
import nc from 'next-connect';

const handler = nc()
    .post(async (
        req: NextApiRequest,
        res: NextApiResponse<RespostaPadraoMsg>
    ) => {

            const modulos = req.body as CadastroModulosRequisicao;

            if(!modulos.nome || modulos.nome.length < 2){
                return res.status(400).json({erro : "Nome não é válido"});
            }

            if(!modulos.descricao || modulos.descricao.length < 5){
                return res.status(400).json({erro : "Descrição não é válida"});
            }

            const moduloComMesmoNome = await ModulosModel.find({nome : modulos.nome});
            if(moduloComMesmoNome && moduloComMesmoNome.length > 0){
                return res.status(400).json({erro : "Módulo já cadastrado"});
            }
            
            await ModulosModel.create(modulos);
            return res.status(200).json({ msg: "Módulo cadastrado com sucesso"});


    });

export default validarTokenJWT(conectaMongoDB(handler));