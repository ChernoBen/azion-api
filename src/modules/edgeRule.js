const axios = require('axios')
const {RULE_URI,RULE_NAME} = require('../env')

//:edge_application_id:/rules_engine/:phase:/rules
class EdgeRule {
    token=''
    phase=''
    app_id=0
    instance_id=0
    headers = {
        'Accept':'application/json;version=3',
        'Content-Type':'application/json',
    }
    name = ''
    endpoint = {
        'create':'',
        'update':'' 
    }

    constructor(name,token,app_id,instance_id,phase){
        this.name = name
        this.token = token
        this.app_id = app_id
        this.phase = phase
        this.instance_id = instance_id
        this.headers.Authorization = `Token ${this.token}`
        this.endpoint.create = `${RULE_URI}/${this.app_id}/rules_engine/${this.phase}/rules`
    }

    async create(){
        const body = {
            'criteria':[ 
                [                
                    {
                        'conditional':'if',
                        'variable':'${uri}',
                        'operator':'starts_with',
                        'input_value':'/'
                    }
                ]

            ],
            'behaviors':[
                {
                    'name':'run_function',
                    'target':this.instance_id
                }
            ],
            'name':this.name
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
    
    async getDefaultRule(){
        try{
            const response = await axios.get(
                this.endpoint.create,
                {
                    headers:this.headers
                }
            )
            return response.data.results[0].id
        }catch(err){
            throw err
        }
    }

    async update(){
        const default_rule_id = await this.getDefaultRule()
        this.endpoint.update = `${RULE_URI}/${this.app_id}/rules_engine/${this.phase}/rules/${default_rule_id}`
        const body = {

			"behaviors": [
				{
					"name": "run_function",
					"target": this.instance_id
				}
			]
		}
        try{
            const response = await axios.patch(
                this.endpoint.update,
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

module.exports = EdgeRule