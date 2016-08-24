import * as React from 'react';
import Table, {TableProps} from '../lib/Table';
import Spinner from '../lib/Spinner';
const pageSize = 15;

export interface IDemoState {
    loading: boolean,
    activePage: number,
    items: QueryItem[],
    error?: string
}


class Demo extends React.Component<any, IDemoState> {
    private searchInput: HTMLInputElement;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            activePage: 1,
            items: []
        }
    }
    private onKeyPress = (event:KeyboardEvent) =>{
        if (event.keyCode == 13 && this.searchInput.value){
            this.onSearch();
        }
    }

    private onSearch = (page = 1) => {
        this.setState({
            loading: true,
            items: this.state.items,
            activePage: page
        }, () => {
            localSearch(this.searchInput.value, undefined, this.state.activePage, pageSize)
                .then(res => {
                    this.setState({
                        items: res,
                        error: null,
                        loading: false,
                        activePage: this.state.activePage
                    });
                })            
                .catch (res=> {
                    this.setState({
                        items: this.state.items,
                        error: res.message,
                        loading: false,
                        activePage: this.state.activePage
                    })
                })

        });
    }

    render() {
        const props: TableProps<QueryItem> = {
            activePage: this.state.activePage,
            columns: [{ name: 'Title' }, { name: 'Address' }, { name: 'City' }],
            items: this.state.items,
            numOfPages: this.state.items ? 100: 0,
            pageChange: this.onSearch
            // itemRender: (colName, item) => {
            //     if (colName === 'col1') return <button>{item}</button>
            //     return item;
            // }
        }
        return <div>
            <input type='text' ref = {(e) => this.searchInput = e} onKeyDown ={this.onKeyPress}/>
            <button onClick={() => this.onSearch(1) }> Search </button>
            <hr/>
            {this.state.loading && <Spinner/>}
            {this.state.error ?
                 <div>{this.state.error}</div> :
                <Table {...props}/>
            }
        </div>
    }
}

export default Demo;




function localSearch(search, location: string = 'milan, it', pageIndex: number, pageSize: number) {
    const offset = (pageIndex - 1) * pageSize;
    const actualQuery = `select * from local.search(${offset},${pageSize}) where query="${search}" and location="${location}"`;
    //const actualQuery = `select * from local.search(${offset},${pageSize}) where query="${search}" and latitude=45.46 and longitude=9.10`;
    const url = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent( actualQuery ) + '&format=json'

    return fetch(url).then(res => res.json()).then(res => {
        const rows =Array.isArray(res.query.results.Result) ? res.query.results.Result : res.query.results;
 

        return Object.keys(rows).map(key => rows[key] as QueryItem);
    });
}

export interface QueryItem {
    Title: string;
    Address: string;
    City: string;
    State: string;
    mapUrl: string;
    Ratuing: {
        AverageRating: number
    }
}
