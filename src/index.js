const manager = require('./services/manager')

async function  init(){
    const args = process.argv
    if(args[2] === 'create'){
        if(args[3]==='function'){
            const funcManager = new manager()
            await funcManager.createFunc(args[4],args[5])

        }else if(args[3]==='app'){
            const appManager = new manager()
            await appManager.createEdgeApp(args[4])
        }else{
            console.log('Inavlid use of create method')
        }

    }else if(args[2]=== 'assign_func_to'){
        const signManager = new manager()
        await signManager.assignFuncTo(args[3],args[4],args[5])

    }else if(args[2]=== 'set_domain'){
        const domainManager = new manager()
        await domainManager.set_domain(args[3],args[4],args[5])

    }else{
        console.log('Invalid argument')
    }
      
}

init()