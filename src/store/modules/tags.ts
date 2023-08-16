import { defineStore } from "pinia";
import {
  set_tags,
  get_tags,
  set_activePath,
  get_activePath,
  default_activePath,
  default_activeName,
} from "@/utils/util";
interface tagsListType {
  path: string;
  name: string;
  // label: string,
  index?: string | number;
  subName?: string;
}
interface stateDataType {
  activePath: string; //当前高亮tag
  tagsList: tagsListType[];
  cache_tags: string[];
  openNames?: string[];
  // activeName?: string,
}
const useHeadTagsStore = defineStore("headTagsStore", {
  state: (): stateDataType => {
    return {
      cache_tags: [],
      activePath: get_activePath() || default_activePath,
      openNames: [],
      // activeName: "",
      tagsList: get_tags() || [
        { path: default_activePath, name: default_activeName },
      ],
    };
  },
  actions: {
    // 跳转页面执行
    selectMenu(submenu: any) {
      var activePath = submenu.path;
      var oldtagsList = this.tagsList;
      var result = oldtagsList.some((item) => {
        if (item.path === activePath) {
          return true;
        }
      });
      if (!result) {
        oldtagsList.push({
          path: submenu.path,
          name: submenu.name,
          // label: submenu.label,
          // index: submenu.index,
          // subName: submenu.subName
        });
      }
      this.activePath = activePath;
      this.tagsList = oldtagsList;
      set_tags(this.tagsList);
      set_activePath(this.activePath);
      // this.activeName = submenu.subName + "-" + submenu.index
      // this.openNames = [submenu.subName]
    },

    //关闭菜单
    closeTab(val: stateDataType) {
      this.activePath = val.activePath;
      this.tagsList = val.tagsList;
      this.openNames = val.openNames;
      // this.activeName = val.activeName
      set_tags(val.tagsList);
      set_activePath(this.activePath);
    },
    // 点击标签选择菜单
    changeMenu(val: tagsListType) {
      this.activePath = val.path;
      set_activePath(this.activePath);
      // this.activeName = val.subName + "-" + val.index
      // this.openNames = [val.subName as string]
    },
  },
});

export default useHeadTagsStore;
