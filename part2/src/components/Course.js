import React from "react";

export default ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

const Header = ({ name }) => <h1>Course: {name}</h1>;

const Content = ({ parts }) => (
  <ul>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </ul>
);

const Part = ({ name, exercises }) => (
  <li>
    {name}: {exercises}
  </li>
);

const Total = ({ parts }) => (
  <div>
    Total of {parts.reduce((sum, part) => (sum += part.exercises), 0)} exercises
  </div>
);
