import List from "components/Todo/List";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

type CheckListType = {
  [key: number]: boolean;
};
let totalId: number = 1;

const TodoList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState([{ id: 1, title: "대충" }]);
  const [checkList, setCheckList] = useState<CheckListType>({ 1: false });

  useEffect(() => {
    const localTodoList = localStorage.getItem("todo");

    if (!localTodoList) {
      return;
    }
    const parseLocalStorage = JSON.parse(localTodoList);

    const localTodoListLen = parseLocalStorage.length;
    const lastIndex = parseLocalStorage[localTodoListLen - 1].id;

    totalId = lastIndex;
    setTodoList(parseLocalStorage);
  }, []);

  const handleChangeChecked = useCallback((itemNo: number) => {
    setCheckList((prev) => {
      prev[itemNo] = !prev[itemNo];

      return { ...prev };
    });
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const element = inputRef.current;

          if (!element) {
            return;
          }

          setTodoList((prev) => [
            ...prev,
            { id: totalId + 1, title: element.value },
          ]);
          setCheckList((prev) => {
            const itemNo: number = totalId + 1;
            prev[itemNo] = false;
            return prev;
          });
          console.log(element.value);
          let storage = [];
          let local = localStorage.getItem("todo");
          if (local) {
            storage = JSON.parse(local);
          }

          /**@TODO 추가했을때 title 안나오는 현상 수정하기 */
          storage.push({ id: totalId + 1, title: element.value });

          if (storage) {
            localStorage.setItem(`todo`, JSON.stringify(storage));
          }
          element.value = "";
          totalId += 1;
        }}
      >
        <input ref={inputRef} placeholder="할 일 적으세여" />
        <button>얍</button>
      </form>
      <List
        todoList={todoList}
        checkList={checkList}
        onChangeChecked={handleChangeChecked}
      />
    </>
  );
};

export default TodoList;
