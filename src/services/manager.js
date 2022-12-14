const auth = require('../modules/auth')
const edge_app = require('../modules/edge_app')
const edge_function = require('../modules/edge_function')
const edge_instace = require('../modules/funcInstance')
const edge_rules = require('../modules/edgeRule')
const edge_domain = require('../modules/domain')


class Manager{
    func_id = 0
    edge_id = 0
    update = 0
    instance_id = 0
    rule_id = 0
    domain_id = 0
    token=''

    constructor(){}

    async getToken(){
        return await auth.getToken()
    }

    async createFunc(name,path){
        const token = await this.getToken()
        const azFunc = new edge_function(name,path,token)
        const func_id = (await azFunc.createFunction().catch(err=>{console.log('<----')})).results.id
        console.log(`function id: ${func_id} | function name: ${name}`)
        return func_id
    }

    async createEdgeApp(name){
        this.token = await this.getToken()
        const edgeApp = new edge_app(name,this.token)
        this.edge_id = (await edgeApp.create()).results.id
        const update = await edgeApp.update(this.edge_id).catch(err=>{console.log(err,'update app<----')})
        console.log(
            `app_id: ${this.edge_id} | app_name: ${name}`
        )
    }

    async assignFuncTo(name,func_id,app_id){
        const token = await this.getToken()
            // crete instance
        const edgeInstance = new edge_instace(name,token,app_id,func_id)
        const instance_id = (await edgeInstance.create()).results.id
        console.log(`instance_id: ${instance_id} | Instance_name: ${name}`)
        return instance_id
    }

    async set_domain(name,app_id,instance_id){
        const token = await this.getToken()

        //create rules
        const edgeRules = new edge_rules(
            name,token,app_id,instance_id,'request'
        )
        const rule_id = (await edgeRules.create()).results.id
        await edgeRules.update()

        //create domain
        const domain = new edge_domain(name,token,app_id)
        const domain_id = (await domain.create()).results.id
        console.log(
            `
             rule_id: ${rule_id} |
             rule_name: ${name}
             domain_id: ${domain_id}
             domain_name: ${name}
            `
        )

    }
}

module.exports = Manager