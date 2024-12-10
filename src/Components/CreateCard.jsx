import React, { useState } from "react";
import axios from "axios";
import './CreateCard.css';

function CreateCard() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userDescription, setUserDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("No file selected.");

  const GROQ_API_KEY = "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";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setImage(null);
    setPreview(null);
    setCaption("");
    setFileName("No file selected.");
    // Clear the file input
    const fileInput = document.querySelector('.FileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSave = () => {
    if (!image || !caption.trim()) {
      alert("Please provide both an image and a caption.");
      return;
    }
    alert("Post saved!");
  };

  const handleDescribePhoto = () => {
    setShowModal(true);
  };

  const handleModalSave = async () => {
    if (!userDescription.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: "You are a creative caption writer. Generate an engaging caption based on the photo description provided."
            },
            {
              role: "user",
              content: `Create a caption for this photo: ${userDescription}`
            }
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedCaption = response.data.choices[0].message.content;
      setCaption(generatedCaption);
      setShowModal(false);
      setUserDescription("");
    } catch (error) {
      console.error("Error generating caption:", error);
      alert("Failed to generate caption. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-card-wrapper">
      <div className="Container">
        <div className="Header">
          <h1>Create Post</h1>
        </div>
        <div className="ContainerPreview">
          {preview ? (
            <img src={preview} alt="Preview" className="PreviewImage" />
          ) : (
            <p className="PlaceholderText">Image Preview</p>
          )}
        </div>
        <div className="FileInputContainer">
          <div className="FileInputWrapper">
            <button className="BrowseButton">Browse...</button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="FileInput"
            />
            <span className="SelectedFileName">{fileName}</span>
          </div>
          {preview && (
            <button onClick={handleRemoveFile} className="RemoveFileButton">
              Remove Image
            </button>
          )}
        </div>
        <textarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="InputCaption"
        />
        <button
          className="DescribeButton"
          onClick={handleDescribePhoto}
          disabled={!preview}
        >
          Describe the Photo
        </button>
        <button onClick={handleSave} className="SaveButton">
          Save
        </button>
      </div>

      {showModal && (
        <div className="PhotoDescriptionModal">
          <div className="ModalContent">
            <h2>Photo</h2>
            <textarea
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
              placeholder="Describe the photo..."
              className="DescriptionInput"
              disabled={isLoading}
            />
            <div className="ModalButtons">
              <button 
                onClick={handleModalSave} 
                className="SaveDescriptionButton"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Description"}
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="CloseButton"
                disabled={isLoading}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCard;
