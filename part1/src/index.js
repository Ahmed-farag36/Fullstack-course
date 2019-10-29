import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const displayRandomly = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    randomIndex !== selected ? setSelected(randomIndex) : displayRandomly(); // ensure that anecdote changed
  };

  const handleVote = () => {
    const updatedAnecdotes = [...votes];
    updatedAnecdotes[selected] += 1;
    setVotes(updatedAnecdotes);
  };

  const checkMostVotes = () => {
    return votes.indexOf([...votes].sort()[votes.length - 1]);
  };

  return (
    <div>
      <Anecdote
        header="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votesCount={votes[selected]}
      />
      <Button handleClick={handleVote} text="Vote" />
      <Button handleClick={displayRandomly} text="Next anecdote" />
      <Anecdote
        header="Anecdote with most votes"
        anecdote={anecdotes[checkMostVotes()]}
        votesCount={votes[checkMostVotes()]}
      />
    </div>
  );
};

const Anecdote = ({ header, anecdote, votesCount }) => (
  <>
    <h1>{header}</h1>
    <hr />
    <h3>{anecdote}</h3>
    <div>has {votesCount} votes</div>
  </>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App />, document.getElementById("root"));
