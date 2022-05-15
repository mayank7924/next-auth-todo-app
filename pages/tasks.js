import React from "react";
import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Tasks() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [newTodo, setNewTodo] = useState("");
  let changeHandler = (event) => {
    setTodo(event.target.value);
  };

  let updateTodoHandler = (event) => {
    setNewTodo(event.target.value);
  };

  let addTodo = (event) => {
    event.preventDefault();
    fetch("/api/user/tasks", {
      method: "POST",
      body: JSON.stringify({
        task: todo,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
  };

  let removeTodo = (id) => {
    fetch("/api/user/tasks", {
      method: "DELETE",
      body: JSON.stringify({
        taskId: id,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
  };

  let loadTodos = () => {
    fetch("/api/user/tasks")
      .then((res) => res.json())
      .then((data) => {
        setData(data.tasks);
      });
  };

  const editBody = (event, id) => {
    event.preventDefault();
    fetch("/api/user/tasks", {
      method: "PATCH",
      body: JSON.stringify({
        task: newTodo,
        taskId: id,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!data) return "Loading...";
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className={styles.title}>
            Manage your tasks
            <br />
            <br />
          </h1>

          <form className={styles.cardForm} onSubmit={addTodo}>
            <input
              className={styles.cardInput}
              type="text"
              name="todo"
              onChange={changeHandler}
              placeholder="Type in a new Task and hit Enter!"
            />
          </form>
          <h4>Click on a task to mark as done!</h4>
          {data.map((item) => (
            <>
              <a
                href="#"
                onClick={() => removeTodo(item.id)}
                className={styles.card}
              >
                <p>{item.body}</p>
              </a>
              <Popup trigger={<button className={styles.editButton}> Edit</button>} position="right center">
                <div>
                  <form
                    className={styles.cardForm}
                    onSubmit={(event) => {
                      editBody(event, item.id);
                    }}
                  >
                    <input
                      className={styles.cardInput}
                      type="text"
                      name="todo"
                      onChange={updateTodoHandler}
                      placeholder="Edit task!"
                    />
                  </form>
                </div>
              </Popup>
            </>
          ))}
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default Tasks;
