import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express"

export class App{
    app = express();

    constructor(){
        console.log("constructor");
        this.InitializeMiddlware();
        this.InitializeRoutes();
    }

    InitializeMiddlware(){
        console.log("InitializeMiddlware");
        this.app.use(bodyParser.json())
    }

    InitializeRoutes(){
        console.log("InitializeRoutes");
        this.app.get("/butthead", (req:Request, res:Response)=>{
            return res.send('fu fu fu');
        });
    }

}

const app = new App();
app.app.listen(3000);