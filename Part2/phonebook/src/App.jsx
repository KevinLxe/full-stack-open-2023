import { useState, useEffect } from "react";
import personService from "./services/persons";
import "./app.css";

const Filter = ({ newSearchName, handleSearchName }) => (
    <>
        filter shown with <input value={newSearchName} onChange={handleSearchName} />
    </>
);

const PersonForm = ({
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
}) => (
    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
    </form>
);

const DeleteButton = ({ id, name, setMessage }) => {
    const handler = () => {
        if (!window.confirm(`Delete ${name} ?`)) return;

        personService.eliminate(id)
            .then(() => setMessage([`Information of ${name} has been removed correctly`, true]))
            .catch(() => setMessage([`Information of ${name} has already been removed from server`, false]))
            .finally(() => setTimeout(() => setMessage(["", true]), 3000));
    };

    return <button onClick={handler}>delete</button>;
};

const Persons = ({ personsToShow, setMessage }) => (
    <>
        {personsToShow.map(person => (
            <div key={person.name}>
                {person.name} {person.number} <DeleteButton id={person.id} name={person.name} setMessage={setMessage} />
            </div>
        ))}
    </>
);

const Notification = ({ message }) => {
    if (message[0] === "") return null;
    return <div className={message[1] ? "success" : "error"}>{message[0]}</div>;
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearchName, setNewSearchName] = useState("");
    const [message, setMessage] = useState(["", true]);

    useEffect(() => {
        personService.getAll().then(setPersons);
    }, [message]);

    const addPerson = event => {
        event.preventDefault();

        const personObject = { name: newName, number: newNumber };
        const existingPerson = persons.find(p => p.name === newName);

        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService.update(existingPerson.id, personObject)
                    .then(updatedPerson => setPersons(prev => prev.map(p => p.id !== existingPerson.id ? p : updatedPerson)))
                    .catch(error => setMessage([error.response.data.error, false]));
            }
        } else {
            personService.create(personObject)
                .then(newPerson => {
                    setPersons(prev => [...prev, newPerson]);
                    setMessage([`Added ${newName}`, true]);
                    setTimeout(() => setMessage(["", true]), 3000);
                })
                .catch(error => setMessage([error.response.data.error, false]));
        }

        setNewName("");
        setNewNumber("");
    };

    const personsToShow = newSearchName
        ? persons.filter(p => p.name.toLowerCase().includes(newSearchName.toLowerCase()))
        : persons;

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} />
            <Filter newSearchName={newSearchName} handleSearchName={e => setNewSearchName(e.target.value)} />
            <h1>Add a new</h1>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={e => setNewName(e.target.value)}
                newNumber={newNumber}
                handleNumberChange={e => setNewNumber(e.target.value)}
            />
            <h1>Numbers</h1>
            <Persons personsToShow={personsToShow} setMessage={setMessage} />
        </div>
    );
};

export default App;
