const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const bd = require('../config/database');
const { JsonWebTokenError } = require('jsonwebtoken');

user.post("/login", async (req, res, next)=>{
    const {emp_correo, emp_contrasenia, emp_acc} = req.body;
    const query = `SELECT * FROM empleados WHERE emp_correo LIKE '${emp_correo}' AND emp_acc = ${emp_acc} AND emp_contrasenia LIKE '${emp_contrasenia}';`;
    const rows = await bd.query(query);
    if(emp_correo && emp_contrasenia){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else{
            return res.status(200).json({code: 401, message: "Usuario y/o constraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});
module.exports = user;