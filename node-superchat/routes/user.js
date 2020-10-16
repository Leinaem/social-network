const User = require("../model/User");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, password } = req.body;
    let user = await User.findOne({
        name
    });
    if (user !== null) {
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
        res.status(201).send("on add");
    } catch {
        res.status(500).send();
    }
}

// module.exports = createUser;

const logUser = async (req, res) => {
	const { name, password } = req.body;
    let user = await User.findOne({
        name
    });
	if (user === null) {
		return res.status(405).send("Combinaison login/mot de passe incorrect 1");
	}
	try {
		if( await bcrypt.compare(password, user.password)) {
			res.send('Success');
		} else {
            res.status(405);
            res.statusMessage = "Combinaison login/mot de passe incorrect 2";
            res.send();
		}
	} catch {
		res.status(500).send('catched');
	}
}

module.exports = {
    createUser,
    logUser
};
