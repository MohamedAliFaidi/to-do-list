function Task({ task }) {
  return (
    <>
      <div>{task.title}</div>
      <div>{task.description}</div>
    </>
  );
}

export default Task;
