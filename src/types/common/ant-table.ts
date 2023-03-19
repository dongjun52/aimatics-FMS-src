import { TableState } from 'ant-design-vue/es/table/interface';

export interface PaginationType {
  total: number | undefined;
  pageSize: any;
  // current: number | undefined;
  current: number;
  totalPages?: number | undefined;
  selectedRowKeys?: [] | undefined;
  onShowSizeChange?: (current: number, pageSize: number) => void;
  pageSizeOptions?: any;
  showSizeChanger?: boolean;
  'onUpdate:current'?: (current: number) => void;
  'onUpdate:pageSize'?: (pageSize: number) => void;
  position: [string];
}

export type ChangePaginationType = TableState['pagination'];

export interface TableColumnType {
  align?: string;
  ellipsis?: boolean;
  tableLayout?: boolean;
  colSpan?: number;
  dataIndex: string;
  defaultFilteredValue?: string[];
  defaultSortOrder?: 'ascend' | 'descend' | null;
  filterDropdown?: any;
  filterDropdownVisible?: boolean;
  filtered?: boolean;
  filteredValue?: string[];
  filterIcon?: any;
  filterMultiple?: boolean;
  filters?: any[];
  fixed?: 'left' | 'right' | boolean;
  key?: string;
  customRender?: any;
  sorter?: Function | boolean;
  sortOrder?: 'ascend' | 'descend' | boolean;
  sortDirections?: string[];
  title?: string;
  width?: string | number;
  customCell?: (record: any, rowIndex: number) => void;
  customHeaderCell?: (column: any) => void;
  onFilter?: Function;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  slots?: any;
  className?: string;
}

export interface Sorter {
  column:
    | undefined
    | {
        key: string;
        sortOrder: string;
      };
  columnKey: string;
  field: string;
  order: string;
}

export type Filters = Record<string, (string | number)[] | string | null>;
// export interface ColumnFilterItem {
//   text: VueNode;
//   value: string | number | boolean;
//   children?: ColumnFilterItem[];
// }
