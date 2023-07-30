export const SET_TOKEN = (token: string) => {
  window.localStorage.setItem("TOKEN", token);
};
export const GET_TOKEN = () => {
  return window.localStorage.getItem("TOKEN");
};
