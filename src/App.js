import React, { useEffect, useState } from "react";
import axios from "axios";
// import response from "./server";

function App() {
  const [form, setForm] = useState({});
  const [deleteForm, setDeleteForm] = useState({});
  const [users, setUsers] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const formHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const deleteFormHandler = (e) => {
    setDeleteForm({
      [e.target.name]: e.target.value,
    });
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    const data = deleteForm;
    const response = await axios.post(
      "https://test-backend-gamma.vercel.app/demo/delete",
      data,
      config
    );
    const res = response.data;
    console.log(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = form;
    const response = await axios.post(
      "https://test-backend-gamma.vercel.app/demo",
      data,
      config
    );
    const res = response.data;
    console.log(res);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const data = { username: "Tatva-Kamdar" };
    const response = await axios.post(
      "https://test-backend-gamma.vercel.app/demo/update",
      data,
      config
    );
    console.log(response);
    const res = response.data;
    console.log(res);
  };

  const getUsers = async (e) => {
    axios.get("https://test-backend-gamma.vercel.app/demo").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>{JSON.stringify(form)}</p>
        <span>Username</span>
        <input type="text" name="username" onChange={formHandler} />
        <span>Password</span>
        <input type="text" name="password" onChange={formHandler} />
        <input type="submit" value="Submit" />
      </form>
      <div>
        <form onSubmit={deleteUser}>
          <p>{JSON.stringify(deleteForm)}</p>
          <span>id</span>
          <input type="text" name="id" onChange={deleteFormHandler} />
          <input type="submit" value="Delete User" />
        </form>
      </div>
      <div>
        <form onSubmit={updateUser}>
          <input type="submit" value="Update User" />
        </form>
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <ol key={user._id}>
              <li>{user.username}</li>
              <li>{user.password}</li>
              <br />
            </ol>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
