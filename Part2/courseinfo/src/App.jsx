import Course from './components/Course';

const App = () => {
    const modules = [
        {
            id: 1,
            title: 'Half Stack application development',
            sections: [
                {
                    topic: 'Fundamentals of React',
                    tasks: 10,
                    id: 1
                },
                {
                    topic: 'Using props to pass data',
                    tasks: 7,
                    id: 2
                },
                {
                    topic: 'State of a component',
                    tasks: 14,
                    id: 3
                },
                {
                    topic: 'Redux',
                    tasks: 11,
                    id: 4
                }
            ]
        },
        {
            id: 2,
            title: 'Node.js',
            sections: [
                {
                    topic: 'Routing',
                    tasks: 3,
                    id: 1
                },
                {
                    topic: 'Middlewares',
                    tasks: 7,
                    id: 2
                }
            ]
        }
    ];

    const displayedCourses = modules.map(moduleItem => <Course key={moduleItem.id} module={moduleItem} />);

    return (
        <div>
            <h1>Web development curriculum</h1>
            {displayedCourses}
        </div>
    );
}

export default App;
