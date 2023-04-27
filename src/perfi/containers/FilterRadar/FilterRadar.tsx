import React, { useCallback, useEffect, useState } from "react";

import { Item } from "../../../model";
import "./filterRadar.scss";
import FilterIcon from "../../components/FilterIcon/FilterIcon";
import ModalCheckbox, { CheckBoxItem } from "../../components/ModalCheckbox/ModalCheckbox";

type FilterProps = {
  items: Item[];
  onChange: (items: string[]) => void;
};

export default React.forwardRef((props: FilterProps, ref) => {
  return FilterRadar(props, ref);
});

function FilterRadar({ items, onChange }: FilterProps, ref: any) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [checkBoxItems, setCheckBoxItems] = useState<CheckBoxItem[]>([]);


  const mapItems = useCallback(() => {
    const unique:any = {};
    const uniqueItems: Item[] = items.filter(obj => !unique[obj.ring] && (unique[obj.ring] = true));
    const result: CheckBoxItem[] = uniqueItems.map(elem => ({name: elem.ring, value: elem.ring, checked: false}));
    setCheckBoxItems(result);
  },[items]);
  

  useEffect(() => {
    mapItems();
  },[items, mapItems]);

  const handleCloseModal = () => setIsOpenModal(false);
  const handleOpenModal = () => setIsOpenModal(true);

  const getOnlyItems = (elements: CheckBoxItem[]): string[] => {
    const getItems = elements.filter(elem => elem.checked === true).map(elem => elem.name);
    return getItems;
  };

  const handleChangeModal = (item: CheckBoxItem) => {
    const elements: CheckBoxItem[] = checkBoxItems.map(elem => {
      if(elem.name === item.name) {
        return {...elem, checked: !elem.checked}
      }
      return elem;
    });
    setCheckBoxItems(elements);
    onChange(getOnlyItems(elements));
  }

  return (
    <>
      <FilterIcon click={handleOpenModal} />
      <ModalCheckbox
        closeModal={handleCloseModal}
        isOpen={isOpenModal}
        items={checkBoxItems}
        handleChange={(item: CheckBoxItem) => handleChangeModal(item)}
      />
    </>
  );
}
