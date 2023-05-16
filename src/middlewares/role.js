const Role = require('../models/role');
const User = require('../models/user');

module.exports = {
    role: async function (req, res, next) {
        try {
            const userId = req.userId;
            const userAdmin = await User.findOne({ _id: req.userId, role: 'admin' });
            const data = await Role.findOne({ userId });

            const roles = { POST: 'create', GET: 'read', PATCH: 'update', DELETE: 'delete' };

            const role = req.baseUrl.replace('/v1/', '') === 'admin' ? 'admin' : 'tag';
            const crud = roles[req.method];

            if (userAdmin && (!data || !data.roles[role][crud])) {
                return res.status(403).json({
                    error: true,
                    message: 'Sem autorização para acessar o conteúdo!'
                });
            }
            return next();
        } catch(error) {
            return res.status(500).json({
                error: true,
                message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
            })
        }
    }
}
