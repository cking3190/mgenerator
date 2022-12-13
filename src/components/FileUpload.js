import React, { useState } from "react";

export default function FileUpload(props, { children }) {
  const [files, setFiles] = useState("");
  const [invalidJSON, setInvalidJSON] = useState(false)

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    const filename = e.target.files[0].name
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      try {
        
        const jsonfileupload = JSON.parse(e.target.result)
        props.onChange({jsonData : jsonfileupload,
        fileName: filename})
        setInvalidJSON(false)
        }
        catch {
            console.log('invalid JSON')
            setInvalidJSON(true)
        }
    };
  };

  return (
    <div>
        <h1>MGenerator</h1>
        <input type="file" onChange={handleChange} />
        {invalidJSON ? (<div style={{color:'red'}}> Invalid JSON </div>) : <div> </div>}
    </div>

  );
}
