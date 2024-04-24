import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [dataArray, setArray] = useState([]);
  const [isChecked, setChecked] = useState(false);
  // const isChecked = false

  const extractData = (htmlCode) => {
    if (htmlCode) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlCode;
      const metaTitle = tempDiv.querySelector("title").innerText.trim();
      const metaDescription = tempDiv
        .querySelector('meta[name="description"]')
        .content.trim();
      const h1Tag = tempDiv.querySelector("h1").innerText.trim();
      setArray([...dataArray, { url, metaTitle, metaDescription, h1Tag }]);
    } else {
      setArray([
        ...dataArray,
        { url, metaTitle: "", metaDescription: "", h1Tag: "" },
      ]);
    }
    setUrl("");
  };

  const api = "https://metaserver-bp9j.onrender.com";

  const checkHtmlContent = async () => {
    if (!isChecked) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      };

      try {
        const response = await fetch(`${api}/proxy`, options);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return extractData(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const emptyArray = {
      url,
      metaTitle: "",
      metaDescription: "",
      h1Tag: "",
    };

    setArray([...dataArray, emptyArray]);
    setUrl('')
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
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}
        >
          <label htmlFor="url">Url: </label>
          <input
            placeholder="Url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div style={{ marginBottom: "8px" }}>
          <input
            id="checkbox"
            onChange={(e)=>setChecked(e.target.checked)}
            type="checkbox"
          />
          <label htmlFor="checkbox">Is Redirecting</label>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="button" onClick={checkHtmlContent} disabled={url===''}>
            Check Content
          </button>
          <button onClick={downloadAsCSV}>Download CSV</button>
        </div>
        <div>
          <h4>{`Count: ${dataArray.length}`}</h4>
        </div>
        {dataArray.map((item, index) => (
          <div
            className="results-container"
            style={{ border: "1px solid gray",borderRadius:'10px',padding:'8px' }}
            key={index}
          >
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
              <p>
                <strong>Meta Description:</strong> {item.metaDescription}
              </p>
              <br />
              <p>
                <strong>H1 Tag:</strong> {item.h1Tag}
              </p>
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
