import { MouseEvent, useCallback } from "react";
import { ItemButton, ItemContainer, ItemTitle } from "./style";

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

  // const handleClickTrash = useCallback(() => {

  // }, []);

  return (
    <ItemContainer>
      <ItemTitle isCheck={checked}>{item.title}</ItemTitle>
      <ItemButton onClick={handleClickCheckbox}>
        {checked ? "✅" : "🟩"}
      </ItemButton>
      {/* <ItemButton>🗑</ItemButton> */}
    </ItemContainer>
  );
};

export default Item;
