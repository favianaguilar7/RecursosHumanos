const express = require('express');
const logic = express.Router();
const bd = require('../config/database');

logic.post("/signin", async (req, res, next)=>{
    const {emp_name, emp_apellidos, emp_telefono, emp_correo, emp_direccion, emp_acc, emp_contrasenia}= req.body;

    if(emp_name && emp_apellidos && emp_telefono && emp_correo && emp_direccion && emp_acc){
        let query =`INSERT INTO empleados( emp_name, emp_apellidos, emp_telefono, emp_correo, emp_direccion, emp_acc) `;
        query += `VALUES ('${emp_name}','${emp_apellidos}','${emp_telefono}','${emp_correo}','${emp_direccion}','${emp_acc}')`;
        if(emp_acc == 1 && emp_contrasenia.length > 5){
            query =`INSERT INTO empleados( emp_name, emp_apellidos, emp_telefono, emp_correo, emp_direccion, emp_acc, emp_contrasenia) `;
            query += `VALUES ('${emp_name}','${emp_apellidos}','${emp_telefono}','${emp_correo}','${emp_direccion}',${emp_acc},'${emp_contrasenia}');`;
        }
        console.log(query);
        const rows = await bd.query(query);
        return rows.affectedRows == 1 ? res.status(200).json({code:201, message: "Usuario registrado correctamente"}) : res.status(401).json({code:401, message: "Ocurrio un problema"});
    }
    return res.status(500).json({code:500, message: "Campos incompletos"});
})
logic.get("/", async (req, res, next) =>{
    const query ="SELECT * FROM empleados";
    const rows = await bd.query(query);
    return res.status(201).json({code: 201, message: rows});
});
logic.post("/:name", async (req, res, next) => {
    const name = req.params.name;
    const campo = req.body.campo;
    const rows = await bd.query(`SELECT * FROM empleados WHERE ${req.body.campo} = "${name}" ;`);
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});
logic.put("/:id([0-9]{1,3})", async (req, res, next)=>{
    const {emp_id, emp_name, emp_apellidos, emp_telefono, emp_correo, emp_direccion, emp_acc, emp_contrasenia}= req.body;
    if(emp_id && emp_name && emp_apellidos && emp_telefono && emp_correo && emp_direccion && emp_acc){
        let query = `UPDATE empleados SET emp_name='${emp_name}', emp_apellidos='${emp_apellidos}', `;
            query += `emp_telefono='${emp_telefono}', emp_correo='${emp_correo}', emp_direccion='${emp_direccion}', emp_acc=0, emp_contrasenia=NULL WHERE emp_id = ${emp_id}`;
        if(emp_acc == 1 && emp_contrasenia){
            query = `UPDATE empleados SET emp_name='${emp_name}', emp_apellidos='${emp_apellidos}', `;
            query += `emp_telefono='${emp_telefono}', emp_correo='${emp_correo}', emp_direccion='${emp_direccion}', emp_acc=1, emp_contrasenia='${emp_contrasenia}' WHERE emp_id = ${emp_id}`;
            console.log("asd");
        }
        const rows = await bd.query(query);
        return rows.affectedRows == 1? res.status(200).json({code:200, message: "Empleado actualizado correctamente"}) :res.status(404).json({code: 404, message: "Ocurrio un problema"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"})
});
logic.delete("/:id([0-9]{1,3})",async (req, res, next)=>{
    const query = `DELETE FROM empleados WHERE emp_id=${req.body.emp_id}`;
    const rows = await bd.query(query);
    return rows.affectedRows == 1 ? res.status(200).json({code: 200, message: "Empleado borrado correctamente"}) : res.status(404).json({code: 404, message: "Empleado no encontrado"});
});
module.exports = logic;