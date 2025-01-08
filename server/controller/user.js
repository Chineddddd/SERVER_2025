const { decode } = require('jsonwebtoken')
const prisma = require('../prisma/prisma')
exports.list = async(req,res)=>{
    try{
        console.log('req.user',req.user)
        const user = await prisma.user.findMany({})
        res.json(user)
    }catch(err){
        console.log("list error")
        res.status(500).json({
            massage:'Server Error'
        })
    }
}

exports.update = async(req,res)=>{
    try{
        const {userId} = req.params
        const {email} = req.body
        const update = await prisma.user.update({
            where:{
                id:Number(userId)
            },
            data:{
                email:email
            }
        })
        
        res.json({
            massage:"Updated Success!!"
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            massage:'Server error'
        })

    }
}
exports.remove = async(req,res)=>{
    try{
        const {userId} = req.params
        const remove = await prisma.user.delete({
            where:{
                id: Number(userId),
            }
        })
        res.status(200).json({
            massage:"Deleted success"
        })
    }catch(err){
        console.log("Remove error")
        res.status(500).json({
            massage:"Server Error"
        })
    }
}