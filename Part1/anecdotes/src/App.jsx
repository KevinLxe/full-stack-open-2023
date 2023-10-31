import { useState } from 'react';

const SectionHeader = ({ title }) => {
  return <h1>{title}</h1>;
}

const Anecdotes = ({ story, voteTally }) => {
  return (
    <div>
      <p>{story}</p>
      <p>has {voteTally} votes</p>
    </div>
  );
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
}

const HighlightedAnecdote = ({ story, topVotes }) => {
  return (
    <div>
      <p>{story}</p>
      <p>has {topVotes} votes</p>
    </div>
  );
}

const App = () => {
  const tales = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [currentTaleIndex, setCurrentTaleIndex] = useState(0);
  const [voteCounts, updateVoteCounts] = useState(Array(tales.length).fill(0));

  const goToNextTale = () => {
    setCurrentTaleIndex(Math.floor(Math.random() * tales.length));
  }

  const incrementVote = () => {
    const newVoteCounts = [...voteCounts];
    newVoteCounts[currentTaleIndex] += 1;
    updateVoteCounts(newVoteCounts);
  }

  const highestVote = Math.max(...voteCounts);
  const mostVotedIndex = voteCounts.indexOf(highestVote);

  return (
    <div>
      <SectionHeader title='Anecdote of the day' />
      <Anecdotes story={tales[currentTaleIndex]} voteTally={voteCounts[currentTaleIndex]} />
      <Button handleClick={incrementVote} text='vote' />
      <Button handleClick={goToNextTale} text='next anecdote' />
      <SectionHeader title='Anecdote with most votes' />
      <HighlightedAnecdote story={tales[mostVotedIndex]} topVotes={highestVote} />
    </div>
  );
}

export default App;

