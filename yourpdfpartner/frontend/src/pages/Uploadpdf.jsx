import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/upload.scss";
import CircleCard from "../components/CircleCard";

export default function MediaUploadForm() {
  const [media, setMedia] = useState(null);

  // const [pdfData, setPdfData] = useState([])

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    // Capture the first selected file
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!media) return alert("Please select a file first!");

    // Create a FormData object to hold the media payload
    const formData = new FormData();
    formData.append("file", media);

    try{
      const response = await fetch("http://localhost:3000/api/pdf/upload")

      if(response.ok){
        alert("Media uploaded successfully");
        navigate("/quiz");
      }
    }catch(err){
      console.log("Error:",err);
      
    }



    // try {
    //   const response = await fetch('https://yourbackend.com', {
    //     method: 'POST',
    //     body: formData,
    //     // Do NOT set "Content-Type": "multipart/form-data" manually,
    //     // the browser will automatically assign it with the boundary.
    //   });

    //   if (response.ok) {
    //     alert('Media uploaded successfully!');
    //   }
    // } catch (error) {
    //   console.error('Upload failed:', error);
    // }
  };

  return (
    <>
    <h1>Hello welcome to Your <span>Pdf Partner</span>.</h1>
    <p className="pdf-desc">where handling documents becomes effortless and stress-free. Whether it’s parsing, organizing, or managing your files, we make PDFs feel less like a chore and more like a trusted companion. Think of us as your go-to partner for turning complexity into clarity.</p>
    <div className="form-container">
       <form onSubmit={handleSubmit}>
      <label id="media">
        Upload Your File
        <input
          hidden
          type="file"
          name="pdf"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
      </label>
      <button type="submit">Upload</button>
    </form>
    <CircleCard />
    </div>
   
    </>
  );
}
