import React from "react"
import { Data } from "../../interfaces/data";
import { asygetDataByRing } from "../../services/ring";

const useFilterItem = () => {
    const [selectedItems, setselectedItems] = React.useState<string[]>([]);
    const [filteredData, setFilteredData] = React.useState<Data | null>(null);
  
    const getFilteredData = React.useCallback(async () => {
      const getDataByRing = await asygetDataByRing(selectedItems);
      setFilteredData(getDataByRing);
    }, [selectedItems]);
  
    React.useEffect(() => {
      getFilteredData();
    }, [selectedItems, getFilteredData]);


    return { filteredData, setselectedItems };
}

export default useFilterItem;