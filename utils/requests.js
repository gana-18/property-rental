const apiDomain=process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetchProperties() {
    try {
        if(!apiDomain){
            return [];
        }
      const res=await fetch(`${apiDomain}/properties`,{cache:"no-store"})
      const data=await res.json()
      return data
    } catch (error) {
      console.log(error)
      return []
    }
  
  }

async function fetchFeatured(){
  try {
     if(!apiDomain){
            return [];
        }
    const res=await fetch(`${apiDomain}/properties/featured`,{cache:"no-store"})
    const data=await res.json()
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}  

async function fetchProperty(id){
  try {
    const res=await fetch(`${apiDomain}/properties/${id}`)
    const data=await res.json()
    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

async function fetchUserProperties(userId){
  try {
    const res = await fetch(`${apiDomain}/properties/user/${userId}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return null;
  }
}

  export {fetchProperties,fetchProperty,fetchUserProperties,fetchFeatured};