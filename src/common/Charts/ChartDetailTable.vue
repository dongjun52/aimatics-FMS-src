<template>
  <Table
    class="table_basic cursor_disable"
    row-keys="id"
    :loading="loading"
    :columns="columns"
    :data-source="tableData"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template #index="{ index }">
      {{ index + 1 + 10 * (pagination?.current - 1) }}
    </template>
  </Table>
</template>
<script lang="ts">
import Table from 'ant-design-vue/es/table';
import { defineComponent } from 'vue';

import { ChangePaginationType } from '@/types/common/ant-table';

export default defineComponent({
  name: 'ChartDetailTable',
  components: {
    Table,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['detailTableChange'],
  setup(props, { emit }) {
    const handleTableChange = (pag: ChangePaginationType) => {
      emit('detailTableChange', pag);
    };
    return { handleTableChange };
  },
});
</script>

<style scoped></style>
