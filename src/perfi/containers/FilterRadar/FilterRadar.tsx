import React, { useCallback, useEffect, useState } from "react";

import { Item } from "../../../model";
import "./filterRadar.scss";
import FilterIcon from "../../components/FilterIcon/FilterIcon";
import ModalCheckbox, { CheckBoxItem } from "../../components/ModalCheckbox/ModalCheckbox";


type ItemModified = Item & {
  hub?: string[];
}

type FilterProps = {
  items: ItemModified[];
  onChange: (items: string[]) => void;
};

export default React.forwardRef((props: FilterProps, ref) => {
  return FilterRadar(props, ref);
});

function FilterRadar({ items, onChange }: FilterProps, ref: any) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [checkBoxItems, setCheckBoxItems] = useState<CheckBoxItem[]>([]);

  const mapByItemToArray = useCallback(() => (): CheckBoxItem[] => {
    const arrayItems =  items.map(elem => elem.hub ? elem.hub.map(elem2 => elem2): []).flat();
    const noRepeatItems = Array.from(new Set(arrayItems));
    const uniqueItems = noRepeatItems.map(elem => ({name: elem, value: elem, checked: false}));
    return uniqueItems;
  },[items])

  
  useEffect(() => {
    setCheckBoxItems(mapByItemToArray());
  },[items, mapByItemToArray]);

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
