import express from 'express';
const router =express.Router();
import verify from '../verifytokens.js'
router.get('/',verify,(req,res)=>{
        res.send(req.user);
});

export default router