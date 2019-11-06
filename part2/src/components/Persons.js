import React from "react";

export default ({ searchResult, persons, handleDelete }) => {
  let results;

  if (searchResult.length) {
    results = searchResult.map(({ id, name, phoneNumber }) => (
      <li key={name}>
        {name} {phoneNumber}
        <button onClick={() => handleDelete(id, name)}>delete</button>
      </li>
    ));
  } else {
    results = persons.map(({ id, name, phoneNumber }) => (
      <li key={name}>
        {name} {phoneNumber}
        <button onClick={() => handleDelete(id, name)}>delete</button>
      </li>
    ));
  }

  return <ul>{results}</ul>;
};
