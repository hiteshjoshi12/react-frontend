import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const EditorPage = ({ userId, documentContent, setDocumentContent }) => {
  const [text, setText] = useState(documentContent);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    newSocket.emit("join", userId);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    socket.emit("text-update", newText);
  };

  useEffect(() => {
    if (socket) {
      socket.on("text-update", (data) => {
        setText(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    setText(documentContent);
  }, [documentContent]);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/save-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title: "Document Title",
          content: text,
        }),
      });

      if (response.ok) {
        alert("Document saved successfully");
        setDocumentContent(text);
      } else {
        console.error("Failed to save document");
      }
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className="shadow mx-auto p-3 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h2 className="text-4xl text-center mb-3">EDITOR</h2>
      <textarea
        className="border-2 border-black rounded-lg w-full mx-auto"
        value={text}
        onChange={handleTextChange}
        rows={10}
      />
      <br />
      <button
        onClick={handleSave}
        className="my-4 mx-auto bg-[#b254ff] text-white py-3 px-6 rounded-lg hover:bg-[#7A3AAD]"
      >
        Save
      </button>
    </div>
  );
};

export default EditorPage;
