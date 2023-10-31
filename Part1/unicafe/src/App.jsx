import { useState } from 'react';

const FeedbackStats = ({ positive, neutral, negative }) => {
    const total = positive + neutral + negative;
    if (total === 0) {
        return (
            <div>
                <p>No comments yet!</p>
            </div>
        );
    }
    return (
        <table>
            <tbody>
                <StatRow label='Positive' count={positive} />
                <StatRow label='Neutral' count={neutral} />
                <StatRow label='Negative' count={negative} />
                <StatRow label='Total' count={total} />
                <StatRow label='Mean' count={(positive - negative) / total} />
                <StatRow label='Percentage Positive' count={`${(positive / total * 100).toFixed(2)}%`} />
            </tbody>
        </table>
    );
}

const StatRow = ({ label, count }) => {
    return (
        <tr>
            <td>{label}</td>
            <td>{count}</td>
        </tr>
    );
}

const ActionButton = ({ onAction, label }) => {
    return (
        <button onClick={onAction}>{label}</button>
    );
}

const App = () => {
    const [positive, setPositive] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [negative, setNegative] = useState(0);

    return (
        <div>
            <h1>Share Your Feedback!</h1>
            <ActionButton onAction={() => setPositive(positive + 1)} label='Positive' />
            <ActionButton onAction={() => setNeutral(neutral + 1)} label='Neutral' />
            <ActionButton onAction={() => setNegative(negative + 1)} label='Negative' />
            <h2>Summary</h2>
            <FeedbackStats positive={positive} neutral={neutral} negative={negative} />
        </div>
    );
}

export default App;

