

const validateFields = require('../middlewares/validate-fields');
const validateJWT    = require('../middlewares/validateJWT');
const validateRole   = require('../middlewares/validateRole');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRole,
}