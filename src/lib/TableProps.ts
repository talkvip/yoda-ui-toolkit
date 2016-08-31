export type SortOrder = 'asc' | 'desc';

/** Table properties */
export interface TableProps<T> {
    items: T[]

    /** Paging */
    pageIndex?: number,
    pageSize?: number,
    dataSize?: number,
    pageChange?: (page: number, pageSize: number) => void,

    /* Sorting */
    sortName?: string,
    sortOrder?: SortOrder,
    sortChange?: (sortName: string, sortOrder: SortOrder) => void
}