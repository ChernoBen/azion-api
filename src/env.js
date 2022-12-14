require('dotenv').config()

module.exports = {
    AUTH_URI:process.env.AUTH_URI,
    AZION_USER:process.env.AZION_USER,
    FUNC_URI:process.env.FUNC_URI,
    FUNC_PATH:process.env.FUNC_PATH,
    FUNC_NAME:process.env.FUNC_NAME,
    EDGE_APP_NAME:process.env.EDGE_APP_NAME,
    EDGE_APP_URI:process.env.EDGE_APP_URI,
    INSTANCE_NAME:process.env.INSTANCE_NAME,
    INSTANCE_URI:process.env.INSTANCE_URI,
    RULE_URI:process.env.RULE_URI,
    RULE_NAME:process.env.RULE_NAME,
    DOMAIN_URI:process.env.DOMAIN_URI,
    DOMAIN_NAME:process.env.DOMAIN_NAME
}