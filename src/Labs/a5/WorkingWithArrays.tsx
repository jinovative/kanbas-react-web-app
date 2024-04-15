import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

function WorkingWithArrays() {
  const API = "http://localhost:4000/a5/todos";
  const [todo, setTodo] = useState<any>({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const deleteTodo = async (todo: any) => {
    try {
      const response = await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        // If the error is an AxiosError, we can safely access error.response
        const message =
          error.response?.data.message || "An unexpected error occurred";
        setErrorMessage(message);
      } else {
        // For non-Axios errors, provide a generic error message
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  const fetchTodoById = async (id: any) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };

  const updateTodo = async () => {
    try {
      const response = await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error) {
      console.log(error);
      // Use the type guard to check if it's an Axios error
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows `error` is an AxiosError, so we can safely access `error.response`
        const message =
          error.response?.data.message || "An unexpected error occurred";
        setErrorMessage(message);
      } else {
        // Handle non-Axios errors or other types of exceptions
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h3>Working with Arrays</h3>
      <textarea
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <br />
      <input
        value={todo.due}
        type="date"
        onChange={(e) =>
          setTodo({
            ...todo,
            due: e.target.value,
          })
        }
      />{" "}
      <br />
      <label>
        <input
          value={todo.completed}
          type="checkbox"
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
        />
        Completed
      </label>
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}
      <br />
      <button className="btn btn-warning" onClick={postTodo}>
        Post Todo
      </button>
      <button className="btn btn-info" onClick={updateTodo}>
        Update Todo
      </button>
      <br />
      <button className="btn btn-primary" onClick={createTodo}>
        Create Todo
      </button>
      <button className="btn btn-success" onClick={updateTitle}>
        Update Title
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <input checked={todo.completed} type="checkbox" readOnly />
            {todo.title}
            {todo.description}
            {todo.due}

            <button onClick={() => deleteTodo(todo)} className="btn btn-danger">
              Delete
            </button>
            <button
              className="btn btn-warning"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <input
        type="number"
        value={todo.id}
        onChange={(e) =>
          setTodo({
            ...todo,
            id: Number(e.target.value),
          })
        }
      />
      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <br />
      <h3>Updating an Item in an Array</h3>
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>
      <h3>Deleting from an Array</h3>
      <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>
      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
      />
      <a className="btn btn-primary" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <br />
      <input
        type="number"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
      />
      <input
        type="text"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />{" "}
      <br />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
      >
        Update Description
      </a>
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Mark as {todo.completed ? "Incomplete" : "Complete"}
      </a>
    </div>
  );
}
export default WorkingWithArrays;
