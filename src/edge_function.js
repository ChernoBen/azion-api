const fs = require('fs')
const axios = require('axios')
const uglify = require('uglify-js')
const auth = require('./auth')

export class EdgeFunction{
    functionPath = ''
    headers = {
        'Accept':'application/json;version=3',
        'Content-Type':'application/json',
    }
    endpoint = {
        'create':''
    }

    constructor(functionPath,token){
        this.functionPath = functionPath
        let tk = auth.getToken().then(res=>{
            return res
        }).catch(error=>{
            throw error
        })
        this.headers.Authorization = `Token ${token}`
    }

    async createFunction(){
        fs.readFileSync(this.functionPath,async (err,data)=>{
            const body = {
                "name": "inso-f-1",
                "code": uglify.minify(data),
                "language": "javascript",
                "json_args": {"foo": "first","boo":"second"},
                "active": true
            }
            try{
                const response = await axios.post(
                        this.endpoint.create,
                        body,
                        {headers:this.headers}
                    )
                console.log(response)
            }catch(error){throw error}
        })
    } 
}