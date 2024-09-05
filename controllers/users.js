const User = require('../models/users');
const bcrypt = require('bcrypt');
const sendcookie = require('../utils/features');


// register
const register = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
       
        // Check if the required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }
        // Check if the user already exists or not 
        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        sendcookie( user, res, "reistered successfully",201);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message,
        });
    }
};

// login....
const login = async (req,res)=>{
  try{
    const { email, password} = req.body
    
    // check the required fields are filled or not
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }
    // check the user exist or not
    let user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }
    // comparing password...
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(409).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }
    // If login is successful, send a cookie
    sendcookie(user,res,`welcome back ${user.name}`,200)
  }catch(error){
    res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message,
    });
  }
}
// Get user 
const getUser = (req, res) => {
    const { _id: id, email, name, role } = req.user; 
    res.status(200).json({
        success: true,
        user: {  id, email,name, role }  
    });
};


// logout
const logout = (req,res)=>{
    res.status(200)
    .cookie("token","",{expires: new Date(Date.now()),
    })
    .json({
        success : true,
        user : req.user,
        message:"Loggedout successfully"
       })
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find({}).select('email _id name role');
        // Format the response to rename _id to id
        const formattedUsers = users.map(user => ({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        }));
        const totalUsers = users.length;
        res.json({
            success: true,
            Totalusers:totalUsers,
            users: formattedUsers, 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};


module.exports = {
    getAllUsers,
    register,
    getUser,
    login,
    logout
};
