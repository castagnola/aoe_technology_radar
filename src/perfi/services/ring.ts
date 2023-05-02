import { publicUrl } from "../../config";
import { Item } from "../../model";

type ItemModified = Item & {
  hub?: string[];
}

type DataModified = {
  items: ItemModified[];
  releases: string[];
}

function hubExists(arr1: string[], arr2:string[]) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      return true;
    }
  }
  return false;
}

export async function asygetDataByRing(hubs: string[]): Promise<DataModified> {
  const url: string = `${publicUrl}${process.env.REACT_APP_JSON}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const data: DataModified = await response.json();

  return hubs.length === 0
    ? data
    : { ...data, items: data.items.filter((ele) => ele.hub ? hubExists(ele.hub, hubs) : false) };
}
