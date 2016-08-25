import * as React from 'react';
import Table, {TableProps, ColumnDefinition, SortOrder} from '../lib/BTable';
import Spinner from '../lib/Spinner';

const PAGE_SIZE = 10;

let allItems: SampleRow[] = [];
for (let i = 0; i < 1000; i++) {
    allItems.push(
        {
            col1: `col1_${i}`,
            col2: `col2_${i}`,
            col3: Math.round((Math.random() * 100)),
            col4: `another col_${i}`
        })
}

export interface DemoState {
    loading?: boolean,
    pageIndex?: number,
    pageSize?: number,
    sortName?: string,
    sortOrder?: SortOrder,
    items?: SampleRow[]
}

export interface SampleRow {
    col1: string,
    col2: string,
    col3: number,
    col4: string
}

class Demo extends React.Component<any, DemoState> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pageIndex: 1,
            pageSize: PAGE_SIZE,
            items: allItems.slice(1, PAGE_SIZE)
        }
    }

    private getPage = (items) => items.slice((this.state.pageIndex - 1) * this.state.pageSize, (this.state.pageIndex - 1) * this.state.pageSize + this.state.pageSize);

    private pageChange = (page: number) => {
        this.setState({
            loading: true,
            pageIndex: page
        }, () => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    items: this.getPage(allItems)
                })
            }, 500)
        });
    }

    private pageSizeChange = (pageSize: number) => {
        this.setState({
            loading: true,
            pageSize: pageSize
        }, () => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    items: this.getPage(allItems)
                })
            }, 500)
        });
    }

    private sortChange = (sortName: string, sortOrder: SortOrder) => {
        this.setState({
            loading: true,
            sortName,
            sortOrder
        }, () => {
            setTimeout(() => {
                const op = (sortOrder === 'asc') ? 1 : -1;
                const ordered = allItems.sort((a, b) => a[sortName] > b[sortName] ? op : (op * -1));
                this.setState({
                    loading: false,
                    items: this.getPage(ordered)
                })
            }, 500)
        });
    }

    render() {
        const props: TableProps<SampleRow> = {
            paging: true,
            columns: [{ name: 'col1', isKey: true }, 'col2', { name: 'col3', caption: 'numeri', sortable: true }, 'col4'],
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
            pageChange: this.pageChange,
            pageSizeChange: this.pageSizeChange,
            showTotal: (start, to, total) => <span>[{start}-{to}]- Total: {total}</span>,
            dataSize: allItems.length,
            items: this.state.items,
            itemRender: (name, row) => name === 'col1' ? ('customized_' + row[name]) : undefined,
            rowClick: (row) => alert(`clicked: ${row.col1} - ${row.col2}`),
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            sortChange: this.sortChange,
        }
        return <div>
            {this.state.loading && <Spinner/>}
            <Table {...props}/>
        </div>
    }
}

export default Demo;