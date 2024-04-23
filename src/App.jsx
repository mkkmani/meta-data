import React, { useState } from "react";
import "./App.css";

function App() {
  const [htmlCode, setHtmlCode] = useState("");
  const [url, setUrl] = useState("");
  const [dataArray, setArray] = useState([]);

  const checkHtmlContent = () => {
    if (htmlCode) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlCode;
      const metaTitle = tempDiv.querySelector("title").innerText.trim();
      const metaDescription = tempDiv
        .querySelector('meta[name="description"]')
        .content.trim();
      const h1Tag = tempDiv.querySelector("h1").innerText.trim();
      setArray([...dataArray, { url, metaTitle, metaDescription, h1Tag }]);
    }else{
      setArray([...dataArray, { url, metaTitle:"", metaDescription:"", h1Tag:"" }]);
    }
    setHtmlCode("");
    setUrl("");
  };

  const downloadAsCSV = () => {
    const headers = ["Url", "Meta Title", "Meta Description", "H1 Tags"];
    const csvContent = [
      headers,
      ...dataArray.map((item) => [
        item.url,
        item.metaTitle,
        item.metaDescription,
        item.h1Tag,
      ]),
    ];
    const csvRows = csvContent.map((row) => row.join(","));
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="parent">
      <div className="container">
        <label htmlFor="url">Url: </label>
        <input
          style={{ borderRadius: "4px", padding: "4px" }}
          placeholder="Url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="button" onClick={checkHtmlContent}>
            Check Content
          </button>
          <button onClick={downloadAsCSV}>Download CSV</button>
        </div>
        {dataArray.map((item, index) => (
          <div className="results-container" key={index}>
            <h2>Results:</h2>
            <div>
              <p>
                <strong>Url:</strong>
                {item.url}
              </p>
              <p>
                <strong>Meta Title:</strong> {item.metaTitle}
              </p>
              <br />
              <br />
              <p>
                <strong>Meta Description:</strong> {item.metaDescription}
              </p>
              <br />
              <br />
              <p>
                <strong>H1 Tag:</strong> {item.h1Tag}
              </p>
              <br />
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
