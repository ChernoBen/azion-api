const {EDGE_APP_NAME,EDGE_APP_URI} = require('../env')
const axios = require('axios')

class EdgeApp {
    app_name = EDGE_APP_NAME
    app_id = 0
    token = ''
    headers = {
        'Accept':'application/json;version=3',
        'Content-Type':'application/json',
    }
    endpoint = {
        'create':EDGE_APP_URI
    }

    constructor(name,token){
        this.token = token
        this.headers.Authorization = `Token ${token}`
        this.endpoint.update = `${EDGE_APP_URI}/${this.app_id}`
        this.app_name = name
    }

    async create(){
        const body = {
            "name": this.app_name,
            "delivery_protocol": "http,https",
            "http_port": 80,
            "https_port": 443,
            "active": true,
        }
        try{
            const response = await axios.post(
                this.endpoint.create,
                body,
                {
                    headers:this.headers
                }
                )
            this.app_id = response.data.results.id
            return response.data
        }catch(err){
            throw err
        }
    }

    async update(app_id){
        this.endpoint.update = `${EDGE_APP_URI}/${app_id}`
        const body = {
            "edge_functions": true,

        }
        try{
            const response = await axios.patch(
                this.endpoint.update,
                body,
                {headers:this.headers}
                )
            return response.data
        }catch(err){
            throw err
        }
    }
}

module.exports = EdgeApp