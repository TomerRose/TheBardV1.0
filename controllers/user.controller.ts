import { Router, Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";


export class UserController{
    public path: string = '/users';
    public router: Router = Router();
    private userRepository: Repository<User>

    constructor(){
        this.initializeRoutes();
        this.userRepository = getRepository(User);
    }    

    private initializeRoutes(){
        this.router.get(this.path, this.getAll);
        this.router.get(`${this.path}/:id`, this.getOne);
        // this.router.post
    }
    

    private getAll = async(req: Request, res: Response) => {
        const result = await this.userRepository.find();
        res.send(result);
    }

    private getOne = async(req: Request, res: Response) => {
        const id = req.params.id;
        const result = await this.userRepository.findOne(id);
        res.send(result);
    }
}
