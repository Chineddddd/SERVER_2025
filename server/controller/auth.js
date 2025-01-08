const prisma = require('../prisma/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    try{
        const { email,password} = req.body 

        if(!email){
            return res.status(400).json({
                message:'Invalid Email'
            })
        }
        if(!password){
            return res.status(500).json({
                success: false,
                massage:'Invalid Password'
            })
        }
        const checkUser = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        if(checkUser){
            return res.status(409).json({
                message:'Email already exits'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
       

        const userData = {
            email: email,
            password: hashPassword
        }
        console.log(userData)
        const newUser = await prisma.user.create({
            data: userData,
            select:{
                id:true,
                email:true
            }
        })
        res.json({
            massge:"Register Success"
        })
        

    }catch(err){
        console.log(err)
        res.send("Sever Error").status(500)
    }
    
}


exports.login = async(req,res)=>{
    try{
        const {email , password} = req.body
        if(!email){
            return res.status(400).json({
                massage: 'Email is required'
            })
        }
        if(!password){
            return res.status(400).json({
                massage:'Password is required'
            })
        }
        //step 1 check email in DB
        const user = await prisma.user.findUnique({
            where:{
                email:email,
            }
 
        })
        if(!user){
            return res.status(400).json({
                massage:"invalid credentials"
            })
        }
        //step 2 compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                massage:'password is not match'
            })
        }
        //step 3 create paylond 
        const paylond = {
            user:{
                id:user.id,
                email: user.email,
                role: user.role
            }
        }
        //step 4 create token
        const token = jwt.sign(paylond,'kaika',{
            expiresIn:'1d'
        })
        // console.log(token)
        res.json({
            user:paylond.user,
            token:token,
        })






        res.send("hello create login")
    }catch{
        console.log("error")
        res.json({
            massage:'Server Error'
        }).status(500)
    }

}
