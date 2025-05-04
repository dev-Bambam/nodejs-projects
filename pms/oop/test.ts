
interface Todo{
    title: string;
    description?:string
}

const todo1 = {
    title: "I will learn SOLID design principles",
    completed: false
}

const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>) => ({ ...todo, ...fieldsToUpdate })

const result1 = updateTodo(todo1, { description: "throw out trash" });

const todo2 = {
    ...todo1,
    description: "clean up the house thoroughly"
}

const updateRequiredTodo = (todo: Required<Todo>, fieldsToUpdate: Partial<Todo>) => ({ ...todo, ...fieldsToUpdate });

const result2 = updateRequiredTodo(todo2, { description: "throw out trash" })
console.log(`Result1:${result1}`, "\n", `Result2:${result2}`)