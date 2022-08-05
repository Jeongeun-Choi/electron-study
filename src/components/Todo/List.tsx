import { useRecoilValue } from "recoil";
import { TodoListState } from "recoil/todo.state";
import Item from "./Item";

type TodoList = {
  id: number;
  title: string;
};

type CheckListType = {
  [key: number]: boolean;
};

type ListProps = {
  checkList: CheckListType;
  onChangeChecked: (itemNo: number) => void;
  onDelete: (itemNo: number) => void;
};

const List: React.FC<ListProps> = ({
  checkList,
  onChangeChecked,
  onDelete,
}) => {
  const todoList = useRecoilValue(TodoListState);

  return (
    <div>
      {todoList.map((todo) => (
        <Item
          key={todo.id}
          item={todo}
          checked={checkList[todo.id]}
          onChangeChecked={onChangeChecked}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default List;
