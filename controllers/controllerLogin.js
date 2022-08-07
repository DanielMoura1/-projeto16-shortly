import db from './../database.js'
import joi from "joi";
import { nanoid } from 'nanoid'
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
export  async function cadastro(req, res){
    const conta = req.body;
    console.log(conta)
    const cadastroSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')
      });
   
      const validar = cadastroSchema.validate(conta)
      if(validar.error){
        return res.status(422).send('deu ruim -_-');
      }
     
        const email= await db.query(`SELECT email FROM
         usuario WHERE email =$1`,[conta.email])
         if(email.rows.length !=0){
          return res.status(409).send('e-mail já existe')
         }
         try{
        const senha= bcrypt.hashSync(conta.password,10)
        const token =uuid()
        await db.query(`INSERT INTO usuario(name,email,password,token)
        VALUES ($1, $2,$3,$4)
        `,[conta.name,conta.email,senha,token])
        console.log('1')
        const resultado = await db.query(`SELECT * FROM
         usuario WHERE token =$1`,[token])
         console.log('2')
        await db.query(`INSERT INTO "seuUrl"("usuarioId",total)
        VALUES ($1, $2)
        `,[Number(resultado.rows[0].id),0])
        console.log('3')
      res.status(201).send(token);
      }catch(e){
        console.log('erro cadastro')
        return res.status(409).send('Algum campo vazio ou e-mail inválido ')
    }

}
export  async function login(req, res){
    const conta = req.body;
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
      });
   
      const validar = loginSchema.validate(conta)
      if(validar.error){
        return res.status(422).send('deu ruim -_-');
      }
      try{
        const resultado = await db.query(`SELECT * FROM usuario WHERE email =$1`,[conta.email])
        console.log(resultado.rows[0].email)
        const senha= bcrypt.compareSync(conta.password, resultado.rows[0].password)
        if(!senha){
          console.log('senha invalida')
          return res.status(401).send('voce nao existe')
        }
        const token =uuid()
        console.log('1')
        await db.query(`UPDATE usuario SET token=$1 WHERE email=$2`,[token,conta.email])
        console.log('2')
        res.status(200).send(token)
      }catch(e){
        console.log('erro login')
        return res.status(420).send('voce nao existe')
      }
    console.log(conta)
}
// headers: {
 //   Authorization: `Bearer ${user.token}`
//}

//const token = authorization?.replace('Bearer ', '');
//const token = authorization?.replace('Bearer', '').trim();

// return res.redirect(201,'https://www.netflix.com/br
//const teste = nanoid()
