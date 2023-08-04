import { useEffect ,useState} from "react";
import { useParams,useNavigate } from "react-router-dom"
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios';
function PlacePage() {
    const navigate=useNavigate();
    const {id} = useParams();
    const [place, setPlace] = useState(null);//[place,setPlace
    const [showAllPhotos, setShowAllPhotos] = useState(false);//[showAllPhotos,setShowAllPhotos
    const [checkIn, setCheckIn] = useState('');//[checkIn,setCheckIn
    const [checkOut, setCheckOut] = useState('');//[checkOut,setCheckOut
    const [guests, setGuests] = useState(1);//[guests,setGuests
    const [name, setName] = useState('');//[name,setName
    const [phoneNumber, setPhoneNumber] = useState('');//[phoneNumber,setPhoneNumber
    // if(checkIn && checkOut){
    //     setPrice(place.price * differenceInCalendarDays(new Date(checkOut),new Date(checkIn)));
    // }
    useEffect(()=>{
        if(!id){
            return;
        }else{
            axios.get('/places/getplace/'+id)
            .then((response)=>{
                console.log(response.data);
                setPlace(response.data);
            })
            .catch((error)=>{
                console.log(error.response.data);
            })
        }
    },[id])

    if(showAllPhotos){
        return(
            <div className="absolute bg-black inset-0 min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl text-center text-white">Photos of {place.title}</h2>
                        <button onClick={()=>setShowAllPhotos(false)} className="fixed top-2 left-10 p-4 rounded-2xl bg-black text-3xl text-white font-bold z-10">X</button>
                    </div>
                    {place?.photos?.length>0 && place.photos.map((photo,index)=>(
                        <div key={index} className="relative bg-black">
                            <img className="object-cover w-full" src={`http://localhost:5000/places/uploads/${photo}`}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    function bookPlace(){
        const data = {id,checkIn,checkOut,guests,name,phoneNumber,price:place.price * differenceInCalendarDays(new Date(checkOut),new Date(checkIn))}
        console.log(data);
        axios.post('/bookings/',data)
        .then((response)=>{
            console.log(response.data);
            navigate('/account/bookings');
        })
        .catch((error)=>{
            console.log(error.response.data);
        })
    }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      {place && (
        <div>
            <h1 className="text-3xl">{place.title}</h1>
            <a className="my-2 block font-semibold underline" target="_blank" href={"https://maps.google.com/?q="+place.address}>place.address</a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <img className=" object-cover aspect-square" src={`http://localhost:5000/places/uploads/${place.photos[0]}`}/>
                        )}
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && (
                            <img className=" object-cover aspect-square" src={`http://localhost:5000/places/uploads/${place.photos[1]}`}/>
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img className=" object-cover aspect-square relative top-2" src={`http://localhost:5000/places/uploads/${place.photos[2]}`}/>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={()=>setShowAllPhotos(true)} className="flex gap-1  absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl shadow shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Show more photos
                </button>
            </div>
            <div className="mt-8 mb-8 grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="text-2xl font-semibold">Description</h2>
                        {place.description}
                    </div>
                    Check-in:{place.checkIn}<br/>
                    Check-out:{place.checkOut}<br/>
                    Max number of guests:{place.maxGuests}<br/>
                </div>
                <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center">
                        Price: ${place.price} / per night
                    </div>
                    <div className="border rounded-2xl mt-12">
                        <div className="flex justify-center">
                            <div className="py-3 px-4">
                                <label>Ckeck in:</label>
                                <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}/>
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label>Ckeck out:</label>
                                <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
                            </div>
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>No of guests:</label>
                            <input type="number" value={guests} onChange={ev=>setGuests(ev.target.value)}/>
                        </div>
                        {checkIn && checkOut && (
                            <>
                                <div className="py-3 px-4 border-t">
                                    <label>Name:</label>
                                    <input type="text" value={name} placeholder="Silvester doe" onChange={ev=>setName(ev.target.value)}/>
                                </div>
                                <div className="py-3 px-4 border-t">
                                    <label>Phone number:</label>
                                    <input type="tel" value={phoneNumber} placeholder="012 3456789" onChange={ev=>setPhoneNumber(ev.target.value)}/>
                                </div>
                            </>
                        )}
                    </div>
                    <button onClick={bookPlace} className="primary mt-4">
                        Book this place
                        {checkIn && checkOut && (
                            <span> for ${place.price * differenceInCalendarDays(new Date(checkOut),new Date(checkIn))}</span>
                        )}
                    </button>
                </div>
            </div>
            <div className="bg-white -mx-8 p-8 border-t">
                <h2 className="text-2xl font-semibold">Extra Info</h2>
                <div className="mb-4 mt-1 text-sm text-gray-700 leading-4">
                    {place.extraInfo}
                </div>
            </div>
            <div>
                <h2 className="text-2xl">Perks</h2>
                <ul className="list-disc list-inside">
                    {place.perks.map((perk,index)=>(
                        <li key={index}>{perk}</li>
                    ))}
                </ul>
            </div>
        </div>
      )}
    </div>
  )
}

export default PlacePage
