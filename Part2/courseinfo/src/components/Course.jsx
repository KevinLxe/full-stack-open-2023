const Heading = ({ courseTitle }) => {
  console.log(courseTitle)
  return (
      <div>
          <h1>{courseTitle}</h1>
      </div>
  );
}

const Segment = ({ section }) => {
  console.log(section)
  return (
      <div>
          <p>{section.topic} {section.tasks}</p>
      </div>
  );
}

const Curriculum = ({ sections }) => {
  const renderedSections = sections.map(item => <Segment key={item.id} section={item} />);
  return <div>{renderedSections}</div>;
}

const Summary = ({ sections }) => {
  const totalCount = sections.reduce((acc, item) => acc + item.tasks, 0);
  console.log(totalCount);
  return (
      <div>
          <p>total of {totalCount} exercises</p>
      </div>
  );
}

const Course = ({ module }) => {
  console.log(module)
  return (
      <div>
          <Heading courseTitle={module.title} />
          <Curriculum sections={module.sections} />
          <Summary sections={module.sections} />
      </div>
  );
}

export default Course;