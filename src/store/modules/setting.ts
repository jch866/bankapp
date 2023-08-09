//小仓库:layout组件相关配置仓库
import { defineStore } from "pinia";
import { ref } from "vue";
const useLayOutSettingStore = defineStore("SettingStore", () => {
  let fold = ref<boolean>(false);
  let refresh = ref<boolean>(false);
  function changeFold() {
    fold.value = !fold.value;
  }
  function changeRefresh() {
    refresh.value = !refresh.value;
  }
  return {
    fold,
    refresh,
    changeFold,
    changeRefresh,
  };
});

export default useLayOutSettingStore;
