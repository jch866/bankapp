import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import { loginForm } from "@/api/user/type";
import { SET_TOKEN, GET_TOKEN } from "@/utils/util";
interface UserState {
  token: string | null;
}
const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      let result = await reqLogin(data);
      console.log(result);
      if (result.code === 200) {
        this.token = result.data.token;
        SET_TOKEN(result.data.token);
      } else {
      }
    },
  },
  getters: {},
});

export default useUserStore;
