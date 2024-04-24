// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  function updateList(person) { 
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
  }

    const [characters, setCharacters] = useState([
    ]);

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }
  
    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [characters] );

  
    function deleteUser(id){
      const promise = fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE"
      });
      return promise;
    }

  function removeOneCharacter(id) {
    // deleteUser(id)
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
    })
    //.then & .catch
    .then((res) => {
      if (res.status === 204){
        setCharacters(characters.filter((user) => user._id !== id))
      }else{
        console.log("Error: Could not delete user.")
      }})
    .catch((error) => {
      console.log(error)
    })
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }


  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList}/>
    </div>
  );
}

export default MyApp;
