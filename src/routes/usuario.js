const express = require("express");
const esquemna = require("../modelos/usuario");
const router = express.Router();


//crear usuario
router.post('/usuarios',(req,res)=>{
    const UUsuario = esquemna(req.body);
    UUsuario.save().then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})


//ver usuarios
router.get('/usuarios',(req,res)=>{
    esquemna.find().then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})


//ver usuario
router.get('/usuarios/:id',(req,res)=>{
    const { id } = req.params;
    esquemna.findById(id).then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})


//actualizar usuario
router.put('/usuarios/:id',(req,res)=>{
    const { id } = req.params;
    const {nombre,email,contrasena,rol,FechaRegistro} = req.body;
    esquemna.updateOne({_id:id},{$set:{nombre,email,contrasena}}).then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})

//eliminar usuario
router.delete('/usuarios/:id',(req,res)=>{
    const { id } = req.params;
    esquemna.findByIdAndDelete({_id:id}).then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})


module.exports = router;