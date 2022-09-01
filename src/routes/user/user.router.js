import  express  from "express";
import { login, addUser, delUser, getEmp } from "./user.controller.js";
const userRouter = express.Router()


userRouter.post('/login',  login)
userRouter.post('/add', addUser)
userRouter.delete('/delete', delUser)
userRouter.get('/employees', getEmp)

export default userRouter;


