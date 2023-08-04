import { defineStore } from "pinia";
import {
  set_tags,
  get_tags,
  set_activePath,
  get_activePath,
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
  // tranx: string,
}
const useHeadTagsStore = defineStore("headTagsStore", {
  state: (): stateDataType => {
    return {
      cache_tags: [],
      activePath: get_activePath() || "/",
      openNames: [],
      // activeName: "",
      // tranx: "-0",
      tagsList: get_tags() || [
        { path: "/", name: "首页" },
        // { path: '/acl/user', label: '用户管理', name: '用户管理' },
        // { path: '/product/trademark', label: '品牌管理', name: '品牌管理' }
      ],
    };
  },
  actions: {
    clearTags() {
      this.cache_tags = [];
      this.activePath = "/";
      this.openNames = [];
      // this.activeName = ""
      // this.tranx = "-0"
      this.tagsList = [{ path: "/", name: "home" }];
    },
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
    // 添加keepalive缓存
    addKeepAliveCache(val: string) {
      if (val === "/") {
        return;
      }
      if (this.cache_tags.indexOf(val) === -1) {
        this.cache_tags.push(val);
        console.log(this.cache_tags);
      }
    },
    // 删除keepalive缓存
    removeKeepAliveCache(val: string) {
      let cache = this.cache_tags;

      for (let i = 0; i < cache.length; i++) {
        if (cache[i] === val) {
          cache.splice(i, 1);
        }
      }
      this.cache_tags = cache;
      console.log(this.cache_tags);
    },
    // setTranx(val: string) {
    //     console.log(val)
    //     this.tranx = val
    // },
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
