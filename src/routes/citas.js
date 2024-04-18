const express = require("express");
const { protegerRuta } = require('../middlewares/autorizacion');
const citasEsquemna = require("../modelos/citas");
const router = express.Router();


//crear citas
router.post('/citas',protegerRuta,(req,res)=>{
    const CCitas = citasEsquemna(req.body);
    CCitas.save().then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})



//ver citas
router.get('/citas',protegerRuta,(req,res)=>{
    citasEsquemna.find().then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})


//ver citas
router.get('/citas/:id',protegerRuta,(req,res)=>{
    const { id } = req.params;
    citasEsquemna.findById(id).then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})


//actualizar citas
router.put('/citas/:id', protegerRuta,(req, res) => {
    const { id } = req.params;
    const { fechaHora, idUsuario, descripcion, estadoCita } = req.body;
    citasEsquemna.updateOne({ _id: id }, { $set: { fechaHora, idUsuario, descripcion, estadoCita } })
        .then(data => res.json(data))
        .catch(error => res.json({ message: error }));
});


//eliminar citas
router.delete('/citas/:id',protegerRuta,(req,res)=>{
    const { id } = req.params;
    citasEsquemna.findByIdAndDelete({_id:id}).then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})

module.exports = router;