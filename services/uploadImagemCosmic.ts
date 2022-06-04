import multer from "multer";
import cosmicjs from 'cosmicjs';

const {CHAVE_GRAVACAO_FOTOS_USUARIOS, BUCKET_FOTOS_USUARIOS} = process.env;

const Cosmic = cosmicjs();

const bucketFotosUsuarios = Cosmic.bucket({
    slug: BUCKET_FOTOS_USUARIOS,
    write_key: CHAVE_GRAVACAO_FOTOS_USUARIOS
});

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const uploadImagemCosmic = async(req: any) => {
    if(req?.file?.originalname){
        const media_object = {
            originalname: req.file.originalname,
            buffer: req.file.buffer
        };

        return await bucketFotosUsuarios.addMedia({media: media_object});
    }
}

export {upload, uploadImagemCosmic};