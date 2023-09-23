import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const [inputValue, setInputValue] = useState();
  const [todo, setTodo] = useState([]);
  const [todoId, setTodoId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputValue)
    if (todoId) {
      // const foundItem = todo.find( (obj) => obj.id === todoId);
      // const updatedTodos = todo.map( (obj)=> obj.id === foundItem.id ?

      const updatedTodos = todo.map((obj) =>
        obj.id === todoId
          ? (obj = { id: obj.id, name: inputValue })
          : (obj = { id: obj.id, name: obj.name })
      );
      // console.warn("foundItem>>>",foundItem);
      setTodo(updatedTodos);
      setTodoId("");
      setInputValue("");
    } else {
      setTodo((value) => [...value, { id: uuidv4(), name: inputValue }]);
      console.log("Todo  inside func>>>", todo);
      setInputValue("");
    }
  };
  console.log("Todo  outside func>>>", todo);

  const deleteTodo = (key) => {
    const filteredItems = todo.filter((obj) => obj.id !== key);
    setTodo(filteredItems);
  };

  const editTodo = (key) => {
    const editedItems = todo.filter((obj) => obj.id === key);
    setInputValue(editedItems[0].name);
    console.warn("editedItems>>",editedItems);
    setTodoId(key);
  };

  console.warn("todoId>>>", todoId);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type="submit">{todoId ? "Edit" : "Add"}</button>
      </form>
      {todo.map((obj) => {
        return (
          <ul key={obj.id}>
            <li>{obj.name}</li>
            <span onClick={() => deleteTodo(obj.id)}>Delete</span>
            <span onClick={() => editTodo(obj.id)}>Edit</span>
          </ul>
        );
      })}
    </div>
  );
};

export default Form;
