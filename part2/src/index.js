import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import SearchForm from "./components/SearchForm";
import AddForm from "./components/AddForm";
import Persons from "./components/Persons";
import Alert from "./components/Alert";
import namesService from "./services/namesService";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState({
    searchText: "",
    searchResult: []
  });
  const [alert, setAlert] = useState({ view: false, data: "", status: false });

  useEffect(() => {
    namesService.getAll().then(({ data }) => {
      setPersons(data);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const duplicatedPerson = checkDuplicate();
    if (duplicatedPerson) {
      if (
        !window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      )
        return;
      updatePerson(duplicatedPerson.id, {
        ...duplicatedPerson,
        phoneNumber: newNumber
      });
    } else {
      namesService.addPerson(newName, newNumber).then(({ data }) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
        setAlert({
          view: true,
          data: "Number added successfully",
          status: true
        });
        setTimeout(
          () => setAlert({ view: false, data: {}, status: false }),
          3000
        );
      });
    }
  };

  const checkDuplicate = () => persons.find(({ name }) => name === newName);

  const updatePerson = (id, newPerson) => {
    namesService.updatePerson(id, newPerson).then(updatedPerson => {
      setPersons(
        persons.map(person => {
          if (person.id === id) {
            return updatedPerson.data;
          }
          return person;
        })
      );
      setNewName("");
      setNewNumber("");
      setAlert({
        view: true,
        data: "Number updated successfully",
        status: true
      });
      setTimeout(
        () => setAlert({ view: false, data: {}, status: false }),
        3000
      );
    })
    .catch(err => {
      setAlert({view: true, data: `Information of ${newPerson.name} has already been removed from the server`, status: false})
      setTimeout(
        () => setAlert({ view: false, data: {}, status: false }),
        3000
      );
      setPersons(persons.filter(person => person.id !== id));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleSearch = e => {
    const result = persons.filter(({ name }) =>
      name.toLowerCase().includes(search.searchText.toLowerCase())
    );
    setSearch({ ...search, searchResult: result });
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}!!`)) return;
    namesService.deletePerson(id).then(() => {
      const updatesList = persons.filter(person => person.id !== id);
      setPersons(updatesList);
    }).catch(err => {
      setAlert({view: true, data: `Information of ${name} has already been removed from the server`, status: false})
      setTimeout(
        () => setAlert({ view: false, data: {}, status: false }),
        3000
      );
      setPersons(persons.filter(person => person.id !== id));
      setNewName("");
      setNewNumber("");
    });;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm
        search={search}
        handleSearch={handleSearch}
        setSearch={setSearch}
      />
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
        handleDelete={handleDelete}
      />
      {alert.view ? <Alert data={alert.data} status={alert.status} /> : null}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
