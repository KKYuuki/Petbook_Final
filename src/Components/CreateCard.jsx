import React, { useState } from "react";
import './CreateCard.css';

function CreateCard() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSave = () => {
    if (!image || !caption.trim()) {
      alert("Please provide both an image and a caption.");
      return;
    }
    alert("Post saved!");
  };

  return (
    <div className="create-card-wrapper">
      <div className="Container">
        <div className="Header">
          <p>Create Post</p>
        </div>
        <div className="ContainerCaption">
          <div className="ContainerPreview">
            {preview ? (
              <img src={preview} alt="Preview" className="PreviewImage" />
            ) : (
              <p className="PlaceholderText">Image Preview</p>
            )}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="FileInput"
        />
        {preview && (
          <button onClick={handleRemoveFile} className="RemoveFileButton">
            Remove File
          </button>
        )}
        <textarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="InputCaption"
        ></textarea>
        <div className="ButtonContainer">
          <button onClick={handleSave} className="SaveButton">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCard;
