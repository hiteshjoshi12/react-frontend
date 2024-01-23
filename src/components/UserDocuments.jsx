import React, { useState, useEffect } from "react";

const UserDocuments = ({ userId, setDocumentContent }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserDocuments = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/user-documents/${userId}`
          );
          const data = await response.json();
          setDocuments(data);
          console.log("Fetched Documents:", data);
        } catch (error) {
          console.error("Error fetching user documents:", error);
        }
      };

      fetchUserDocuments();
    }
  }, [userId]);

  const fetchDocumentDetails = async (documentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/document-details/${documentId}`
      );
      const detailedDocument = await response.json();
      return detailedDocument;
    } catch (error) {
      console.error("Error fetching document details:", error);
      return null;
    }
  };

  const handleDocumentClick = async (document) => {
    setSelectedDocument(document);

    const detailedDocument = await fetchDocumentDetails(document._id);

    if (detailedDocument) {
      setSelectedDocument({ ...document, content: detailedDocument.content });
      setDocumentContent(detailedDocument.content);
    }
  };

  const handleDelete = async (documentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/delete-document/${documentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Document deleted successfully");
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc._id !== documentId)
        );

        if (selectedDocument && selectedDocument._id === documentId) {
          setDocumentContent("");
          setSelectedDocument(null);
        }
      } else {
        console.error("Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl py-4">User Documents</h2>
      <ul className="w-full max-w-md">
        {documents.map((document) => (
          <li key={document._id} className="mb-4">
            <button
              onClick={() => handleDocumentClick(document)}
              className="bg-[#b254ff] text-white py-2 px-4 rounded-lg mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-20 hover:bg-[#7A3AAD]"
            >
              {document.title}
            </button>
            <button
              onClick={() => handleDelete(document._id)}
              className="bg-[#b254ff] text-white py-2 px-4 rounded-lg hover:bg-[#7A3AAD]"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDocuments;
