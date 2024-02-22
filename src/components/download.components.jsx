import React from 'react';

const txtFile = 'http://localhost:3000'
const Download = () => {
    const downloadFileAtURL = (url) =>{
        const fileName = url.split('/').pop();
        const aTag = document.createElement('a');
        aTag.href=url;
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    };
    return ( 
        <div className='button'>
            <button onClick={()=>{downloadFileAtURL( txtFile )}}>Download File</button>
        </div>
    );
}
 
export default Download;