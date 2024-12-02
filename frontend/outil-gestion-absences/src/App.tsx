// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const App: React.FC = () => {
  // const [count, setCount] = useState(0);

  // Fonction pour appeler l'API Node.js
  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/bonjour", {
        method: "GET",
      });

      if (response.ok) {
        console.log("Demande réussie");
      } else {
        console.error("Erreur lors de l'appel");
      }
    } catch (error) {
      console.error("Erreur de connexion à l'API", error);
    }
  };

  return (
    <>
      <div className="App">
        <button onClick={handleClick}>Cliquez pour dire Bonjour</button>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </>

    // <>
    //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //     <h1 className="text-4xl font-bold text-blue-500">
    //       Hello Tailwind CSS!
    //     </h1>
    //   </div>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  );
};

export default App;
