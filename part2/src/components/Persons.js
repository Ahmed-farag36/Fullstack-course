import React from "react";

export default ({ searchResult, persons }) => {
  let results;

  if (searchResult.length) {
    results = searchResult.map(({ name, phoneNumber }) => (
      <li key={name}>
        {name} {phoneNumber}
      </li>
    ));
  } else {
    results = persons.map(({ name, phoneNumber }) => (
      <li key={name}>
        {name} {phoneNumber}
      </li>
    ));
  }

  return <ul>{results}</ul>;
};
