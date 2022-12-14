const {AUTH_URI,AZION_USER} = require('../env')

const axios = require('axios')

class Auth{
    uri = AUTH_URI
    headers = {
        'Accept':'application/json;version=3',
        'Authorization':`Basic ${AZION_USER}`
    }

    async getToken(){
        try{
            const token = (await axios.post(this.uri,{},{headers:this.headers})).data.token
            return token.toString()
        }catch(error){
            throw error
        }
    } 
}

module.exports = new Auth()