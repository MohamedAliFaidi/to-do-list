import React, { useEffect, useState } from "react";
import Task from "./Task";
import Formtask from "./Formtask";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [done, setDone] = useState(false); 

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, [done]);
  return (
    <>
      {!update ? (
        <div>
          {tasks?.map((e, i) => {
            return (
              <div key={i}>
                <input
                  type="checkbox"
                  disabled={e.done}
                  checked={e.done}
                  onChange={(e) => {
                    const data = localStorage.getItem("tasks");
                    const tasks = JSON.parse(data);
                    console.log(e);

                    tasks[i]["done"] = e.target.checked;
                    e.done = true;
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    setDone(!done);
                  }}
                  placeholder="done"
                />
                <div
                  style={{ border: "1px solid black" }}
                  onClick={() => {
                    setUpdate(!update);
                    navigate("/edit/" + i);
                  }}
                >
                  <Task task={e} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Formtask  />
      )}
    </>
  );
}

export default TaskList;
