import ToDo from "../Models/ToDo.js";

// To Create a Todo
export const createTodo = async (req, res, next) => {
  try {
    // Log This Request
    console.log(new Date().toISOString(), req.method, req.baseUrl);

    // Create a new todo object
    const todo = new ToDo(req.body);

    // Save the object as document in MongoDb
    const createdTodo = await todo.save();
    res.status(201).json({
      status: "Success",
      message: "Todo Created SuccessFully!",
      todo: {
        ...createdTodo._doc,
        todoId: createdTodo._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error in DB Operation!",
      error: error,
    });
  }
};

// To get list of Todos
export const getTodos = async (req, res, next) => {
  try {
    // Log This Request
    console.log(new Date().toISOString(), req.method, req.baseUrl);

    // Set up Todo query
    const todos = await ToDo.find().sort({
      onDate: -1,
    });
    if (!todos.length) {
      return res.status(404).json({
        status: "Success",
        message: "No Todos found!",
        todos: todos,
        todoCount: todos.length,
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Todos Fetched Successfully!",
      todos: todos,
      todoCount: todos.length,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error in DB Operation!",
      error: error,
    });
  }
};

// To Update a Todo
export const updateTodo = async (req, res, next) => {
  try {
    // Log This Request
    console.log(new Date().toISOString(), req.method, req.baseUrl);

    // Get Todo Id to modify
    const todoId = req.params.todoId;

    // Get Data to be modified
    const data = req.body;

    // Execute Update
    const updatedTodo = await ToDo.findOneAndUpdate(
      {
        _id: todoId,
      },
      {
        ...data,
        "timestamps.modifiedOn": Date.now(),
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "Success",
      message: "Todo Updated Successfully!",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error in DB Operation!",
      error: error,
    });
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    // Log This Request
    console.log(new Date().toISOString(), req.method, req.baseUrl);

    // Get Todo Id to delete
    const todoId = req.params.todoId;

    // Execute Update
    const deletedTodo = await ToDo.findOneAndDelete({
      _id: todoId,
    });
    res.status(201).json({
      status: "Success",
      message: "Todo Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error in DB Operation!",
      error: error,
    });
  }
};

export default {};
