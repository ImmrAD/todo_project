import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then(async function(res) {
        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch(function(error) {
        console.error('Error fetching todos:', error);
      });
  }, []); // Empty dependency array means this effect runs only once, after the initial render

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos}></Todos>
    </div>
  );
}

export default App;
