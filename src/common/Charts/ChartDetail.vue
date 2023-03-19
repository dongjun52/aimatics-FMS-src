<template>
  <Tabs v-model:activeKey="activeKey" type="line">
    <TabPane key="1" tab="그래프상세">
      <div class="filter_area">
        <div
          class="
            input_range_calendar
            chart_detail_input_range chart_detail_graph_input_range
          "
        >
          <Select
            class="mr10"
            :value="graphMode"
            @change="handleDateSelectChange"
          >
            <Option value="year">년</Option>
            <Option value="month">월</Option>
          </Select>
          <DatePicker
            :mode="graphMode"
            :value="graph"
            :open="graphPickShow"
            :format="graphDateFormat"
            @panelChange="handleGraphPanelChange"
            @openChange="handleGraphOpenChange"
          />
          <PartnerSelectBox @change="onChangeGraphPartner" />
        </div>
      </div>
      <div style="height: 70vh">
        <slot name="modalChart" />
      </div>
    </TabPane>
    <TabPane key="2" tab="리스트">
      <div class="filter_area">
        <div class="input_range_calendar chart_detail_input_range">
          <RangePicker
            v-model:value="table"
            direction="vertical"
            :format="dateFormat"
            width="120"
            @change="dateChange('table', table)"
          />
          <Select
            v-if="selectValues && selectValues.length > 0"
            ref="select"
            v-model:value="categoryTwo"
            class="ml10"
            style="width: 120px"
            @change="selectChange('table', categoryTwo)"
          >
            <Option
              v-for="(element, index) in selectValues"
              :key="index"
              :value="element"
            >
              {{ element }}
            </Option>
          </Select>
          <PartnerSelectBox @change="onChangeTablePartner" />
        </div>
        <div>
          <button class="btn btn_md btn_blue" @click="downloadExel">
            다운로드
          </button>
        </div>
      </div>
      <div>
        <slot name="modalTable" />
      </div>
    </TabPane>
  </Tabs>
</template>

<script lang="ts">
import DatePicker from 'ant-design-vue/es/date-picker';
import Select from 'ant-design-vue/es/select';
import Tabs from 'ant-design-vue/es/tabs';
import moment, { Moment } from 'moment';
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
} from 'vue';
import { useStore } from 'vuex';

import PartnerSelectBox from '@/common/SelectBox/PartnerSelectBox.vue';
import { IPartner } from '@/types/service/common';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

export interface ChartDetailTableDateEmitType {
  startedAt: string;
  endedAt: string;
}

export interface ChartDetailEmitType {
  type: string;
  value: string | number;
}

export interface ChartDetailGraphDatePickerEmitType {
  type: string;
  value: Moment;
}

interface GraphDatePickerStateType {
  graphDateFormat: string;
  graphMode: string;
  graphPickShow: boolean;
  graph: moment.Moment;
}

export interface ChartDetailPartnerEmitType {
  type: string;
  partner: IPartner;
}

export default defineComponent({
  name: 'ChartDetail',
  components: {
    RangePicker,
    DatePicker,
    Tabs,
    TabPane,
    Select,
    Option,
    PartnerSelectBox,
  },
  props: {
    getKey: {
      type: String,
    },
    selectValue: {
      type: Array as PropType<string[] | number[]>,
      required: false,
      default: () => [],
    },
    adminValue: {
      type: Array as PropType<string[] | number[]>,
      required: false,
      default: () => [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    startDt: {
      type: String,
      required: false,
    },
    endDt: {
      type: String,
      required: false,
    },
  },
  emits: [
    'selected',
    'adminSelect',
    'downloadExel',
    'handleChangeTableDatePicker',
    'handleChangeGraphDatePicker',
    'handleDateSelectChange',
    'handlePartnerChange',
  ],
  setup(props, { emit }) {
    const store = useStore();
    const dateFormat = 'YY-MM-DD';
    const activeKey = ref<string | undefined>(props.getKey);
    const selectValues = ref<string[] | number[]>(props.selectValue);
    const adminValues = ref<string[] | number[]>(props.adminValue);
    const companies = computed(() => store.state.auth.partners);

    const graphDatePickerState = reactive<GraphDatePickerStateType>({
      graphDateFormat: 'YYYY',
      graphMode: 'year',
      graphPickShow: false,
      graph: moment(props.startDt),
    });

    const table = ref<moment.Moment[]>([
      moment(moment(props.startDt), dateFormat),
      moment(moment(props.endDt), dateFormat),
    ]);

    const dateChange = (type: string, date: Moment[]) => {
      const startedAt = moment(date[0]).format('YYYYMMDD');
      const endedAt = moment(date[1]).format('YYYYMMDD');
      emit('handleChangeTableDatePicker', { startedAt, endedAt });
    };

    const categoryOne = ref<number | string>(selectValues.value[0]);
    const categoryTwo = ref<number | string>(selectValues.value[0]);

    const selectChange = (type: string, value: string | number) => {
      emit('selected', { type, value });
    };

    const adminOne = ref<number | string>(adminValues.value[0]);
    const adminTwo = ref<number | string>(adminValues.value[0]);

    const adminChange = (type: string, value: string | number) => {
      emit('adminSelect', { type, value });
    };

    const downloadExel = () => {
      emit('downloadExel');
    };

    const handleGraphPanelChange = (value: Moment) => {
      graphDatePickerState.graph = value;
      graphDatePickerState.graphPickShow = false;
      emit('handleChangeGraphDatePicker', {
        type: graphDatePickerState.graphMode,
        value,
      });
    };

    const handleGraphOpenChange = (status: boolean) => {
      graphDatePickerState.graphPickShow = status;
    };

    const handleDateSelectChange = (value: string) => {
      graphDatePickerState.graphMode = value;
      graphDatePickerState.graphDateFormat =
        value === 'year' ? 'YYYY' : 'YYYY-MM';
      if (value === 'year') {
        emit('handleDateSelectChange', {
          type: value,
          value: moment(graphDatePickerState.graph as Moment).format('YYYY'),
        });
      } else {
        if (
          moment(moment()).format('YYYY') ===
          moment(graphDatePickerState.graph as Moment).format('YYYY')
        ) {
          graphDatePickerState.graph = moment(moment());
        } else {
          graphDatePickerState.graph = moment(
            graphDatePickerState.graph as Moment
          ).startOf('years');
        }
        emit('handleDateSelectChange', {
          type: value,
          value: graphDatePickerState.graph,
        });
      }
    };

    const onChangeGraphPartner = (partner: IPartner) => {
      emit('handlePartnerChange', {
        type: 'graph',
        partner,
      });
    };

    const onChangeTablePartner = (partner: IPartner) => {
      emit('handlePartnerChange', { type: 'table', partner });
    };

    return {
      selectValues,
      adminValues,
      categoryOne,
      categoryTwo,
      adminOne,
      adminTwo,
      activeKey,
      dateFormat,
      table,
      companies,
      dateChange,
      selectChange,
      adminChange,
      downloadExel,
      handleGraphPanelChange,
      handleGraphOpenChange,
      handleDateSelectChange,
      onChangeGraphPartner,
      onChangeTablePartner,
      ...toRefs(graphDatePickerState),
    };
  },
});
</script>
