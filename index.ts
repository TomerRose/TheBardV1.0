import {createConnection, Connection} from "typeorm";
import {App} from "./app";
import { UserController } from "./controllers/user.controller";

createConnection().then(connection => {
    const app = new App([
        new UserController()
    ]);





    app.app.listen(3000);
}).catch(err => console.log(err))