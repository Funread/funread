import React from "react";
import { useCreateTaskMutation } from "../api/apiSlice";

function TaskForm() {
  const [createTask] = useCreateTaskMutation();
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value.trim();
    const description = e.target.elements.description.value.trim();
    const completed = e.target.elements.completed.checked;

    createTask({
      title,
      description,
      completed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <input
        className="mx-3"
        type="text"
        name="title"
        placeholder="Title"
      ></input>
      <input
        className="mx-3"
        type="text"
        name="description"
        placeholder="Description"
      ></input>
      <input className="mx-3" type="checkbox" name="completed"></input>
      <button className="mx-3 btn btn-primary">Add Page</button>
    </form>
  );
}

export default TaskForm;
