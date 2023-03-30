const getTodos = (req, res) => {
    Todo.find()
        .exec()
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            res.send(err);
        });
};

const Todo = require("../model/Todo");

const createTodo = (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
    });

    todo.save()
        .then(todo => {
            res.json(todo);
        })
        .catch(err => {
            res.send(err);
        });
};

const updateTodo = (req, res) => {
    Todo.findOneAndUpdate({
            _id: req.params.todoID,
        }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed,
            },
        }, {
            new: true,
            useFindAndModify: false // Add this line to avoid a deprecation warning
        })
        .then((updatedTodo) => {
            res.json(updatedTodo);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

const deleteTodo = (req, res) => {
    Todo.deleteOne({
            _id: req.params.todoID
        })
        .then(() => res.json({
            message: "Todo Deleted"
        }))
        .catch((err) => res.send(err));
};



module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};