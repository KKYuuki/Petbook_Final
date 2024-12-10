import React, { useState } from "react";
import axios from "axios";
import { BsChatDots } from "react-icons/bs";
import "./ChatBox.css"; // Create this file for styling

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const GROQ_API_KEY = "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";

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // If the user input is empty, do nothing

    const newMessages = [
      ...messages,
      { sender: "user", text: userInput }, // Add user's message
    ];
    setMessages(newMessages);
    setUserInput(""); // Clear input field after sending

    try {
      // Send the user's message to the API
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192", // The correct model you're using
          messages: [
            { role: "system", content: "You are a helpful assistant." }, // System message
            ...newMessages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`, // Use the API key stored in the environment variable
            "Content-Type": "application/json",
          },
        }
      );

      // Extract bot's reply
      const botReply = response.data.choices[0].message.content;

      // Update the chat with the bot's reply
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botReply },
      ]);
    } catch (error) {
      console.error("Error communicating with API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    }
  };

  return (
    <div className="chatbox-container">
      {!isOpen && (
        <div className="chatbox-icon" onClick={handleToggle}>
          <BsChatDots size={30} />
        </div>
      )}
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <span>Customer Support</span>
            <button onClick={handleToggle}>&times;</button>
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbox-message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
