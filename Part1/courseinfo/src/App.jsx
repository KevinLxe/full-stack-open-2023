const Header = ({ courseDetails }) => {
  return (
    <div>
      <h1>{courseDetails.title}</h1>
    </div>
  );
};

const Part = ({ singlePart }) => {
  return (
    <div>
      <p>{singlePart.topic} {singlePart.tasks}</p>
    </div>
  );
};

const Content = ({ modules }) => {
  return (
    <div>
      {modules.map(moduleItem => <Part key={moduleItem.topic} singlePart={moduleItem} />)}
    </div>
  );
};

const Total = ({ modules }) => {
  const totalExercises = modules.reduce((sum, moduleItem) => sum + moduleItem.tasks, 0);
  return (
    <div>
      <p>Total number of tasks: {totalExercises}</p>
    </div>
  );
};

const App = () => {
  const courseDetails = {
    title: 'Half Stack application development',
    modules: [
      {
        topic: 'Fundamentals of React',
        tasks: 10
      },
      {
        topic: 'Data Transfer Using Props',
        tasks: 7
      },
      {
        topic: 'Component State Management',
        tasks: 14
      }
    ]
  };

  return (
    <div>
      <Header courseDetails={courseDetails} />
      <Content modules={courseDetails.modules} />
      <Total modules={courseDetails.modules} />
    </div>
  );
}

export default App;
