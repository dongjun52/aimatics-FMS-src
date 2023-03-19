<template class="templateBackground">
  <Modal
    v-model:visible="isShowSearch"
    class="contents_modal"
    centered
    title="주소 검색"
    width="38%"
    :destroy-on-close="true"
    :after-close="onCloseSearch"
  >
    <Tooltip
      :visible="isError"
      :title="errorMessage"
      color="#f85656"
      placement="bottomLeft"
    >
      <Search
        ref="addressSearch"
        enter-button
        v-model:value.trim="keyword"
        class="input_basic"
        placeholder="검색할 주소를 입력해주세요"
        @keypress.enter="onSearchAddress"
        @search="onSearchAddress"
      />
    </Tooltip>
    <br />

    <Spin :spinning="isSearch">
      <div class="fixed_table_height">
        <table
          class="table-style"
          v-for="(item, index) in list"
          :key="index"
          @click="onClickTable(item.roadName)"
        >
          <tr>
            <td rowspan="2" class="zipcode">[{{ item.zipCode }}]</td>
            <td>{{ item.groundName }}</td>
          </tr>
          <tr>
            <td>{{ item.roadName }}</td>
          </tr>
        </table>
      </div>
    </Spin>
    <br />

    <div class="fixed_page_height">
      <Pagination
        v-if="total && total > 0"
        v-model:current="currentPage"
        v-model:page-size="pageSize"
        v-model:total="total"
        style="text-align: center"
      />
    </div>
  </Modal>
</template>

<script lang="ts">
import Input from 'ant-design-vue/es/input';
import Modal from 'ant-design-vue/es/modal';
import Pagination from 'ant-design-vue/es/pagination';
import Spin from 'ant-design-vue/es/spin';
import Tooltip from 'ant-design-vue/es/tooltip';
import Axios from 'axios';
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';

const { Search } = Input;

interface SearchOptionsState {
  confmKey: string;
  currentPage: number;
  countPerPage: number;
  keyword: string;
  resultType: string;
  isSearch: boolean;
}

export default defineComponent({
  name: 'SearchAddress',
  emits: ['onChangeAddr1', 'close'],
  components: {
    Modal,
    Search,
    Pagination,
    Spin,
    Tooltip,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const addressSearch = ref();
    const url = 'https://www.juso.go.kr/addrlink/addrLinkApi.do';
    const isShowSearch = ref<boolean>(true);

    const searchOptions = reactive<SearchOptionsState>({
      confmKey: 'U01TX0FVVEgyMDIxMDczMDE0Mjc0NjExMTQ3MjQ=',
      currentPage: 1,
      countPerPage: 10,
      keyword: '',
      resultType: 'json',
      isSearch: false,
    });

    const address = reactive<{
      list: any[];
      total: number | undefined;
      pageSize: number;
      isError: boolean;
      errorMessage: string | undefined;
    }>({
      list: [],
      total: 0,
      pageSize: 10,
      isError: false,
      errorMessage: '',
    });

    const onSearchAddress = () => {
      searchOptions.currentPage = 1;
      searchOptions.isSearch = true;
    };

    const onClickTable = (roadName: string) => {
      isShowSearch.value = false;
      emit('onChangeAddr1', 'addr1', roadName);
    };

    const onCloseSearch = () => {
      emit('close');
    };

    watch(addressSearch, (dom: any) => {
      if (dom) {
        dom.focus();
      }
    });

    watch(
      () => [searchOptions.isSearch, searchOptions.currentPage],
      () => {
        address.list = [];

        Axios.get(url, {
          params: searchOptions,
        })
          .then((response: any) => {
            const errorCode = response.data.results.common.errorCode;
            const errorMessage = ['E0005', 'E0006', 'E0008', 'E0009'];

            if (errorCode === '0') {
              const addressSet = response.data.results.juso;
              const totalCount = response.data.results.common.totalCount;

              address.isError = false;
              address.total = totalCount > 9000 ? 9000 : totalCount;
              address.list = Object.keys(addressSet).map((key: any) => {
                return {
                  groundName: addressSet[key].jibunAddr,
                  roadName: addressSet[key].roadAddr,
                  zipCode: addressSet[key].zipNo,
                };
              });
            } else if (errorMessage.includes(errorCode)) {
              address.total = 0;
              address.isError = true;
              address.errorMessage = response.data.results.common.errorMessage;
            }

            searchOptions.isSearch = false;
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    );

    return {
      addressSearch,
      isShowSearch,
      onSearchAddress,
      onClickTable,
      onCloseSearch,
      ...toRefs(searchOptions),
      ...toRefs(address),
    };
  },
});
</script>

<style scoped>
.zipcode {
  width: 60px;
  color: deepskyblue;
}
.templateBackground {
  background-color: transparent !important;
}
.table-style {
  line-height: 25px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
}
.fixed_table_height {
  height: 510px;
}
.fixed_page_height {
  height: 32px;
}
</style>
