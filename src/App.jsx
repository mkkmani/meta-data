import React, { useState } from "react";
import "./App.css";

function App() {
  const [htmlCode, setHtmlCode] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [h1Tag, setH1Tag] = useState("");
  const [pTags, setPTags] = useState([]);

  const checkHtmlContent = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlCode;
    const metaTitle = tempDiv.querySelector("title").innerText.trim();
    const metaDescription = tempDiv
      .querySelector('meta[name="description"]')
      .content.trim();
    const h1Tag = tempDiv.querySelector("h1").innerText.trim();
    const pTags = Array.from(tempDiv.querySelectorAll("p")).map((p) =>
      p.innerText.trim()
    );

    setMetaTitle(metaTitle);
    setMetaDescription(metaDescription);
    setH1Tag(h1Tag);
    setPTags(pTags);
  };

  return (
    <div className="parent">
    <div className="container">
      <textarea
        className="textarea"
        rows="10"
        cols="50"
        placeholder="Paste HTML document code here"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
      ></textarea>
      <br />
      <br />
      <button className="button" onClick={checkHtmlContent}>
        Check Content
      </button>
      <div className="results-container">
        <h2>Results:</h2>
        <div>
          <strong>Meta Title:</strong> {metaTitle}
          <br />
          <br />
          <strong>Meta Description:</strong> {metaDescription}
          <br />
          <br />
          <strong>H1 Tag:</strong> {h1Tag}
          <br />
          <br />
          <strong>Paragraph Tags:</strong>
          <ul>
            {pTags.map((pTag, index) => (
              <li key={index}>{pTag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
