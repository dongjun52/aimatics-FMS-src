<template>
  <Spin :spinning="isLoading">
    <div class="contents">
      <p class="list_title">Auto Upload Setting</p>
      <p class="table_description mt10">{{ pagination.total }} groups</p>
      <Table
        class="table_basic mt15"
        :data-source="dataSource"
        :columns="columns"
        :custom-row="customRow"
        :pagination="pagination"
        @change="onChangeTable"
      >
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key === 'index'">
            {{ index + 1 + pagination.pageSize * (pagination.current - 1) }}
          </template>
        </template>
      </Table>
    </div>
  </Spin>

  <Modal
    v-model:visible="isShowUploadSettingModal"
    class="contents_modal"
    centered
    :destroy-on-close="true"
    width="65%"
    :title="selectedRow?.companyName"
  >
    <UploadSettingModal @close="isShowUploadSettingModal = false" />
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onBeforeMount, watch } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store';
import type {
  FetchOndemandGroupsPayload,
  OndemandGroupsContent,
} from '@/types/service/setting/uploadSetting';
import type {
  TablePaginationConfig,
  TableProps,
} from 'ant-design-vue/es/table';
import {
  MODULE_PATH,
  ActionTypes as UploadSettingActions,
} from '@/store/modules/service/setting/uploadSetting';
import Spin from '@/common/Spin/Spin.vue';
import Modal from 'ant-design-vue/es/modal';
import Table from 'ant-design-vue/es/table';
import UploadSettingModal from './UploadSettingModal.vue';

type TableType = TableProps<OndemandGroupsContent>;

export default defineComponent({
  name: 'UploadSetting',
  components: {
    Table,
    Modal,
    UploadSettingModal,
    Spin,
  },
  setup() {
    const { state, dispatch } = useStore<RootState>();
    const dataSource = computed(() => state.uploadSetting.ondemandGroups);
    const totalElements = computed(() => state.uploadSetting.totalElements);
    const isLoading = computed(() => state.uploadSetting.isLoading);
    const partnerIds = computed(() => state.auth.user.partnerIds);
    const isShowUploadSettingModal = ref(false);
    const selectedRow = ref<OndemandGroupsContent>(null);

    const pagination = ref<TablePaginationConfig>({
      total: totalElements.value,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      'onUpdate:current': (current: number): void => {
        pagination.value.current = current;
      },
      position: ['bottomCenter'],
      pageSizeOptions: ['10', '30', '50'],
    });

    const fetchOndemandGroupsPayload = computed<FetchOndemandGroupsPayload>(
      () => {
        return {
          variables: {
            partnerIds: partnerIds.value,
            pageNo: pagination.value.current,
            pageSize: pagination.value.pageSize,
          },
        };
      }
    );

    onBeforeMount(async (): Promise<void> => {
      await fetchOndemandGroups();
    });

    watch(
      () => totalElements.value,
      (total) => {
        pagination.value.total = total;
      }
    );

    async function fetchOndemandGroups(): Promise<void> {
      await dispatch(
        MODULE_PATH + UploadSettingActions.FETCH_ONDEMAND_GROUPS,
        fetchOndemandGroupsPayload.value
      );
    }

    const customRow: TableType['customRow'] = (row, index) => {
      return {
        onClick: async () => {
          selectedRow.value = row;
          isShowUploadSettingModal.value = true;

          await dispatch(
            MODULE_PATH + UploadSettingActions.FETCH_ONDEMAND_SETTING
          );
        },
      };
    };

    const onChangeTable: TableType['onChange'] = async (pag): Promise<void> => {
      const { current, pageSize } = pag;
      const params = { current, pageSize };
      const isChangePageSize = pagination.value.pageSize !== pag.pageSize;

      if (isChangePageSize) {
        params.current = 1;
      }

      pagination.value.pageSize = params.pageSize;
      pagination.value.current = params.current;

      await fetchOndemandGroups();
    };

    return {
      isLoading,
      dataSource,
      pagination,
      selectedRow,
      customRow,
      isShowUploadSettingModal,
      onChangeTable,
      columns: [
        {
          title: 'No',
          dataIndex: 'index',
          key: 'index',
          width: '10%',
        },
        {
          title: 'Company',
          dataIndex: 'companyName',
          width: '70%',
          className: 'font_bold',
        },
        {
          title: 'Devices',
          dataIndex: 'deviceCnt',
          width: '20%',
        },
      ],
    };
  },
});
</script>

<style scoped></style>
