import { useEffect, useState } from "react"
import {Link} from 'react-router-dom';
import axios from 'axios'
function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places/all')
    .then((response)=>{
      console.log(response.data)
      setPlaces(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[]);
  return (
    <div className="mt-8 grid gap-x-6 grid-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place=>(
        <Link to={'/place/'+place._id} key={place._id}>
          <div key={place._id}>
            <div key={place._id} className="mb-2 bg-gray-500 rounded-2xl flex w-80 h-80">
              {place.photos?.[0] && (
                <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:5000/places/uploads/${place.photos[0]}`}/>
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm truncate leading-4 text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage
