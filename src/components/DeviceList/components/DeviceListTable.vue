<template>
  <div class="contents">
    <p class="list_title">Device List</p>

    <p class="table_description mt10">{{ totalElements }} devices</p>

    <Table
      row-key="serial"
      class="table_basic mt8"
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      :custom-row="customRow"
      :row-class-name="rowClassName"
      @change="onChangeTable"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'devicesId'">
          {{ index + 1 + pagination.pageSize * (pagination?.current - 1) }}
        </template>

        <template v-if="column.key === 'isConnected'">
          <span :class="record.status ? 'ft_blueL' : 'ft_gray'">
            {{ record.status ? 'ON' : 'OFF' }}
          </span>
        </template>

        <!-- {{ column }}
        {{ record }} -->
        <!-- <template> {{ devicesId }} </template> -->
        <!-- OFF 일때만 ft_gray 클래스 적용 -->
        <!-- <span class="ft_gray">{{ text }}</span> -->
        <!-- {{ devicesId }} -->
      </template>
      <!-- <template v-slot:bodyCell="{ status }">
        {{ status }}
      </template> -->
      <!-- <template v-slot:footer="{ index }">
        {{ index }}
      </template> -->
    </Table>
  </div>
</template>

<script lang="ts">
import Table from 'ant-design-vue/es/table';
import { defineComponent, toRefs, reactive, computed, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import type { RootState } from '@/store';
import { Condition } from '@/types/common/variables';
import type { Filters, Sorter } from '@/types/common/ant-table';
import type {
  TablePaginationConfig,
  TableProps,
} from 'ant-design-vue/es/table';

import type {
  DeviceListContent,
  FetchDeviceListPayload,
} from '@/types/service/device/device';
import {
  DeviceStoreState,
  MutationTypes as DeviceMutations,
} from '@/store/modules/service/device/device';
import { ROUTE_NAMES } from '@/constants/common';
import { ColumnsType } from 'ant-design-vue/es/vc-table/interface';
import { ColumnGroupType } from 'ant-design-vue/lib/table/interface';

type TableType = TableProps<DeviceListContent>;

interface DeviceListState {
  fetchDeviceListPayload: FetchDeviceListPayload;
  pagination: TablePaginationConfig;
  sorter: {
    order: string;
    by: string;
  };
}

export default defineComponent({
  name: 'DeviceList',
  components: {
    Table,
  },
  setup() {
    const router = useRouter();
    const store = useStore<RootState>();
    const dataSource = computed(() => store.state.device.deviceLists);
    const totalElements = computed(() => store.state.device.totalElements);

    const selectedDeviceInfo = computed(
      () => store.state.device.selectedDeviceInfo
    );

    const user = computed(() => store.state.auth.user);

    const state = reactive<DeviceListState>({
      fetchDeviceListPayload: {
        variables: {
          partnersIds: user.value.partnerIds,
          keyword: undefined,
          pageNum: 1,
          pageSize: 10,
          condition: {
            sort: null,
            filters: null,
          },
        },
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        position: ['bottomCenter'],
        pageSizeOptions: ['10', '30', '50'],
      },
      sorter: {
        order: undefined,
        by: undefined,
      },
    });

    const filteredModel = ref([]);
    const filteredStatus = ref([]);
    const sortedInfo = ref({
      columnKey: '',
      order: '',
    });

    const fetchDeviceList = async (keyword?: string): Promise<void> => {
      const payload: FetchDeviceListPayload = {
        variables: {
          ...state.fetchDeviceListPayload.variables,
          keyword: keyword || '',
        },
      };
      await store.dispatch('device/fetchDeviceList', payload);
    };

    const rowClassName = (record: DeviceListContent): string => {
      if (
        selectedDeviceInfo.value.rowPage === state.pagination.current &&
        record.serial === selectedDeviceInfo.value.serial
      ) {
        return 'table_row_select';
      }
      return '';
    };

    const customRow: TableType['customRow'] = (record, index) => {
      return {
        onClick: async () => {
          store.commit('device/' + DeviceMutations.SET_SELECTED_DEVICE_INFO, {
            rowIndex: index,
            rowPage: state.pagination.current,
            serial: record.serial,
            sort: state.fetchDeviceListPayload.variables.condition.sort,
            filteredValue:
              state.fetchDeviceListPayload.variables.condition.filters,
          } as DeviceStoreState['selectedDeviceInfo']);
          router.push({
            name: ROUTE_NAMES.PLAYLIST,
            query: {
              serial: record.serial,
            },
          });
        },
      };
    };

    const onChangeTable = async (
      pag,
      filters: Filters,
      sorter: Sorter
    ): Promise<void> => {
      const { pageSize, current } = pag;
      const { order, column } = sorter;
      let params = {
        pageNum: current,
        pageSize,
        sort: {
          order: column !== undefined ? column.key : undefined,
          by: typeof order === 'string' ? order : undefined,
        },
      };
      const isSort: boolean =
        state.sorter?.order !== params.sort.order ||
        state.sorter?.by !== params.sort.by;

      if (isSort) {
        params = {
          ...params,
          pageNum: 1,
        };
      }

      if (state.pagination.pageSize !== pageSize) {
        params = {
          ...params,
          pageNum: 1,
        };
      }

      if (params.sort.order === undefined && params.sort.by === undefined) {
        params = {
          ...params,
          sort: null,
        };
      }

      state.fetchDeviceListPayload = {
        variables: {
          ...state.fetchDeviceListPayload.variables,
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          condition: {
            sort: params.sort,
            filters: getConditionFilters(filters),
          },
        },
      };
      await fetchDeviceList();

      //set payload
      state.pagination.pageSize = params.pageSize;
      state.pagination.current = params.pageNum;
      state.sorter = params.sort;
      sortedInfo.value = sorter;
    };

    const getConditionFilters = (
      filters: Filters
    ): Condition['filters'] | undefined => {
      const filterList: Condition['filters'] = [];
      Object.entries(filters).map(([key, value]) => {
        if (value && value.length > 0) {
          const valueKey =
            typeof value[0] === 'string' ? 'valueList' : 'valueIntList';
          filterList.push({
            name: key,
            [valueKey]: value,
          });
        } else {
          filteredModel.value = [];
        }
      });

      if (filterList.length > 0) {
        filterList.map((row) => {
          if (row?.valueList) {
            const setValue = new Set(row.valueList);
            filteredModel.value = [...setValue];
          }
          if (row?.valueIntList) {
            const setValue = new Set(row.valueIntList);
            filteredStatus.value = [...setValue];
          }
        });
      } else {
        filteredModel.value = null;
        filteredStatus.value = null;
      }
      return filterList.length > 0 ? filterList : undefined;
    };

    watch(
      () => selectedDeviceInfo.value,
      (selectedDeviceInfo) => {
        if (selectedDeviceInfo) {
          const { rowPage, sort, filteredValue } = selectedDeviceInfo;

          if (sort) {
            sortedInfo.value.columnKey = sort.order;
            sortedInfo.value.order = sort.by;
            state.sorter.order = sort.order;
            state.sorter.by = sort.by;
          }

          if (filteredValue) {
            filteredValue.map((row) => {
              if (row?.valueList) {
                const setValue = new Set(row.valueList);
                filteredModel.value = [...setValue];
              }
              if (row?.valueIntList) {
                const setValue = new Set(row.valueIntList);
                filteredStatus.value = [...setValue];
              }
            });
          }

          state.pagination.current = selectedDeviceInfo.rowPage;

          state.fetchDeviceListPayload.variables = {
            ...state.fetchDeviceListPayload.variables,
            pageNum: rowPage,
            condition: {
              sort: sort,
              filters: filteredValue,
            },
          };
        }
      },
      {
        immediate: true,
      }
    );

    watch(
      () => totalElements.value,
      (totalElements) => {
        state.pagination.total = totalElements;
      }
    );

    const columns = computed<ColumnsType<any>>(() => {
      const sorter = sortedInfo.value;
      const setColumns = [
        {
          title: 'NO',
          dataIndex: 'devicesId',
          key: 'devicesId',
          width: '15%',
        },
        {
          title: 'Serial number',
          dataIndex: 'serial',
          key: 'serial',
          width: '15%',
          className: 'font_bold',
          sorter: true,
          sortOrder: sorter.columnKey === 'serial' && sorter.order,
        },
        {
          title: 'Device model',
          dataIndex: 'deviceModel',
          key: 'deviceModelName',
          width: '15%',
          filteredValue: filteredModel.value,
          filters: [
            { text: 'R8', value: 'R8' },
            { text: 'R9', value: 'R9' },
          ],
          // onFilter: (value: string, record: DeviceListContent) => {
          //   record.deviceModel.includes(value);
          //   console.log('value', value);
          // },
        },
        {
          title: 'Last update',
          dataIndex: 'lastLogDate',
          key: 'lastLogDate',
          width: '20%',
          sorter: true,
          sortOrder: sorter.columnKey === 'lastLogDate' && sorter.order,
        },
        {
          title: 'Install date',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          width: '20%',
          sorter: () => null,
          sortOrder: sorter.columnKey === 'updatedAt' && sorter.order,
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'isConnected',
          width: '15%',
          filteredValue: filteredStatus.value,
          filters: [
            {
              text: 'ON',
              value: 1,
            },
            {
              text: 'OFF',
              value: 0,
            },
          ],
        },
      ];
      return setColumns;
    });
    return {
      ...toRefs(state),
      dataSource,
      onChangeTable,
      customRow,
      rowClassName,
      fetchDeviceList,
      totalElements,
      columns: columns,
    };
  },
});
</script>

<style lang="scss" scoped></style>
