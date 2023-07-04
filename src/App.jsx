import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const localList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(localList);
    }
  }, []);

  const helper = () => {
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      task: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setInput("");

    if (tasks) {
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Math.floor(Math.random() * 1000),
      task: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setInput("");

    if (tasks) {
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
    }
  };

  const deleteTask = (id) => {
    let filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks);

    localStorage.setItem("localTasks", JSON.stringify(filteredTasks));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );

    localStorage.setItem(
      "localTasks",
      JSON.stringify(
        tasks.map((task) => {
          return task.id === id
            ? { ...task, completed: !task.completed }
            : task;
        })
      )
    );
  };

  return (
    <div className="bg-pink-500 w-full pt-[2rem] px-3 select-none pb-3">
      <div className="flex items-center  flex-col text-center bg-white w-full md:w-[500px] m-auto py-5 rounded-md">
        <h1 className="text-4xl font-bold mb-6">To Do App</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center w-[85vw] md:w-[450px]">
            <input
              type="text"
              value={input}
              className="w-full px-5 py-2 border border-[#999] outline-none"
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="p-[0.69rem] ml-1 bg-pink-300">
              <AiOutlinePlus
                onClick={() => helper()}
                className="text-white"
                size={20}
              ></AiOutlinePlus>
            </div>
          </div>
        </form>

        {tasks.map((task) => {
          return (
            <div key={task.id} className="mt-5 text-left">
              {task.completed ? (
                <h1
                  className="px-4 py-2 bg-gray-300 w-[85vw] md:w-[450px] text-xl line-through flex justify-between items-center decoration-solid rounded-ml"
                  onDoubleClick={() => completeTask(task.id)}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={task.completed ? "checked" : ""}
                      readOnly
                      className="mr-2"
                    />
                    {task.task}{" "}
                  </div>

                  <BsFillTrashFill
                    onClick={() => deleteTask(task.id)}
                    className="cursor-pointer"
                  ></BsFillTrashFill>
                </h1>
              ) : (
                <h1
                  className="px-4 py-2 bg-gray-200 w-[85vw] md:w-[450px] text-xl flex justify-between items-center rounded-ml"
                  onDoubleClick={() => completeTask(task.id)}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={task.completed ? "checked" : ""}
                      className="mr-2"
                      readOnly
                    />
                    {task.task}{" "}
                  </div>
                  <BsFillTrashFill
                    onClick={() => deleteTask(task.id)}
                    className="cursor-pointer"
                  ></BsFillTrashFill>
                </h1>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
