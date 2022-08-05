import List from "components/Todo/List";
import {
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { TodoListState } from "recoil/todo.state";

type CheckListType = {
  [key: number]: boolean;
};

export type TodoListType = {
  id: number;
  title: string;
};
const TodoList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useRecoilState(TodoListState);
  // const [todoList, setTodoList] = useState<TodoListType[]>([]);
  const [checkList, setCheckList] = useState<CheckListType>({ 1: false });
  const [totalId, setTotalId] = useState<number>(1);

  useEffect(() => {
    const localTodoList = localStorage.getItem("todo");

    if (!localTodoList) {
      return;
    }
    const parseLocalStorage = JSON.parse(localTodoList);

    if (parseLocalStorage.length < 1) {
      return;
    }

    const localTodoListLen = parseLocalStorage.length;
    const lastIndex = parseLocalStorage[localTodoListLen - 1].id;

    setTotalId(lastIndex);
    setTodoList(parseLocalStorage);
  }, [setTodoList]);

  const handleChangeChecked = useCallback((itemNo: number) => {
    setCheckList((prev) => {
      prev[itemNo] = !prev[itemNo];

      return { ...prev };
    });
  }, []);

  const handleDeleteItem = useCallback(
    (itemNo: number) => {
      const localTodoList = localStorage.getItem("todo");

      if (!localTodoList) {
        return;
      }
      const parseLocalStorage = JSON.parse(localTodoList);

      const newTodoList = todoList.filter((item) => item.id !== itemNo);
      const newLocalStorage = parseLocalStorage.filter(
        (item: TodoListType) => item.id !== itemNo
      );

      const newCheckList = Object.keys(checkList).reduce(
        (acc: CheckListType, cur: string) => {
          const id = parseInt(cur, 10);
          if (id === itemNo) {
            return acc;
          }

          acc[id] = checkList[id];
          return acc;
        },
        {}
      );

      setTodoList(newTodoList);
      setCheckList(newCheckList);
      localStorage.setItem(`todo`, JSON.stringify(newLocalStorage));
    },
    [checkList, todoList, setTodoList]
  );

  const handleDeleteAll = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (window.confirm("정말 전체 할 일을 다 삭제하시겠습니까?")) {
        setTodoList([]);
        setCheckList({});
        localStorage.setItem("todo", "");
      }
    },
    [setTodoList]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const element = inputRef.current;

      if (!element) {
        return;
      }
      const newId = totalId + 1;

      const newTodoList = todoList.concat({
        id: newId,
        title: element.value,
      });
      const newCheckList = { ...checkList };
      newCheckList[newId] = false;

      setTodoList(newTodoList);
      setCheckList(newCheckList);

      let storage = [];
      let local = localStorage.getItem("todo");
      if (local) {
        storage = JSON.parse(local);
      }

      storage.push({ id: newId, title: element.value });

      if (storage) {
        localStorage.setItem(`todo`, JSON.stringify(storage));
      }
      element.value = "";
      setTotalId((prev) => prev + 1);
    },
    [totalId, todoList, checkList, setTodoList]
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} placeholder="할 일 적으세여" />
        <button>등록</button>
      </form>
      <button onClick={handleDeleteAll}>전체 삭제!</button>
      <List
        checkList={checkList}
        onChangeChecked={handleChangeChecked}
        onDelete={handleDeleteItem}
      />
    </>
  );
};

export default TodoList;
