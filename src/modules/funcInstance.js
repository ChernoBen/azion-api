const axios = require('axios')
const {INSTANCE_NAME,INSTANCE_URI} = require('../env')

class FuncInstance {
    token = ''
    headers = {
        'Accept':'application/json;version=3',
        'Content-Type':'application/json',
    }
    app_id = 0
    func_id = 0
    endpoint = {
        'create':'',
        'update':'' 
    }
   name = ''

    constructor(name,token,app_id,func_id){
        this.name = name
        this.app_id = app_id
        this.token = token
        this.func_id = func_id
        this.endpoint.create = `${INSTANCE_URI}/${this.app_id}/functions_instances`
        this.headers.Authorization = `Token ${this.token}`
    }

    async create(){
        const body = {
            "name": this.name,
            "edge_function_id": this.func_id,
            "args": {"foo":"first","boo":"second"}
        }
        try{
            const response = await axios.post(
                this.endpoint.create,
                body,
                {headers:this.headers}
            )
            return response.data
        }catch(err){
            throw err
        }
    }
}

module.exports = FuncInstance