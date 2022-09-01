import  express  from "express";
import { getEmployees } from "./dashboardController.js";
import { getInternees } from "./dashboardController.js";
import { getPresentEmp } from "./dashboardController.js";


const dashboardRouter = express.Router()

dashboardRouter.get('/employees',getEmployees)

dashboardRouter.get('/internees',getInternees)

dashboardRouter.get('/presents', getPresentEmp)

export default dashboardRouter;