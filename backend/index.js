const cors = require("cors");
const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.post("/todo", async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "You sent the wrong inputs" 
        });
    }
    const newTodo = await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    });
    res.json({
        msg: "Todo created",
        todo: newTodo
    });
});

app.get("/todos", async function(req, res){
    const todos = await todo.find();
    res.json({
        todos
    });
});

app.put("/completed", async function(req, res){
    const updatePayload = req.body;
    const parsedupdatePayload = updateTodo.safeParse(updatePayload);
    if (!parsedupdatePayload.success) {
        return res.status(400).json({
            msg: "You sent the wrong inputs!"
        });
    }
    const updatedTodo = await todo.updateOne(
        { _id: req.body.id },
        { $set: { completed: true } }
    );
    res.json({
        msg: "Todo marked as completed",
        todo: updatedTodo
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
