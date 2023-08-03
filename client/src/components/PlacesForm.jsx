import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import PhotosUploader from "./PhotosUploader";
import Perks from "../Perks";
import AccountNav from "./AccountNav";
function PlacesForm() {
    const navigate= useNavigate();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    function inputHeader(text){
      return(
          <h2 className="text-2xl mt-4">{text}</h2>
      )
    }
    function inputDescription(text){
      return(
          <p className="text-gray-500 text-sm">{text}</p>
      )
    }
    function preInput(header,description){
      return(
          <div>
              {inputHeader(header)}
              {inputDescription(description)}
          </div>
      )
    }
    function addNewPlace(ev){
        ev.preventDefault();
        const data = {title,address,addedPhotos,
            description,perks,extraInfo
            ,checkIn,checkOut,maxGuests};
        axios.post('/places',data)
        .then((response)=>{
            console.log(response.data);
            navigate("/account/places");
        })
        .catch((error)=>{
            console.log(error);
        })
      }
  return (
    <div>
        <AccountNav/>
        <form onSubmit={addNewPlace}>
            {preInput('Title','Title for your place. Should be short and catchy as in advertisement.')}
            <input className="" value={title} onChange={ev=>setTitle(ev.target.value)} type="text" placeholder="title, for example: My lovely apartement."/>
            {preInput('Address','Address to this place.')}
            <input className="" value={address} onChange={ev=>setAddress(ev.target.value)} type="text" placeholder="address"/>
            {preInput('Photos','more = better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {preInput('Description','Description of the place.')}
            <textarea  value={description} onChange={ev=>setDescription(ev.target.value)} />
            {preInput('Perks','Select all the perks of your place.')}
            <Perks selected={perks} onChange={setPerks}/>
            {preInput('Extra info','House rules, etc.')}
            <textarea  value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} />
            {preInput('Check in&out times','Add check in and out times, remeber to have some time window for cleaning the room between gustes.')}
            <div className="grid gap-2 sm:grid-cols-3">
                <div>
                    <h3 className="mt-2 -mb-1">Check in time</h3>
                    <input type="number" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}  placeholder="14:00"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check out time</h3>
                    <input type="number"  value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} placeholder="12:00"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Max number of guests</h3>
                    <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)}  placeholder="3"/>
                </div>
            </div>
                <button className="primary my-4">Save</button>
        </form>
    </div>
  )
}

export default PlacesForm
