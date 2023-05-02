import { publicUrl } from "../../config";
import { Data } from "../interfaces/data";

export async function asygetDataByRing(rings: string[]): Promise<Data> {
  const url: string = `${publicUrl}${process.env.REACT_APP_JSON}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const data: Data = await response.json();

  return rings.length === 0
    ? data
    : { ...data, items: data.items.filter((ele) => rings.includes(ele.ring)) };
}
