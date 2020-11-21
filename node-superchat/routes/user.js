const User = require("../model/User");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { userName, password } = req.body;
    if (await User.findOne({ userName })) {
        return res.status(409).json({ error: "Cet identifiant n'est pas disponible" });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        user = new User({
            userName,
            password: hashedPassword
        });
        await user.save();

        return res.status(201).json({ success: `Bienvenue ${userName}, entre ton mot de passe.`});
    }
}

const logUser = async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user || (user && !await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Identifiant ou mot de passe incorrect." });
    }  else {
        return res.json({userName});
    }
}

const getUser = async (req, res) => {
    const { userName } = req.body;
    const user = await User.findOne({ userName });
    try {
        res.send(JSON.stringify({
            userName: user.userName,
            admin: user.admin,
            createdAt: user.createdAt,
            toto: user.password
        }));
        // res.send(user);
    } catch {
        res.status(500).send();
    }


}

module.exports = {
    createUser,
    logUser,
    getUser
};
