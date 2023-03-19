<template>
  <p class="list_title mt60">Last Upload</p>
  <Table
    class="table_basic cursor_disable mt8"
    :data-source="dataSource"
    :columns="columns"
    :pagination="pagination"
  />
</template>

<script lang="ts">
import Table from 'ant-design-vue/es/table';
import { TablePaginationConfig } from 'ant-design-vue/lib/table/Table';
import {
  defineComponent,
  Ref,
  ref,
  toRefs,
  reactive,
  onMounted,
  computed,
} from 'vue';
import { useStore } from 'vuex';

interface dataType {
  Time: string;
  Latitude: string;
  Longitude: string;
}

interface stateType {
  fetchLastUploadListPayload: {
    variables: {
      startDate: string;
      endDate: string;
      serial: string;
      pageNum: number;
      pageSize: number;
    };
  };
  pagination: TablePaginationConfig;
}

export default defineComponent({
  name: 'LastUploadTable',
  components: {
    Table,
  },
  setup() {
    const serial = computed(() => store.state.device.selectedDeviceInfo.serial);

    const state = reactive<stateType>({
      fetchLastUploadListPayload: {
        variables: {
          startDate: '2022-07-01',
          endDate: '2022-07-30',
          serial: '_JSPARK_U3', //serial.value
          pageNum: 1,
          pageSize: 10,
        },
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: false,
        'onUpdate:current': (current: number): void => {
          state.pagination.current = current;
        },
        position: ['bottomCenter'],
      },
    });

    const store = useStore();

    onMounted(() => {
      fetchLastUploadList();
    });

    const fetchLastUploadList = async () => {
      await store.dispatch(
        'dca/fetchLastUploadList',
        state.fetchLastUploadListPayload.variables
      );
    };

    const dataSource = computed(
      () => store.state.dca.lastUploadListVariables.lastUploadLists
    );

    return {
      dataSource,
      ...toRefs(state),
      columns: [
        {
          title: 'Time',
          dataIndex: 'time',
          width: '33%',
        },
        {
          title: 'Latitude',
          dataIndex: 'latitude',
          key: 'latitude',
          width: '33%',
        },
        {
          title: 'Longitude',
          dataIndex: 'longitude',
          key: 'longitude',
          width: '33%',
        },
      ],
    };
  },
});
</script>

<style scoped></style>
