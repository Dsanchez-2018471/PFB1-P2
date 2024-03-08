import Post from '../post/post.js';
import userHasComment from '../user/userHasComment.js';

export const postPublicacion = async (req, res) => {
    try {
        const { titulo, categoria, descripcion } =  req.body;
        const post = new Post({
            titulo,
            categoria,
            descripcion,
            user: req.usuario._id
        });
        await post.save();
        res.status(201).json
        ({msg:'Se subio la publicacion',
        post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Comuniquece con el Administrador"
        });
    }
};
//Traer todas las publicaciones
export const putPublicacion = async (req, res) => {
    try {
        const { createAt } = req.params;
        const { titulo, categoria, descripcion } = req.body;

        const post = await Post.findOne({ createAt });
        if(!post){
            return res.status(400).json({
                msg: 'No se encontro la Publicación'
            });
        }
        if (post.user.toString() !== req.usuario._.toString()) {
            return res.status(403).json({
                msg: 'Usuario no autorizado para actualizar la publicacion',
            });
        }
        //Asignar los nuevos valores
        post.titulo = titulo;
        post.categoria = categoria;
        post.descripcion = descripcion;
        await post.save();

        res.status(200).json({
            msg: 'La Publicación fue Actualizada Correctamente',
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrio un Error al Intentar Actualizar la Publicación',
        });
    }
};
//Agregar una publicación
export const addComment = async (req, res) => {
    try {
        const { userId } = req.params;
        const { postId, titulo, descripcion } = req.body;

        const nuevoComentario = new userHasComment({
            user: userId,
            post: postId,
            titulo: titulo,
            descripcion: descripcion,
        });

        //Devuelve el comentario creado con su id y usuario asociado
        await nuevoComentario.save(); 

        res.status(200).json({
            msg: 'Su comentario fue enviado',
            comentario: nuevoComentario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador',
        });
    }
};

export const getAllPostWithComments = async (req, res) => {
    try {
        const posts = await Post.find();
        //Recorre cada uno de los posts para agregarle las imagenes

        //Intera el post con la clase por medio del campo asociados


        res.status(200).json({
            msg: 'Posts encontrados con sus comentarios',
            posts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener los posts comunicarse con el Administrador'
        });
    }
};