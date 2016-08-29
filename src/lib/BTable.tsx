import * as React from 'react';
import { BootstrapTable, Options, TableHeaderColumn, SortOrder as RSortOrder, DataAlignType } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

export type SortOrder = RSortOrder;
export type Align = DataAlignType;

export interface ColumnDefinition {
    name: string,
    caption?: string,
    hidden?: boolean,
    isKey?: boolean,
    sortable?: boolean,
    width?: string,
    align?: Align
}

export interface TableConfig<T> {
    columns: (ColumnDefinition | string)[];
    itemRender?: (colName: string, item: T) => string | React.ReactElement<any>;
    itemClass?: (colName: string, item: T) => string;
    rowClick?: (item: T) => void
    pageChange?: (page: number, pageSize: number) => void,
    sortChange?: (sortName: string, sortOrder: SortOrder) => void
}

export interface TableProps<T> extends TableConfig<T> {
    pageIndex?: number,
    pageSize?: number,
    dataSize?: number,
    showTotal?: boolean | ((start: number, to: number, dataSize: number) => any),
    sortName?: string,
    sortOrder?: SortOrder,
    items: T[]
}

const isColumnDefinition = (column: ColumnDefinition | string): column is ColumnDefinition => typeof column !== "string";

const columnProps = (column: ColumnDefinition | string, {itemRender, itemClass}: TableProps<any>) => {
    let col: ColumnDefinition;

    if (!isColumnDefinition(column))
        col = { name: column } as ColumnDefinition;
    else
        col = column;

    return (
        {
            hidden: col.hidden || false,
            isKey: col.isKey || false,
            width: col.width,
            dataAlign: col.align,
            dataField: col.name,
            dataSort: col.sortable || false,
            dataFormat: (cell, row) => (itemRender && itemRender(col.name, row)) || cell,
            columnClassName: (cell, row) => itemClass && itemClass(col.name, row)
        }
    )
}

const table = (tableProps: TableProps<any>) => {
    let options: Options = undefined;
    const sorting = !!tableProps.sortChange;
    const paging = !!tableProps.pageSize;

    if (tableProps.items && tableProps.items.length) {
        options = {
            onRowClick: tableProps.rowClick,
            onSortChange: sorting ? tableProps.sortChange : undefined,
            sortName: sorting ? tableProps.sortName : undefined,
            sortOrder: sorting ? tableProps.sortOrder : undefined,
            onPageChange: paging ? tableProps.pageChange : undefined,
            paginationShowsTotal: tableProps.showTotal as any,
            sizePerPageList: paging ? [10, 25, 50, 100] : [],
            sizePerPage: tableProps.pageSize,
            page: tableProps.pageIndex,
        }
    }

    return (
        <BootstrapTable
            remote={true}
            fetchInfo={ { dataTotalSize: tableProps.dataSize || 0 }}
            data={tableProps.items || []}
            striped={true}
            hover={tableProps.rowClick ? true : false}
            pagination={paging}
            options={options} >
            {tableProps.columns.map((col, index) =>
                <TableHeaderColumn key={`col_${index}`} {...columnProps(col, tableProps) } >
                    { isColumnDefinition(col) ? (col.caption || col.name) : col }
                </TableHeaderColumn>
            ) }
        </BootstrapTable >
    )
}

export default table;