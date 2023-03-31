const createTour = async (tour, credentials) => {
    try{
        let reponse = await fetch("/api/tours", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            body: JSON.stringify(tour)
        })
        return await reponse.json();
    }catch(err){
        console.log(err)
    }
}

const listTours = async () => {
    try{
        let response = await fetch("/api/tours/", {
            method: "GET",
        })
        return await response.json()
    }catch(err){
        console.log(err);
    }
}

const listToursByCity = async (city) =>{
    try{
        let response = await fetch("/api/tours/city/" + city, {
            method: "GET",
        })
        return await response.json()
    }catch(err){
        console.log(err);
    }
}


const updateTour = async (id, credentials, tour) => {
    try {
      let response = await fetch('/api/tours/' + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + credentials.t
},
        body: JSON.stringify(tour)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const deleteTour = async (id, credentials) => {
    try {
      let response = await fetch('/api/tours/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
} })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

export { listTours, createTour, listToursByCity, updateTour, deleteTour }