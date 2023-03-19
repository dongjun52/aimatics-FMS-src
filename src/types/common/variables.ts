export interface Condition {
  filters:
    | Array<{
        name: string | null;
        key?: string;
        valueList?: string[] | any;
        valueIntList?: string | any;
        valueInt?: number | null;
      }>
    | undefined;
  sort:
    | {
        order: string;
        by: string;
      }
    | undefined;
}
