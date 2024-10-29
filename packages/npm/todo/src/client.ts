import * as api from "todo-api";

main();


let input = document.querySelector("input[type= 'text']") as HTMLInputElement;
const baseUrl = new URL("/", window.document.location.href)

// Main function and submit event listener
function main() {

  window.addEventListener("submit", async (event) => {
    event.preventDefault();
    window.document.body.className = "busy";

    try {
      const form = event.target as HTMLFormElement;
      input = form.elements.item(0) as HTMLInputElement;
      const inputValue = input.value.trim();

      if (inputValue.length === 0) return;

      // Add new todo item via API
      const resultValue = await api.client.addTodoItem(
        { description: input.value },
        { baseUrl }
      );

      // Delete todo item via API
      async function deleteTodoItem() {
        await api.client.deleteTodoItem(
          { id: resultValue },
          { baseUrl }
        );
      }

      // Mark todo item as done via API
      async function markAsDone() {
        await api.client.todoItemSetDone(
          { id: resultValue },
          { baseUrl }
        );
      }


      // Mark todo item as done via API
      async function UpdateTodo(id: number, newDescription: string) {
        await api.client.setTodoItemDescription(
          { id: resultValue },
          inputValue,
          { baseUrl },
        );
      }


      const newItemDiv = document.createElement("div");
      newItemDiv.textContent = inputValue;
      newItemDiv.classList.add("todo-item");

      // Mark as Done button
      const markDoneButton = document.createElement("button");
      markDoneButton.innerHTML = "Mark as Done";
      markDoneButton.className = "mark-done";
      markDoneButton.addEventListener("click", () => {
        markAsDone()
        newItemDiv.classList.toggle("done");
      });

      // Update To-Do button
      const updateButton = document.createElement("button");
      updateButton.innerHTML = "Update";
      updateButton.className = "update";
      updateButton.addEventListener("click", () => {
        const newDescription = prompt("Update your to-do item:", inputValue);
        if (newDescription) {
          UpdateTodo(resultValue, newDescription);
          newItemDiv.textContent = newDescription;
          newItemDiv.append(deleteButton, markDoneButton, updateButton);
        }
      });

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.className = "delete";
      deleteButton.addEventListener("click", () => {
        deleteTodoItem()
        newItemDiv.remove();
      });

      newItemDiv.append(deleteButton, markDoneButton, updateButton);

      // Append the new item div to the todoItemsDiv
      let todoItemsDiv = document.getElementById("todoItems")!;
      todoItemsDiv.prepend(newItemDiv); // Adds to the top


      newItemDiv.append(deleteButton);

      // Append the new item div to the todoItemsDiv
      todoItemsDiv = document.getElementById("todoItems")!;
      todoItemsDiv.prepend(newItemDiv); // Adds to the top
      form.reset();
    } finally {
      window.document.body.className = "";
    }
  });
}
