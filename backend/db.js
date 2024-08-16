/*
* Todo {
    title: string,
    description: string,
    completed: boolean
    }
*/
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ananddane1:yWCAi9RxEZz9wIEY@cluster0.kwtobog.mongodb.net/todos")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports ={
    todo
}