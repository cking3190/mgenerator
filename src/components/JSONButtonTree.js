import React from 'react';

// Recursively turns JSON keys and values into button components
function JsonButtonizera(props) {
  const { json, onClick } = props;

  if (typeof json === 'object') {
    // If the current value is an object, recursively buttonize its keys and values
    return (
      <div>
        {Object.keys(json).map(key => (
          <div key={key}>
            <button onClick={() => onClick(key)}>{key}</button>
            <JsonButtonizera json={json[key]} onClick={onClick} />
          </div>
        ))}
      </div>
    );
  } else {
    // For non-object values, return a button for the value
    return <button onClick={() => onClick(json)}>{json}</button>;
  }
}

export default function JsonButtonizer(props) {
  const { json, onClick } = props;

  return <JsonButtonizer json={json} onClick={onClick} />;
}