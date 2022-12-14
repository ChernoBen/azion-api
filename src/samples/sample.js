async function handleRequest(request) {

    try{
        const foo = new URL(request.url).searchParams.get('foo')
        const boo = new URL(request.url).searchParams.get('boo')

        if(!boo && (foo !== undefined && boo === undefined)) {
            return new Response(`foo -> ${foo}`,{status:200})

        }else if( !foo && (boo !== undefined && foo === undefined)){
           return new Response(`boo -> ${boo}`,{status:200}) 

        }

        return new Response(`foo:${foo} | boo:${boo}`)
        
    }catch(err){
        return new Response(`${err.toString()}`,{status:200})
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})