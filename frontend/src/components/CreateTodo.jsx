import { useState } from "react";

export function CreateTodo(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        id="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          fetch("http://localhost:3001/todo", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(async (res) => {
              if (!res.ok) {
                throw new Error("Failed to add todo");
              }
              const json = await res.json();
              alert(json.msg); // Using the response message for feedback
              setTitle(""); // Reset the title input
              setDescription(""); // Reset the description input
            })
            .catch((error) => {
              console.error("Error adding todo:", error);
              alert("An error occurred while adding the todo.");
            });
        }}
      >
        Add a Todo
      </button>
    </div>
  );
}
