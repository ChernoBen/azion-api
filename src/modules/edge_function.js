const fs = require('fs')
const axios = require('axios')
const uglify = require('uglify-js')
const auth = require('./auth')
const {FUNC_URI,FUNC_NAME} = require('../env')

class EdgeFunction{
    functionPath = ''
    func_name=''
    code = ''
    filename=''
    headers = {
        'Accept':'application/json;version=3',
        'Content-Type':'application/json',
    }
    endpoint = {
        'create':FUNC_URI
    }

    constructor(name,functionPath,token){
        this.name = name
        this.functionPath = functionPath
        this.headers.Authorization = 'Token '+token.toString().replace(' ','')
    }

    async createFunction(){

        this.code = fs.readFileSync(this.functionPath)
        //this.code = uglify.minify({'file1.js':this.code.toString('utf8')})
        //this.code = this.code.code.replace('"',"'").replace('"',"'")
        const body = {
            "name": this.name,
            "code": this.code.toString('utf8'),
            "language": "javascript",
            "json_args": {"foo": "first","boo":"second"},
            "active": true
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

module.exports = EdgeFunction