const axios = require('axios')
const {DOMAIN_NAME,DOMAIN_URI} = require('../env')

class Domain{
    token
    app_id
    headers = {
        'Accept':'application/json;version=3',
        'Content-Type':'application/json',
    }

    endpoint = {
        'create':'',
        'update':'' 
    }
    name = ''

    constructor(name,token,app_id){
        this.name = name
        this.token = token
        this.app_id = app_id
        this.endpoint.create = DOMAIN_URI
        this.headers.Authorization = `Token ${token}`
    }

    async create(){
        const body = {
            "name": this.name,
            "cname_access_only": false,
            "edge_application_id": this.app_id,
            "is_active": true
        }

        try{
            const response = await axios.post(
                this.endpoint.create,
                body,
                {
                    headers:this.headers
                }
            )
            return response.data
        }catch(err){
            throw err
        }
    }
}

module.exports = Domain