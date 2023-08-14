<template>
  <div class="bank-pagination">
    <el-pagination
      :background="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageObj.page"
      :page-sizes="pageObj.pageCount || defaultNum"
      :page-size="pageObj.pageSize"
      :layout="paginationLayout"
      :total="pageObj.total"
    />
    <!-- :hide-on-single-page="true" 单页隐藏 -->
  </div>
</template>

<script setup lang="ts">
const $emit = defineEmits(["pageChange"]);
const defaultNum = [10, 20, 50, 100];
const props = defineProps({
  pageObj: {
    required: true,
    type: Object,
    default() {
      return {
        page: 1,
        pageCount: [10, 20, 50, 100],
        pageSize: 20,
        showTotal: true,
      };
    },
  },
});
const paginationLayout = `${
  props.pageObj.showTotal ? "total" : ""
}, prev, pager, next, jumper,sizes `;

const handleSizeChange = (val: any) => {
  props.pageObj.page = 1;
  props.pageObj.pageSize = val;
  emitChange(props.pageObj);
};
const handleCurrentChange = (val: any) => {
  props.pageObj.page = val;
  emitChange(props.pageObj);
};
const emitChange = (obj: any) => {
  $emit("pageChange", obj);
};
</script>
<script lang="ts">
export default {
  name: "Pagination",
};
</script>
<style scoped lang="scss">
.bank-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
