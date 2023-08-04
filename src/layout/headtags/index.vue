<template>
  <div class="layout_headtags">
    <template v-for="(tag, index) in headTagsStore.tagsList" :key="tag.name">
      <div class="tag_box">
        <el-tag
          :closable="tag.path != '/'"
          @click.native="changeMenu(tag)"
          @close="closeTag(tag, index)"
          type=""
          :class="{ 'tags-item-active': headTagsStore.activePath === tag.path }"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useHeadTagsStore from "@/store/modules/tags";
const headTagsStore = useHeadTagsStore();
const $router = useRouter();
function changeMenu(item: any) {
  var oldActivePath = headTagsStore.activePath;
  if (oldActivePath === item.path) {
    return;
  }
  headTagsStore.changeMenu(item);
  $router.push({ path: item.path });
}
function closeTag(tag: any, index: number) {
  let oldOpenNames = headTagsStore.openNames,
    // oldActiveName = headTagsStore.activeName,
    oldActivePath = headTagsStore.activePath,
    oldTagsList = headTagsStore.tagsList;
  let length = oldTagsList.length - 1;
  for (let i = 0; i < oldTagsList.length; i++) {
    let item = oldTagsList[i];
    if (item.path === tag.path) {
      oldTagsList.splice(i, 1);
    }
  }
  // 删除keepAlive缓存
  // headTagsStore.removeKeepAliveCache(tag.path)
  //   if (tag.path !== oldActivePath) {
  //     return;
  //   }
  if (length === 1) {
    headTagsStore.closeTab({
      activePath: "/",
      tagsList: oldTagsList,
      cache_tags: headTagsStore.cache_tags,
    });

    $router.push({ path: oldTagsList[0].path });
    return;
  }
  if (index === length) {
    oldActivePath = oldTagsList[index - 1].path;
    oldOpenNames = [oldTagsList[index - 1].subName as string];
    // oldActiveName =
    //     oldTagsList[index - 1].subName + "-" + oldTagsList[index - 1].index;
    headTagsStore.closeTab({
      activePath: oldActivePath,
      tagsList: oldTagsList,
      openNames: oldOpenNames,
      // activeName: oldActiveName,
      cache_tags: headTagsStore.cache_tags,
    });
    $router.push({ path: oldTagsList[index - 1].path });
  } else {
    oldActivePath = oldTagsList[index].path;
    oldOpenNames = [oldTagsList[index].subName as string];
    // oldActiveName =
    //     oldTagsList[index].subName + "-" + oldTagsList[index].index;
    headTagsStore.closeTab({
      activePath: oldActivePath,
      tagsList: oldTagsList,
      openNames: oldOpenNames,
      // activeName: oldActiveName,
      cache_tags: headTagsStore.cache_tags,
    });
    $router.push({ path: oldTagsList[index].path });
  }
}
</script>

<style lang="scss" scoped>
.layout_headtags {
  height: $base-head-tags-height;
  border-bottom: 1px solid #dae0e6;
  display: flex;
  align-items: center;
  & .tag_box {
    margin: 2px 3px;
    cursor: pointer;
  }
}

.tags-item-active {
  background-color: $base-menu-background;
  color: #fff;
  border-color: $base-menu-background;

  &::before {
    content: "";
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 2px;
  }
}
</style>
