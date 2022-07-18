import { MouseEvent, useCallback } from "react";
import { ItemContainer } from "./style";

type TodoList = {
  id: number;
  title: string;
};

type ItemProps = {
  item: TodoList;
  checked: boolean;
  onChangeChecked: (itemNo: number) => void;
};
const Item: React.FC<ItemProps> = ({ item, checked, onChangeChecked }) => {
  const handleClickCheckbox = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const element = e.target as Element;

      console.log(element.tagName);

      if (element.tagName === "BUTTON") {
        onChangeChecked(item.id);
      }
    },
    [onChangeChecked, item.id]
  );

  return (
    <ItemContainer>
      <div>{item.title}</div>
      <button onClick={handleClickCheckbox}>
        {checked ? "체크표시" : "빈칸"}
      </button>
    </ItemContainer>
  );
};

export default Item;
