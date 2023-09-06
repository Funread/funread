import React from "react";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../api/apiSlice";

function TasksList() {
  const { data: tasks, isError, isLoading, error } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-sm-6 mt-4 ml-4">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <input
                  type="checkbox"
                  id={task.id}
                  checked={task.completed}
                  onChange={(e) =>
                    updateTask({
                      ...task,
                      completed: e.target.checked,
                    })
                  }
                ></input>
                <label htmlFor={task.id}>Completed</label>
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TasksList;
