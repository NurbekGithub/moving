import axios from "axios";

export function getMapData(value) {
  console.log("rttrrtrtrtrrtrtrtrttrrtttrtr");
  console.log({ value });
  if (value) {
    const data = `Нур-Султан ${value}`;
    return axios
      .get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=922688b0-ec1e-4fe7-92f7-deea83d01c3d&format=json&geocode=${data}&results=5`
      )
      .then((res) => res.data);
  } else {
    [];
  }
}

export function getStreetData() {
  return axios
    .get(
      `https://geocode-maps.yandex.ru/1.x/?apikey=922688b0-ec1e-4fe7-92f7-deea83d01c3d&format=json&geocode=Ивановка&ll=37.618920,55.756994&spn=3.552069,2.400552`
    )
    .then((res) => res.data);
}
