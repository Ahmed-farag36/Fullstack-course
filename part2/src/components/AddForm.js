import React from "react";

export default ({ newName, newNumber, setNewName, setNewNumber, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameField">Name: </label>
          <input
            id="nameField"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <label htmlFor="phoneNo">Phone number: </label>
          <input
            id="phoneNo"
            value={newNumber}
            onChange={e => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
);