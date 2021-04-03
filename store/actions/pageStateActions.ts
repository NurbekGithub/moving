import { pageEnums, store } from "../index";

export function changePage(page: pageEnums) {
  store.pageState = page;
}
