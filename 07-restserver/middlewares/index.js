

const validateFields = require('../middlewares/validate-fields');
const validateJWT    = require('../middlewares/validateJWT');
const validateRole   = require('../middlewares/validateRole');
const validateFile   = require('../middlewares/validateFile')

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRole,
    ...validateFields
}