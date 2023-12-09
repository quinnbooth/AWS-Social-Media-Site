import React, { useState } from 'react';
import "./SettingsPage.css";

function SettingsPage() {

  const [text, setText] = useState('');
  const [waiting, setWaiting] = useState(false);

  const handleText = (event) => {
    if (!waiting) {
      setText(event.target.value);
    }
  };

  const handleClear = () => {
    if (!waiting) {
      setText('');
    }
  };

  async function autofill() {
    if (text != '' && !waiting) {

      console.log("Waiting for GPT2 response...");

      try {

        setText('Please wait for your completed message...');
        setWaiting(true);

        let response = await fetch(`https://loom-proxy.deno.dev/`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: text
          })
        });

        const response_data = await response.json();
        console.log(response_data);

        setText(response_data[0].generated_text);
        setWaiting(false);

      } catch {

        setText('GPT2 not responding, please try again later :)');
        setWaiting(false);

      }
    }
  };
  
  return (
    <div className='autofillDiv'>
      <p>Post AUTOFILL with GPT2</p>
      <textarea 
        type="text"
        value={text}
        onChange={handleText}
        placeholder="Start typing your post and AUTOFILL to complete!"
      />
      <div>
        <button onClick={autofill}>Autofill</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );

}

export default SettingsPage;
