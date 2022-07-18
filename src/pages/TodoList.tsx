import List from "components/Todo/List";
import { MouseEvent, useCallback, useRef, useState } from "react";

type CheckListType = {
  [key: number]: boolean;
};
let totalId: number = 1;

const TodoList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState([{ id: 1, title: "대충" }]);
  const [checkList, setCheckList] = useState<CheckListType>({ 1: false });

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
          element.value = "";
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
