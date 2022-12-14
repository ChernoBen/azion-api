async function handleRequest(request) {

    try{
        const boo = new URL(request.url).searchParams.get('boo')

        if(!boo && (foo !== undefined && boo === undefined)) {
            return new Response('boo is undefined',{status:200})

        }
        return new Response(`boo:${boo}`)
        
    }catch(err){
        return new Response(`${err.toString()}`,{status:200})
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})