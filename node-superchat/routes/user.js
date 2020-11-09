const User = require("../model/User");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, password } = req.body;
    if (await User.findOne({ name })) {
        res.status(409);
        res.statusMessage = "Ce pseudo n'est pas disponible";
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
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
}

const logUser = async (req, res) => {
    const { name, password } = req.body;
    const errorConbinaison = "Identifiant ou mot de passe incorrect."
    const user = await User.findOne({ name });
    try {
        if (user === null) {
            res.status(405)
            res.statusMessage = errorConbinaison
            res.send();
        }

		if( await bcrypt.compare(password, user.password)) {
			res.send('Success');
		} else {
            res.status(405);
            res.statusMessage = errorConbinaison
            res.send();
		}
	} catch {
		res.status(500).send();
	}
}

module.exports = {
    createUser,
    logUser
};
