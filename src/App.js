import React, { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router";
import TopPackages from "./Components/TopPackages";

function App() {
  const [repos, setRepos] = useState([]);
  const [importedRepos, setImportedRepos] = useState([]);
  const [packages, setPackages] = useState([]);
  console.log("packages are", packages);
  return (
    <div className="App">
      <div className="container">
        <Navbar setRepos={setRepos} importedRepos={importedRepos} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                repos={repos}
                setImportedRepos={setImportedRepos}
                setRepos={setRepos}
                setPackages={setPackages}
                packages={packages}
              />
            }
          />
          <Route
            path="/top-packages"
            element={<TopPackages packages={packages} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
