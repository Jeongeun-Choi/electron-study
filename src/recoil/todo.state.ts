import { TodoListType } from "pages/TodoList";
import { atom } from "recoil";

export const TodoListState = atom<TodoListType[]>({
  key: "todoList",
  default: [],
});
