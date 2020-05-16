import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';

export class App{
    app = express();
    

    constructor(controllers){
        console.log("constructor");
        this.InitializeMiddlware();
        this.InitializeControllers(controllers);


    }

    private InitializeMiddlware(){
        console.log("InitializeMiddlware");
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    private InitializeControllers(controllers){
        console.log("InitializeControllers");

        controllers.forEach(controller => {
            this.app.use('/', controller.router);
            
        });
        
        
    }

    

}

// const app = new App();
// app.app.listen(3000);