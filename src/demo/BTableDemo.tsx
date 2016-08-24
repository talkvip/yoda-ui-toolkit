import * as React from 'react';
import Table, {TableProps, ColumnDefinition} from '../lib/BTable';
import Spinner from '../lib/Spinner';

const PAGE_SIZE = 10;

let items = [];
for (let i = 0; i < 100; i++) {
    items.push({ col1: `col1_${i}`, col2: `col2_${i}` })
}

class Demo extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            activePage: 1,
            pageSize: PAGE_SIZE,
            items: items.slice(1, PAGE_SIZE)
        }
    }

    private pageChange = (page: number) => {
        this.setState({
            loading: true,
            activePage: page
        }, () => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    items: items.slice((page - 1) * this.state.pageSize, (page - 1) * this.state.pageSize + this.state.pageSize)
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
                    items: items.slice((this.state.page - 1) * this.state.pageSize, (this.state.page - 1) * this.state.pageSize + this.state.pageSize)
                })
            }, 500)
        });
    }

    render() {

        const props: TableProps<any> = {
            enablePaging: true,
            pageIndex: this.state.activePage,
            columns: [{ name: 'col1', isKey: true }, 'col2'],
            items: this.state.items,
            pageSize: this.state.pageSize,
            pageChange: this.pageChange,
            dataSize: items.length,
            pageSizeChange: this.pageSizeChange
        }
        return <div>
            {this.state.loading && <Spinner/>}
            <Table {...props}/>
        </div>
    }
}

export default Demo;