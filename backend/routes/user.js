const express = require("express")
const {User} = require("../db")
const {Account} = require("../db")
const zod = require("zod")
const router = express.Router();
const jwt = require("jsonwebtoken")
const jwtToken = require("../config")
const {authMiddleware} = require("../middleware")




const signupSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string(),
    password: zod.string()
})

const signinSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})

const updateSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),

})
router.post('/signup',async(req,res)=>{
    const body = req.body;
    const success = signupSchema.safeParse(body);

    if (!success){
        return res.json({message: "Email already taken / Incorrect inputs"})
    }
    
    const user = await User.findOne({email: req.body.email})

    if (user){
        return res.json({message: "Email id already registered"})
    }

    const dbuser = await User.create(body)

    
    await Account.create({
        userId: dbuser._id,
        balance: 1 + Math.random() * 10000
    })
    const token= jwt.sign({userId: dbuser._id},jwtToken)

    res.json({
        message: "User Successfully created",
        Token: token
    })

})

router.get('/userdetails',authMiddleware, async(req,res)=>{
    const user_data = await User.findOne({
        _id: req.userId
    })

    res.json({
        username: user_data.firstname
    })
})

router.post('/signin',async(req,res)=>{
    const body = req.body;
    const success = signinSchema.safeParse(body);

    if (!success){
        return res.json({message: " Incorrect inputs"})
    }
    
    const user = await User.findOne(
        {email: body.email,
            password: body.password
        
    })

    console.log(user)
    if (user._id){
        const token= jwt.sign({userId: user._id},jwtToken)
        return res.status(200).json({message: "User found, Logging in",
        Token: token})

    }

    return res.status(411).json({message: "Check Login credentials"})

})

router.put("/update",authMiddleware,async(req,res)=>{
    const body= res.body;
    const {success} = updateSchema.safeParse(body)

    if(!success){
        return res.status(411).json({message: "Check Update creadetials"})
    }

    await User.updateOne(req.body,{_id: req.userId})

    res.json({message: "Updated successfully"})
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports= router