const list = async (credentials) => {
    try{
        let response = await fetch("/api/users/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + credentials.t
            }
        })
        return await response.json()
    }catch(err){
        console.log(err);
    }
}