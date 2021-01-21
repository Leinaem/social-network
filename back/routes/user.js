const User = require("../model/User");
const UserConnection = require("../model/UserConnection");
const bcrypt = require('bcrypt');
const md5 = require('MD5');


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
        userConnection = new UserConnection({
            userName,
            userId: user.id
        });
        await userConnection.save();

        return res.json({id: user.id});
    }
}

const getUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const photo = {
        type: user.photo ? "photo" : "avatar",
        src: user.photo
        ?`/uploads/images/profile/${user.photo}`
        : 'https://gravatar.com/avatar/'+ md5(user.userName) +'?s=30&d=identicon'
    }

    return res.json({
        user : {
            id: user._id,
            userName: user.userName,
            admin: user.admin,
            createdAt: user.createdAt,
            photo
        }
    });
}

const { upload } = require('./../config/upload');

const updateUser = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: "Une erreur est survenue..." });
        } else {
            const user = await User.findOne({ _id: `${req.body.userId}` });
            user.photo = req.file && req.file.filename ? req.file.filename : null
            await user.save()

            return res.send();
        }
    });
}

module.exports = {
    createUser,
    updateUser,
    logUser,
    getUser
};
