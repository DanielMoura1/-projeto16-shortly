import db from './../database.js'
import joi from "joi";
import { nanoid } from 'nanoid'
import bcrypt from "bcrypt";

export  async function url(req, res){
    const conta = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token){
        return res.status(401).send('Token não existe.');
    }
    const url = nanoid()
    const urlres ={shortUrl : url}
      try{
        const resultado = await db.query(`SELECT * FROM usuario WHERE token =$1`,[token])
        console.log(resultado.rows)
        const resultado2 = await db.query(`SELECT * FROM "seuUrl" WHERE "usuarioId" =$1`,[resultado.rows[0].id])
        console.log(conta.url)
        await db.query(`INSERT INTO urls("shortUrl",url,"usuarioId",visualizacao,"seuUrlId")
        VALUES ($1, $2,$3,$4,$5)
        `,[url,conta.url,Number(resultado.rows[0].id),0,Number(resultado2.rows[0].id)])
        console.log('2')


      res.status(201).send(urlres)
      }catch(e){
        console.log('erro cadastro')
        return res.status(409).send('já tem esse e-mail')
    }

}
export  async function urlid(req, res){
    const id =req.params.id
    if(!id){
        return res.status(401).send('você não existe.');
    }
    try{
        const resultado = await db.query(`SELECT id,"shortUrl",url FROM urls WHERE id =$1`,[Number(id)])
        res.status(201).send(resultado.rows[0])
    }catch(e){
        console.log('erro cadastro')
        return res.status(409).send('já tem esse e-mail')
    }
    
}
export  async function urlOpen(req, res){
    const shortUrl =req.params.shortUrl
    if(!shortUrl){
        return res.status(401).send('você não existe.');
    }
    try{
        
        const resultado = await db.query(`SELECT * FROM
         urls WHERE "shortUrl" =$1`,[shortUrl])
        if(!resultado){
            return res.status(401).send('você não existe.');
        }
        console.log('1')
        console.log(resultado.rows)
        console.log('2')
        const num =Number(resultado.rows[0].visualizacao)+1
        console.log('3')
        await db.query(`UPDATE urls SET visualizacao=$1 WHERE id=$2`,[num,resultado.rows[0].id])
        console.log('4')
        const resultado3 = await db.query(`SELECT * FROM
         "seuUrl" WHERE "usuarioId" =$1`,[resultado.rows[0].usuarioId])
        

         const resultado2 = await db.query(`SELECT * FROM
         urls WHERE "shortUrl" =$1`,[shortUrl])

         let cont =0
         console.log('5')
         for(let i=0;resultado.rows.length>i;i++){
            cont = cont+Number(resultado.rows[i].visualizacao)
        }
        await db.query(`UPDATE "seuUrl" SET total=$1 WHERE "usuarioId"=$2`,[cont,resultado.rows[0].usuarioId])
         console.log('6')
         console.log(cont)
        return res.redirect(resultado.rows[0].url)
    }catch(e){
        console.log('erro cadastro')
        return res.status(409).send('já tem esse e-mail')
    }
    
}
export  async function deletar(req, res){
    const id =req.params.id
    console.log(id)
    if(!id){
        return res.status(401).send('id não existe.');
    }
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    console.log(token)
    try{
        const resultado = await db.query(`SELECT id
        FROM usuario WHERE token =$1`,[token])
        const resultado2 = await db.query(`SELECT id
        FROM urls WHERE "usuarioId" =$1`,[resultado.rows[0].id])
        if(id != resultado2.rows[0].id){
            return res.status(401).send('você não existe.');
        }
       await db.query(`DELETE FROM urls WHERE id = $1;`,[id])
       res.sendStatus(204)
    }catch(e){
        console.log('erro cadastro')
        return res.status(409).send('url não encontrada')
    }

}
export  async function urlme(req, res){
  
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    console.log('1')
    try{
        const usuario = await db.query(`SELECT *
        FROM usuario WHERE token =$1`,[token])
        console.log('2')

        const urls = await db.query(`SELECT
         urls.id,urls."shortUrl",urls.url,urls.visualizacao AS "visitCount"
        FROM urls WHERE "usuarioId" =$1`,[usuario.rows[0].id])
        console.log('3')
 
        const corpo = await db.query(`SELECT usuario.id,usuario.name,"seuUrl".total FROM usuario 
        JOIN "seuUrl" 
        ON usuario.id="seuUrl"."usuarioId"
      `)
      console.log('4')
   
      const resposta=[
        {
            "id": corpo.rows[0].id,
              "name": corpo.rows[0].name,
              "visitCount": corpo.rows[0].total,
              "shortenedUrls": urls.rows
              
          }
      ]
      res.status(200).send(resposta)

    }catch(e){
        console.log('erro cadastro')
        return res.status(409).send('url não encontrada')
    }

}
export  async function urlrank(req, res){
    //try{
    const a =await db.query(`SELECT usuario.id,usuario.name,"seuUrl".total 
    FROM usuario 
    JOIN "seuUrl" 
    ON usuario.id="seuUrl"."usuarioId" 
 `)
    console.log(a.rows)
    let b =a.rows
   
  
   
  for(let i=0;b.length>i;i++){
 
    const c = await db.query(`SELECT usuario.id,COUNT(urls."usuarioId") AS "Link"
    FROM usuario 
    JOIN urls 
    ON usuario.id=urls."usuarioId" 
    WHERE usuario.id=$1
    GROUP BY usuario.id`, [b[i].id])
    console.log(c.rows)
    if(c.rows.length ==0){
      
        c.rows.push({Link:'0'})
       
    }
    console.log( {id:b[i].id,name:b[i].name,total:b[i].total, link:c.rows[0].Link})
    console.log('oi')
    b[i] ={id:b[i].id,name:b[i].name,linksCount:c.rows[0].Link,visitCount:b[i].total}
  
  }
  b.sort(function(x,y){
    return y.visitCount - x.visitCount;

    })
    const resposta =[]
    for(let i=0; i<10 && b.length>i;i++){
        resposta.push(b[i])
    }
    
 
    try{
      res.status(200).send(resposta)

    }catch(e){
        console.log('erro cadastro')
        return res.status(409).send('url não encontrada')
    }

}
//array.sort((a,b)=> b-a)

//array.sort(function(x,y){
  //  return x.visualizacao - y.visualizacao;

//})

//const id =req.params.id

//CREATE TABLE "urls" (
//	"id" SERIAL PRIMARY KEY,
//	"shortUrl" TEXT NOT NULL,
//	"url" TEXT NOT NULL,
//	"usuarioId" integer NOT NULL REFERENCES "usuario"("id"),
//	"visualizacao" bigint NOT NULL
//);