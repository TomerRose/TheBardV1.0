import { Router, Request, Response } from "express";
import { getRepository, Repository, createQueryBuilder, Raw } from "typeorm";
import { User } from "../entity/user.entity";
import { ErrMissingParameter, ErrAlreadyExists } from "../classes/error.class";
import { Validation } from "../classes/validation.class";


export class UserController {
    public path: string = '/users';
    public router: Router = Router();
    private userRepository: Repository<User>

    constructor() {
        this.initializeRoutes();
        this.userRepository = getRepository(User);
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.post(this.path, this.create);
        this.router.delete(`${this.path}/:id`, this.delete);
    }


    private getAll = async (req: Request, res: Response) => {
        const result = await this.userRepository.find();
        res.send(result);
    }

    private getOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await this.userRepository.findOne(id);
        res.send(result);
    }

    private delete = async (req: Request, res: Response) => {
        const id = req.params.id;        
        const found = await this.userRepository.findOne(id);
        const result = await this.userRepository.remove(found);
        res.send(result);
    }

    private create = async (req: Request, res: Response) => {
        try {
            const newUser: User = <User>req.body;
            const validateUser = new Validation(newUser, ['email','password','userName']);
            // console.log(validateUser);
            if (!validateUser.valid) throw new ErrMissingParameter(validateUser.constraints);
            newUser.isActive = true;
            if (await this.existsByEmail(newUser.email) || await this.existsByUserName(newUser.userName)) throw new ErrAlreadyExists();            
            const create = await this.userRepository.save(newUser);
            return res.send(create)
        }catch(err){      
            if (!err.status) return res.send(err.message);
            return res.status(err.status).send(err.message);
        }     
    }

    private existsByEmail = async (email: string) : Promise<boolean> => {        
        const found = await this.userRepository.find({email: Raw(em =>`${em} ILIKE '${email}'` )});
        // console.log(found);
        // console.log(found, found.length > 0)
        return (found.length > 0);
    }

    private existsByUserName = async (userName: string) : Promise<boolean> => {        
        const found = await this.userRepository.find({userName: Raw(un =>`${un} ILIKE '${userName}'` )});
        // console.log(found);
        // console.log(found, found.length > 0)
        return (found.length > 0);
    }
    
    
}

