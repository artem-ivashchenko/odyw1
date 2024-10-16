import { useState } from "react";

function validateInput(username, password) {
  if (username === "" || password === "") return false;
  return true;
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [responseData, setResponseData] = useState("");

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const handleGet = async () => {
    const response = await fetch("http://localhost:4000/allusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      setResponseData("Failed to get, status: " + response.statusText);

    const data = await response.json();
    setResponseData(JSON.stringify(data, null, 2));
  };

  const handlePost = async () => {
    if (!validateInput(username, password)) {
      setResponseData("Username or password cannot be empty");
      return;
    }

    const response = await fetch("http://localhost:4000/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok)
      setResponseData("Failed to post, status: " + response.statusText);

    const data = await response.json();
    setResponseData(JSON.stringify(data, null, 2));

    clearInputs();
  };

  const handlePut = async () => {
    if (!validateInput(username, password)) {
      setResponseData("Username or password cannot be empty");
      return;
    }

    const response = await fetch("http://localhost:4000/changeuserdata", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok)
      console.error("failed to put, status: ", response.statusText);

    const data = await response.json();
    setResponseData(JSON.stringify(data, null, 2));

    clearInputs();
  };

  const handleDelete = async () => {
    if (username === "") {
      setResponseData("Username cannot be empty");
      return;
    }

    const response = await fetch("http://localhost:4000/deleteuser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    if (!response.ok)
      setResponseData("Failed to delete, status: " + response.statusText);

    const data = await response.json();
    setResponseData(JSON.stringify(data, null, 2));

    clearInputs();
  };

  return (
    <>
      <input
        placeholder="Username"
        value={username}
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="buttons">
        <button onClick={() => handleGet()}>GET</button>
        <button onClick={() => handlePost()}>POST</button>
        <button onClick={() => handlePut()}>PUT</button>
        <button onClick={() => handleDelete()}>DELETE</button>
      </div>

      <pre>{responseData}</pre>
    </>
  );
}

export default App;
