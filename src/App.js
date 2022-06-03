//! injected into the index.html
import "./styles.css";
import { useState } from "react";

//! simulating a backend ID system
let GLOBAL_TASK_ID = 42;

//! validation function
function isJustNumber(str) {
  return !isNaN(Number(str));
}

function isEmpty(str) {
  return str.length === 0;
}

function TodoList() {
  const [inputVal, setInputVal] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  //! task list was [ 'make food', 'do this', 'do that']
  /* 
  task list = [
    { id: 42, task: 'make_food', completed: false },
    { id: 43, task: 'do_this', completed: true },
    { id: 44, task: 'do_ that', completed: true },
  ]
  */

  let elm = data.map(function (obj) {
    //! dynamic className
    const task = obj.task;
    const completed = obj.completed;
    const id = obj.id;

    let xyz = "non-do-tasks";
    if (task.startsWith("do")) {
      xyz = "do-tasks";
    } else if (task.startsWith("make")) {
      xyz = "make-tasks";
    }

    let taskEl = task;
    if (completed) {
      taskEl = <del>{task}</del>;
    }
    return (
      <>
        <li key={id} className={xyz}>
          {taskEl}
        </li>
        <button
          className="itemButton"
          onClick={function () {
            //! IMPLEMENT!
            const updatedData = [...data];
            updatedData.map((elem) => {
              if (elem.id === id) {
                return (elem.completed = !elem.completed);
              }
              return elem.completed;
            });
            setData(updatedData);
          }}
        >
          {completed ? "Unmark" : "Mark"}
        </button>
        <button
          className="itemButton"
          onClick={function (id) {
            //! IMPLEMENT!
            let dataList = [...data];
            dataList.splice(id, 1);
            setData(dataList);
          }}
        >
          Delete
        </button>
      </>
    );
  });

  return (
    <div className="main">
      <h1>What do you want to do today?</h1>
      <form
        onSubmit={function (event) {
          event.preventDefault();

          if (error.length > 0) {
            return;
          }

          //! create a new ref
          let copyOfData = data.slice();

          //! create a task object
          const taskObj = {
            task: inputVal,
            completed: false,
            id: GLOBAL_TASK_ID++
          };

          //! add the data to the new ref
          copyOfData.push(taskObj);

          //! give the new reference in the state change
          setData(copyOfData);

          setInputVal("");
        }}
      >
        <input
          type="text"
          className="inputArea"
          onChange={function (event) {
            if (isEmpty(event.target.value)) {
              setError("Empty string!");
            } else if (isJustNumber(event.target.value)) {
              setError(
                "Cannot make task with just numbers. Try writing other things ..."
              );
            } else {
              setError("");
            }

            setInputVal(event.target.value);
          }}
          value={inputVal}
          required={true}
        />
        <button className="submitButton" type="submit">
          Add
        </button>
      </form>

      <div style={{ color: "red" }}>{error.length > 0 ? error : null}</div>

      <ol>{elm}</ol>
    </div>
  );
}

export default function App() {
  return <TodoList />;
}
