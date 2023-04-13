import React, { useEffect } from "react";

import { Item } from "../../../model";
import "./filterRadar.scss";

type FilterProps = {
  items: Item[];
  onChange: (items: string[]) => void;
};

export default React.forwardRef((props: FilterProps, ref) => {
  return FilterRadar(props, ref);
});

function FilterRadar({ items, onChange }: FilterProps, ref: any) {
  const getOnlyRings = () => {
    const getRings = items.map((elem) => elem.ring);
    const uniqueRings = Array.from(new Set(getRings));
    return uniqueRings;
  };

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedOptions);
  };

  return (
    <select multiple value={selectedOptions} onChange={handleSelectChange}>
      {getOnlyRings().map((elem) => (
        <option value={elem} key={elem}>
          {elem}
        </option>
      ))}
    </select>
  );
}
