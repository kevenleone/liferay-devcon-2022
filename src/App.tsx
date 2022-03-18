import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { baseFetch } from "./services/Liferay";

type Todo = {
  id?: number;
  task: string;
  email: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  const fetchTodos = () => {
    baseFetch("o/c/todos")
      .then(({ items = [] }) => {
        setTodos(items);
      })
      .catch(console.error);
  };

  const onCreateTodo = async () => {
    const response = await baseFetch("o/c/todos", {
      method: "POST",
      body: JSON.stringify({ task, completed: false, email: "keven" }),
    });

    setTask("");

    setTodos((prevState) => [...prevState, response]);
  };

  const onRemoveTodo = async (id: number) => {
    await baseFetch(`o/c/todos/${id}`, {
      method: "DELETE",
    });

    console.log({ id });

    setTodos((prevState) => prevState.filter((state) => state.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos);

  return (
    <Layout>
      <div className="todos">
        <h1>Todo App</h1>

        <div className="d-flex">
          <input
            className="form-control"
            onChange={({ target: { value } }) => setTask(value)}
            placeholder="Add your new todo"
            value={task}
          />
          <button className="ml-4 btn btn-primary" onClick={onCreateTodo}>
            Add
          </button>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div
              className="align-items-center d-flex justify-content-between"
              key={todo.id}
            >
              <span>{todo.task}</span>
              <button
                className="btn btn-danger"
                onClick={() => onRemoveTodo(todo.id as number)}
              >
                <span className="text-white">X</span>
              </button>
            </div>
          ))}
        </div>

        <p>You have {todos.length} pending tasks</p>
      </div>
    </Layout>
  );
};

export default App;
