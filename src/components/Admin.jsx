import React, { useState } from "react";

function Admin() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    imageUrl: "",
    location: "",
    price: "",
    disprice: "",
    down:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({
        title: "",
        imageUrl: "",
        location: "",
        price: "",
        disprice: "",
        down:""
      });
    }
  };

  const editTask = (id, field, value) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>ADD CARDS</h1>

      <div className="task-input">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newTask.imageUrl}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newTask.location}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newTask.price}
          onChange={handleInputChange}
        />
          <input
          type="number"
          name="down"
          placeholder="downpayment"
          value={newTask.down}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="disprice"
          placeholder="Discount Price"
          value={newTask.disprice}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>Add Card</button>
      </div>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <img src={task.imageUrl} alt="Task" className="task-image" />
              <div className="task-info">
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => editTask(task.id, "title", e.target.value)}
                  placeholder="Title"
                />
                <input
                  type="number"
                  value={task.down}
                  onChange={(e) => editTask(task.id, "down", e.target.value)}
                  placeholder="Downpayment"
                />
                <input
                  type="text"
                  value={task.location}
                  onChange={(e) => editTask(task.id, "location", e.target.value)}
                  placeholder="Location"
                />
                <input
                  type="number"
                  value={task.price}
                  onChange={(e) => editTask(task.id, "price", e.target.value)}
                  placeholder="Price"
                />
                <input
                  type="number"
                  value={task.disprice}
                  onChange={(e) => editTask(task.id, "disprice", e.target.value)}
                  placeholder="Discount Price"
                />
                 
              
              </div>
              
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p className="no-tasks">No CARD available. Add some!</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
