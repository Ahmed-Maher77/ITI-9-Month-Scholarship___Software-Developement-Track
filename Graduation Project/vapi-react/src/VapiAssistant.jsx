import Vapi from "@vapi-ai/web";
import { useState, useEffect } from "react";

export const vapi = new Vapi("391d6751-8319-4a1c-848b-43301ed64570"); // your public API key

function VapiAssistant() {
  const [callStatus, setCallStatus] = useState("inactive");

  const start = async () => {
    setCallStatus("loading");
    const response = await vapi.start("54f54804-178e-4cc7-b863-010afdcacb6a"); // your assistant ID
    console.log("Start response:", response);
  };

  const stop = () => {
    setCallStatus("loading");
    vapi.stop();
  };

  useEffect(() => {
    vapi.on("call-start", () => {
      setCallStatus("active");
      console.log("Call started");
    });

    vapi.on("call-end", () => {
      setCallStatus("inactive");
      console.log("Call ended");
    });

    // 🔥 Listen for live messages from the assistant
    vapi.on("message", (message) => {
      console.log("Vapi message event:", message);

      // Example: log transcript text if it's a transcript message
      if (message.type === "transcript") {
        console.log(`${message.role} said:`, message.transcript);
      }
    });

    return () => vapi.removeAllListeners();
  }, []);

  return (
    <div>
      {callStatus === "inactive" && <button onClick={start}>Start</button>}
      {callStatus === "loading" && <i>Loading...</i>}
      {callStatus === "active" && <button onClick={stop}>Stop</button>}
    </div>
  );
}

export default VapiAssistant;
