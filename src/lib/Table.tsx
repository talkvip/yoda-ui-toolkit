import * as React from 'react';
import {Table, Pagination}  from 'react-bootstrap';

export interface ColumnDefinition {
    name: string,
    caption?: string
}

export interface TableConfig<T> {
    columns: (ColumnDefinition | string)[];
    itemStyle?: (colName: string, item: T) => React.CSSProperties;
    itemRender?: (colName: string, item: T) => string | Element | JSX.Element;
    itemClass?: (colName: string, item: T) => string;
}

const getName = (col: string | ColumnDefinition): string => {
    return typeof col === "string" ? col : col.name;
}

const createHeader = function <TProps>({columns}: TableConfig<TProps>) {
    const getCaption = (col: string | ColumnDefinition): string => {
        return typeof col === "string" ? col : col.caption ? col.caption : col.name;
    }

    return (
        <tr>
            {
                columns.map((col, i) => <th key={`${i}_${getName(col)}`}>{getCaption(col) }</th>)
            }
        </tr>
    )
}

const createRows = function <T>(items, tableProps: TableConfig<T>) {
    const createRow = function <T>(item: any, {columns, itemStyle, itemRender, itemClass}: TableConfig<T>) {
        return columns.map((col, i) => {
            const colName = getName(col);
            let itemRendered = itemRender && itemRender(colName, item);
            if (!itemRendered) itemRendered = item[colName];
            let itemStyled = itemStyle && itemStyle(colName, item);
            if (!itemStyled) itemStyled = {};
            let itemClasses = itemClass && itemClass(colName, item);
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
    enablePaging: boolean,
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
    const paging = props.enablePaging &&
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
            {paging}
        </div>
    )
}
export default table;