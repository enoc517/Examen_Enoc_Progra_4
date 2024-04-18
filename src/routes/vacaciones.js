const express = require("express");
const vacacionesEsquemna = require("../modelos/vacaciones");
const router = express.Router();


//crear vacaciones
router.post('/vacaciones',(req,res)=>{
    const CCitas = vacacionesEsquemna(req.body);
    CCitas.save().then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})



//ver vacaciones
router.get('/vacaciones',(req,res)=>{
    vacacionesEsquemna.find().then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})


//ver vacaciones
router.get('/vacaciones/:id',(req,res)=>{
    const { id } = req.params;
    vacacionesEsquemna.findById(id).then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})


//actualizar vacaciones
router.put('/vacaciones/:id', (req, res) => {
    const { id } = req.params;
    const { fechaHora, idUsuario, descripcion, estadoCita } = req.body;
    vacacionesEsquemna.updateOne({ _id: id }, { $set: { idUsuario, fechaInicio, fechaFin, estadoVacaciones, Comentarios } })
        .then(data => res.json(data))
        .catch(error => res.json({ message: error }));
});


//eliminar vacaciones
router.delete('/vacaciones/:id',(req,res)=>{
    const { id } = req.params;
    vacacionesEsquemna.findByIdAndDelete({_id:id}).then((data)=> res.json(data)).catch((error)=>res.json({message : error}));
})

module.exports = router;