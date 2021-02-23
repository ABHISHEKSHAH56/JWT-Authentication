import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import jwt from 'jsonwebtoken'
import { registerValidation,loginValidation } from '../validations.js'
import bcrypt from 'bcryptjs'
//validation


router.post('/r', async (req, res) => {

        //lets validate 
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //lets check email is already there 
        const emailExit = await User.findOne({ email: req.body.email });
        if (emailExit) return res.status(400).send('Email is Aleardy exist try with new email');
        //Hash the Password 
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);

        const user = req.body;
        user.password = hashpassword;
        try {
                const saveuser = new User(user);
                await saveuser.save();
                res.send({user : saveuser._id});

        } catch (error) {
                res.status(400).send(error);

        }

});

router.post('/login', async(req,res)=>{
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //checking is email is valid 
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email is not found ');
        // checking pass word is valid 
        const validpass=await bcrypt.compare(req.body.password, user.password);
        if(!validpass) return res.status(400).send('Invalid password and email');
        const token =jwt.sign({_id:user._id},process.env.TOKEN_SEC)
        res.header('auth-token',token).send(token);
})


export default router;