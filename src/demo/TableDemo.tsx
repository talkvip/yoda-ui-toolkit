import * as React from 'react';
import Table, {TableProps} from '../lib/Table';
import Spinner from '../lib/Spinner';

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
            items: items.slice(1, 10)
        }
    }

    private pageChange = (page: number) => {
        this.setState({
            loading: true,
            activePage: page
        }, () => {
            setTimeout(() => {
                this.setState({
                    loading:false,
                    items: items.slice((page - 1) * 10, (page - 1) * 10 + 10)
                })
            }, 500)
        });
    }

    render() {
        const props: TableProps<any> = {
            activePage: this.state.activePage,
            columns: [{ name: 'col1' }, { name: 'col2' }],
            items: this.state.items,
            numOfPages: Math.ceil(items.length / 10),
            pageChange: this.pageChange
            // itemRender: (colName, item) => {
            //     if (colName === 'col1') return <button>{item}</button>
            //     return item;
            // }
        }
        return <div>
            {this.state.loading && <Spinner/>}
            <Table {...props}/>
        </div>
    }
}

export default Demo;