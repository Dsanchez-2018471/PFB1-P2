import Categoria from '../categorias/categoria.model.js';
import { response, json } from 'express';



export const categoriaPost = async (req, res) =>{
    const { nameCat, descripcion } = req.body;
    const categoria = new Categoria({nameCat, descripcion});

    await categoria.save();
    res.status(200).json({
        msg: 'Se agrego correctamente la categoria',
        categoria
    });
}

export const categoriaGet = async (req, res = response ) => {
    try{
        const { limite, desde } = req.query;
        const query = { estado: true};
    
        const [total, categoria] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);
    
        res.status(200).json({
            total,
            categoria
        });
    }catch(e){
        console.log(e);
        res.status(500).json({msg:'Error del servidor interno'})
    }
} 

export const categoriaPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto} = req.body;
 
    await Categoria.findByIdAndUpdate(id, resto);

    const cat = await Categoria.findOne({_id: id});
    
    res.status(200).json({
        msg: 'Categoria actualizada exitosamente',
        cat
    })


}

export const categoriaDelete = async (req, res) => {
    const {id} = req.params;
    await Categoria.findByIdAndUpdate(id,{estado: false});

    const categoria = await Categoria.findOne({_id: id});

    res.status(200).json({
        msg: 'Categoria eliminada exitosamente',
        categoria
    });
}
