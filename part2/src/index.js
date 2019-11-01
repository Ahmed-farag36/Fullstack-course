import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import SearchForm from "./components/SearchForm";
import AddForm from "./components/AddForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState({
    searchText: "",
    searchResult: []
  });

  useEffect(() => {
    axios.get("http://localhost:3001/names")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    if (checkDuplicate()) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, phoneNumber: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  const checkDuplicate = () => persons.find(({ name }) => name === newName);

  const handleSearch = e => {
    const result = persons.filter(({ name }) =>
      name.toLowerCase().includes(search.searchText.toLowerCase())
    );
    setSearch({...search, searchResult: result});
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm search={search} handleSearch={handleSearch} setSearch={setSearch} />
      <h3>Add a new</h3>
      <AddForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchResult={search.searchResult}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
