module.exports.name = 'User';
module.exports.dependencies = ['Blueprint', 'exceptions', 'ObjectID'];
module.exports.factory = function (Blueprint, exceptions, ObjectID) {
    'use strict';

    var blueprint,
        User;

    blueprint = new Blueprint({
        name: 'string',
        email: 'string',
		privilege: 'string'
    });

    User = function (user) {
        var self = {};
		console.log(user)
        if (!blueprint.syncSignatureMatches(user).result) {
            exceptions.throwArgumentException('', 'user', blueprint.syncSignatureMatches(user).errors); //typo
            return;
        }

        self._id = new ObjectID(user._id);
        self.name = user.name;
        self.email = user.email;
		self.privilege = user.privilege

        return self;
    };

    User.db = {
        collection: 'users',
        indexes: [
            {
                keys: { email: 1 },
                options: { name: 'unq.users.email', unique: true, sparse: true }
            }
        ]
    };

    return User;
};
