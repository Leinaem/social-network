const User = require("../model/User");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, password } = req.body;
    let user = await User.findOne({
        name
    });
    if (user !== null) {
        res.status(409)
        res.statusMessage = "Ce pseudo n'est pas disponible"
        res.end();

        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        user = new User({
            name,
            password: hashedPassword
        });
        await user.save();
        res.status(201).send("on add");
    } catch {
        res.status(500).send();
    }
}

module.exports = createUser;
