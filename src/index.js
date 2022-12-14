const {FUNC_PATH} = require('./env')
const auth = require('./modules/auth')
const edge_app = require('./modules/edge_app')
const edge_function = require('./modules/edge_function')
const edge_instace = require('./modules/funcInstance')
const edge_rules = require('./modules/edgeRule')
const edge_domain = require('./modules/domain')

//1670971285
//7565
async function main(){
    var func_id = 0
    var edge_id = 0
    var update = 0
    var instance_id = 0
    var rule_id = 0
    var domain_id = 0

    //auth
    const token = await auth.getToken()

    //create func
    const azFunc = new edge_function(FUNC_PATH,token)
    func_id = (await azFunc.createFunction().catch(err=>{console.log('<----')})).results.id

    //create app
    const edgeApp = new edge_app(token)
    edge_id = (await edgeApp.create()).results.id
    update = await edgeApp.update(edge_id).catch(err=>{console.log(err,'update app<----')})
    
    // crete instance
    const edgeInstance = new edge_instace(token,edge_id,func_id)
    instance_id = (await edgeInstance.create()).results.id

    //create rules
    const edgeRules = new edge_rules(
        token,edge_id,instance_id,'request'
    )
    rule_id = (await edgeRules.create()).results.id
    await edgeRules.update()

    //create domain
    const domain = new edge_domain(token,edge_id)
    domain_id = (await domain.create()).results.id


    console.log({token,func_id,edge_id,instance_id,rule_id,domain_id})

}
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
            `rule_id: ${rule_id} |
             rule_name: ${name}
             domain_id: ${domain_id}
             domain_name: ${name}
            `
        )

    }
}

async function  init(){
    const args = process.argv
    console.log(process.argv)
    console.log('benja...')
    if(args[2] === 'create'){
        if(args[3]==='function'){
            const funcManager = new Manager()
            await funcManager.createFunc(args[4],args[5])

        }else if(args[3]==='app'){
            const appManager = new Manager()
            await appManager.createEdgeApp(args[4])
        }else{
            console.log('Inavlid use of create method')
        }

    }else if(args[2]=== 'assign_func_to'){
        const signManager = new Manager()
        await signManager.assignFuncTo(args[3],args[4],args[5])

    }else if(args[2]=== 'set_domain'){
        const domainManager = new Manager()
        await domainManager.set_domain(args[3],args[4],args[5])

    }else{
        console.log('Invalid argument')
    }
      
}

//main()
init()