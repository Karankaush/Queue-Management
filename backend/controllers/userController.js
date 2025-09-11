const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')



const registerUser = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const userExists  = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : "USer alredy exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role,
        })

        res.status(201).json({message : "User registered successfully",
            user : {
                id : user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async(req, res) =>{
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message : "Invalid credentials"})

        const token = jwt.sign({id : user._id, email : user.email}, process.env.JWT_SECRET);
         res.cookie("token", token, {
        httpOnly: true,  // JS se access nahi hoga
        secure: true,    // sirf HTTPS pe
        sameSite: "strict" // CSRF protection
            });

        res.status(200).json({message: "Login successful", token, role: user.role,});

    } catch(error){
        res.status(500).json({message : error.message})
    }
} 


const updateUser = async(req, res) =>{
    try{
        const { id } = req.params
         const updates = req.body;

        if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(id, updates, {new:true})
        return res.status(200).json({message : "user update successfully",
            user :{
                name : user.name,
                email : user.email,
                password : user.password
            }
        })
       

    } catch(error){
        res.status(500).json({message : error.message})
    }
} 




const deleteUser = async(req, res) =>{
    try{
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({message : "User not found"})
        }      
        res.status(200).json({message: "User deleted successfully"});

    } catch(error){
        res.status(500).json({message : error.message})
    }
} 

const logoutUser = async(req, res) =>{
    res.clearCookie('token', {
        httpOnly : true,
        secure : false,
        sameSite : 'strict'
    })

    res.status(200).json({ message: "Logged out successfully ✅" });
}




module.exports = {registerUser, loginUser, updateUser, deleteUser, logoutUser}