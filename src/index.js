const auth = require('./auth')

async function main(){
    console.log(await auth.getToken())
    console.log("....");
}

main()