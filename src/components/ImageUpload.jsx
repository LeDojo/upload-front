import axios from "axios";
import React from "react";
import { useState } from "react";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setimageUrl] = useState(null)

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await axios.post(
        "http://localhost:3456/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Image uploaded:", response.data.imageUrl);
      setimageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error ulpoading image:", error);
    }
  };
  return (
    <div>
      <input type="file" name="image" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} />}
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default ImageUpload;
