import { User } from "../models/user.model.js"

const registeredUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "all field are important!" });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "user already exists!" });
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({ 
            message: "User registered", 
            user: { id: user._id, email: user.email, username: user.name } 
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
        
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // if (typeof email !== "string" || 
        //     typeof password !== "string" ||
        //     !email.trim() ||
        //     !password
        // ) {
        //     return res.status(400).json({ message: "email and password are required" })
        // }
        
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });
        
        if (!user) return res.status(400).json({
            message: "User not found", 
        })

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({
             message: "invalid credentials"
        });

        res.status(200).json({
            message: "User logged in",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error"})
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        })

        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json({ message: "logout successful"})

    } catch (error) {
        res.status(500).json({ message: "Internal server", error})
    }
}

export {
    registeredUser,
    loginUser,
    logoutUser,
}