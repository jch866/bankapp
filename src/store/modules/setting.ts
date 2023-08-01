//小仓库:layout组件相关配置仓库
import { defineStore } from "pinia";
import { ref } from "vue";
const useLayOutSettingStore = defineStore("SettingStore", () => {
  let fold = ref<boolean>(false); //用户控制菜单折叠还是收起控制
  let refresh = ref<boolean>(false); //仓库这个属性用于控制刷新效果;
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
