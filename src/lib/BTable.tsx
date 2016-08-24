import * as React from 'react';
import { BootstrapTable, Options, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table-all.min.css'

export interface ColumnDefinition {
    name: string,
    caption?: string,
    hidden?: boolean,
    isKey?: boolean
}

export interface TableConfig<T> {
    columns: (ColumnDefinition | string)[];
    itemRender?: (colName: string, item: T) => string | React.ReactElement<any>;
    itemClass?: (colName: string, item: T) => string;
}

export interface TableProps<T> extends TableConfig<T> {
    enablePaging: boolean,
    pageIndex: number,
    dataSize: number,
    pageSize: number,
    pageSizeChange: (pageSize: number) => void,
    pageChange: (page: number) => void,
    items?: T[]
}

const createColumn = (column: ColumnDefinition | string, index: number, {itemRender, itemClass}: TableProps<any>) => {
    let col: ColumnDefinition;
    if (typeof column === "string") {
        col = { name: column } as ColumnDefinition;
    } else {
        col = column;
    }

    return (
        <TableHeaderColumn
            key={`col_${index}`}
            hidden={col.hidden || false}
            isKey={col.isKey || false}
            dataField={col.name}
            dataFormat={ (cell, row) => itemRender(col.name, row) || cell }
            columnClassName = {(cell, row) => itemClass(col.name, row) }
            >
            {col.caption}
        </TableHeaderColumn>
    )

}
const table = (props: TableProps<any>) => {
    let options: Options = undefined;

    if (props.items && props.items.length) {
        options = {
            onPageChange: props.pageChange,
            onSizePerPageList: props.pageSizeChange,
            paginationShowsTotal: true,
            sizePerPageList: [10, 20],
            sizePerPage: props.pageSize
        }
    }

    return (
        <BootstrapTable
            remote={true}
            fetchInfo={ { dataTotalSize: props.dataSize || 0 }}
            data={props.items || []}
            striped={true}
            hover={false}
            pagination={options && props.enablePaging}
            options={options} >
            {props.columns.map((col, i) => createColumn(col, i, props)) }
        </BootstrapTable>
    )
}

export default table;