//
//  API Proxy hosted on GCP with Deno
//  ( sensitive portions redacted )
//
//  This is the intermediate interface between the social media app and
//  the GPT2 Hugging Face instance.
//
//  Author: Quinn Booth
//

import { toText } from "https://deno.land/std@0.208.0/streams/to_text.ts";

async function handler(req) {

  const fetchURL = `REDACTED`;
  
  const api_headers = {
    "Authorization": "Bearer REDACTED",
    "Content-Type": "application/json"
  };

  const response_headers = {
    "Access-Control-Allow-Origin": 'REDACTED' ,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }; 

  let autofill = null;
  if (req.body) {
    const txt = await toText(req.body);
    const start = txt.indexOf('"inputs":"') + '"inputs":"'.length;
    const end = txt.indexOf('"', start);
    autofill = txt.substring(start, end);
  }

  if (autofill) {

    const autofill_body = {
      inputs: autofill
    };

    const response = await fetch(
      fetchURL,
      {
        headers: api_headers,
        method: "POST",
        body: JSON.stringify(autofill_body),
      }
    );
    const result = await response.json();

    return new Response(JSON.stringify(result), {
      headers: response_headers,
    });

  } else {

    return new Response(JSON.stringify("MISSING BODY"), {
      headers: response_headers,
    });

  }

};

Deno.serve((req: Request) => {
  return handler(req);
});
