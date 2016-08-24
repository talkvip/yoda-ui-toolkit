import * as React from 'react';
import {Table, Pagination}  from 'react-bootstrap';

export interface ColumnDefinition {
    name: string,
    caption?: string
}

export interface TableConfig<TRec> {
    columns: ColumnDefinition[];
    itemStyle?: (colName: string, item: TRec) => React.CSSProperties;
    itemRender?: (colName: string, item: TRec) => string | Element | JSX.Element;
}

const createHeader = function <TProps>({columns}: TableConfig<TProps>) {
    return (
        <tr>
            {
                columns.map((col, i) =>
                    <th key={`${i}_${col.name}`}>{col.caption || col.name}</th>
                )
            }
        </tr>
    )
}

const createRows = function <T>(items, tableProps: TableConfig<T>) {
    const createRow = function <T>(item: any, {columns, itemStyle, itemRender}: TableConfig<T>) {
        return columns.map((col, i) =>
            <td key={i} style={ itemStyle && itemStyle(col.name, item) }>{ (itemRender && itemRender(col.name, item)) || item[col.name]}</td>
        );
    }
    return items.map((item, i) =>
        <tr key={i}>{createRow(item, tableProps) }</tr>);
}

export interface TableProps<T> extends TableConfig<T> {
    items?: T[]
}

const table = (props: TableProps<any>) => {
    const header = createHeader(props);
    const rows = createRows(props.items, props);
    return (
        <div>
            <Table striped bordered>
                <thead className='thead' >
                    {header}
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    )
}

export default table;


/* PAGINATOR */

export interface PaginatorProps  {
    activePage: number,
    numOfPages: number,
    pageChange: (page: number) => void,
    maxPageButtons?: number,
    ellipsis?: boolean,
    children?: any
}

const Paginator = function<T>(props:PaginatorProps){
    return (tableProps:TableProps<T>) => (
        <div>
            <Table {...tableProps}/>
            <Pagination
                prev
                next
                first
                last
                ellipsis={props.ellipsis}
                boundaryLinks
                items={props.numOfPages}
                maxButtons={props.maxPageButtons || 5}
                activePage={props.activePage}
                onSelect={props.pageChange} />  
        </div>
    )
}

export {Paginator,table as Table};
