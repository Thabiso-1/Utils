import {React, useState} from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

 //submit state
 
 
//onchange states
const Upload = () => {
    const [csvData, setCsvData] = useState([]);
    const [ file, setFile ] = useState (null);
    const [ progress, setProgress ] = useState ({ started: false, pc: 0});
    const [ msg, setMsg ] = useState (null);

   

    function handleUpload () {
        
        if (!file) {
            setMsg ("No file selected");
            return;
        }

    const fd = new FormData();
    fd.append('file', file);

    setMsg ("Uploading...");
    setProgress(prevState => {
        return{...prevState, started: true}
    })
    axios.post( 'link', fd, {
        onUploadProgress: (progressEvent) => { setProgress(prevState => {
            return{ ...prevState, pc: progressEvent.progress*100}
        })},
        headers: {
            "Custom-Header" : "value"
        }
    })
    .then(res =>{ 
        setMsg ("Upload Successful");
        console.log(res.data);
        })

    .catch(err => {
        setMsg ("Upload Failed");
        console.error(err)
    });
    }
    return (
        <div>
        <Outlet />
        <h2>the upload button</h2>

        <input onChange={ (e) => { setFile(e.target.files [0]) } } type="file" />

        <button onClick={ handleUpload }>Upload</button>

        { progress.started && <progress max="100" value={progress.pc}></progress> }
        { msg && <span>{msg}</span> }
        

        </div>
      
    );


};

  
 export default Upload
 ;