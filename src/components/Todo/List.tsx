import { MouseEvent } from "react";
import Item from "./Item";

type TodoList = {
  id: number;
  title: string;
};

type CheckListType = {
  [key: number]: boolean;
};

type ListProps = {
  todoList: TodoList[];
  checkList: CheckListType;
  onChangeChecked: (itemNo: number) => void;
};

const List: React.FC<ListProps> = ({
  todoList,
  checkList,
  onChangeChecked,
}) => {
  return (
    <div>
      {todoList.map((todo) => (
        <Item
          key={todo.id}
          item={todo}
          checked={checkList[todo.id]}
          onChangeChecked={onChangeChecked}
        />
      ))}
    </div>
  );
};

export default List;
