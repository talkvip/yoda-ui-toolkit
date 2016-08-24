import * as React from 'react';
import {Table, Pagination}  from 'react-bootstrap';

export interface ColumnDefinition {
    name: string,
    caption?: string
}

export interface TableConfig<T> {
    columns: ColumnDefinition[];
    itemStyle?: (colName: string, item: T) => React.CSSProperties;
    itemRender?: (colName: string, item: T) => string | Element | JSX.Element;
    itemClass?: (colName: string, item: T) => string;
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
    const createRow = function <T>(item: any, {columns, itemStyle, itemRender, itemClass}: TableConfig<T>) {
        return columns.map((col, i) => {
            let itemRendered = itemRender && itemRender(col.name, item);
            if (!itemRendered) itemRendered = item[col.name];
            let itemStyled = itemStyle && itemStyle(col.name, item);
            if (!itemStyled) itemStyled = {};
            let itemClasses = itemClass && itemClass(col.name, item);
            if (!itemClasses) itemClasses = '';
            return (
                <td
                    key={i}
                    className={itemClasses}
                    style={itemStyled}>
                    {itemRendered}
                </td>
            )
        }
        );
    }
    return items.map((item, i) =>
        <tr key={i}>{createRow(item, tableProps) }</tr>);
}

export interface TableProps<T> extends TableConfig<T> {
    activePage: number,
    numOfPages: number,
    pageChange: (page: number) => void,
    maxPageButtons?: number,
    ellipsis?: boolean,
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
export default table;