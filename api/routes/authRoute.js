const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verify = require("../verifyToken");

const HASHING_SECRET = '9e42e429fe34d87a78eab640e6ffd83445f50300738f0';

// Register

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hashedPassword });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err) {
        console.log(err);
    }
});

// Login

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        try {
            const isValid = bcrypt.compareSync(req.body.password, user.password);
            !isValid && res.status(401).json("Wrong Credentials!");
            const accessToken = jwt.sign(
            {
                id: user._id,
            },
                HASHING_SECRET,
                { expiresIn: "1d" }
            );
            res.status(200).json(accessToken);
        }catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(404).json("User not found!");
    }
});

// Get User

router.get("/user", verify, async (req, res) => {
    const user = await User.findById(req.user.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
});


module.exports = router;
