import React from 'react'
import App from './css/addstudent.css';
const Upload = () => {
    return (
        <div>



            <div className="upload w-50  mx-auto p-5" id="fileUploadDiv">
                <label style={{cursor:'pointer'}}  htmlFor="fileInput" className="form-control text-center border-0 mt-3">
                    <i className="bi bi-upload me-2"></i>
                    Upload Additional Files
                </label>
                <input type="file" id="fileInput" className="form-control" style={{ display: 'none' }}  multiple />
            </div>
            <p className=' textupload w-50 mx-auto mt-2 '>Attach files. The total size of your documents should not exceed 100MB</p>

        </div>
    )
}

export default Upload