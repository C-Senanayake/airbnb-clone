import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';
function PhotosUploader({addedPhotos,onChange}) {
    const [photoLink,setPhotoLink] = useState('');

    function addPhotoByLink(event){
      event.preventDefault();
      axios.post('/places/upload-by-link',{link:photoLink})
      .then((response)=>{
          console.log("Filename::",response.data);
          onChange((prev)=>{
              return [...prev, response.data]
          })
          console.log("Addedphotos"+addedPhotos)
          setPhotoLink('');
      })
      .catch((error)=>{
          console.log(error);
      })
    }

    function uploadPhoto(ev){
       const files = ev.target.files;
       const data = new FormData();
       for(let i=0;i<files.length;i++){
           data.append('photos',files[i]);
       }
       axios.post('/places/upload',data,{
          headers:{'Content-Type':'multipart/form-data'}
       })
       .then((response)=>{
          console.log(response.data);
          onChange((prev)=>{
              return [...prev, ...response.data]
          })
       })
       .catch((error)=>{
          console.log(error);
       })
    }
  return (
    <div>
      <div className="flex gap-2">
            <input type="text" value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)}  placeholder="Add using a link ..."/>
            <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;photo</button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length >0 && addedPhotos.map(link=>(
                <div className="h-40 flex" key={link}>
                    <img className="rounded-2xl w-full object-cover" src={"http://localhost:5000/places/uploads/"+link} alt=""/>
                </div>
            ))}
            <label className="h-40 cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload
            </label>
        </div>
    </div>
  )
}

// Add PropTypes validation
PhotosUploader.propTypes = {
    addedPhotos: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PhotosUploader
