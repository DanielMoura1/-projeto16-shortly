import { Router } from "express";
import { cadastro,login} from "../controllers/controllerLogin.js";
import {url,urlid,urlOpen,deletar,urlme,urlrank} from "../controllers/controllerLink.js" 
import {cadastroSchema} from "../scremas/cadastroScrema.js"
const LoginRouter = Router();

LoginRouter.post('/signup',cadastro )
LoginRouter.post('/signin',login)
LoginRouter.post('/urls/shorte',url)
LoginRouter.get('/urls/:id',urlid)
LoginRouter.get('/urls/open/:shortUrl',urlOpen)
LoginRouter.delete('/urls/:id',deletar)
LoginRouter.get('/users/me',urlme)
LoginRouter.get('/ranking',urlrank)
export default LoginRouter