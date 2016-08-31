import * as React from 'react';
import GridDemo from './demo/GridDemo';
import SearchDemo from './demo/SearchDemo';
import DatePickerDemo from './demo/DatePickerDemo';



const data = [
    { title: 'Grid', component: <GridDemo/> },
    { title: 'Search', component: <SearchDemo/> },
    { title: 'DatePicker', component: <DatePickerDemo/> }
]


class Menu extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            current: null
        }
    }

    onChange = (item) => {
        this.setState({ current: item });
    }
    render() {
        return <div style={{ padding: '50px' }}>
            <h1>yoda-ui-toolkit demo {this.state.current && `: ${this.state.current.title}`}
            </h1>
            {this.state.current ? <a onClick={() => this.onChange(null) }>home</a> :
                <ul>
                    {data.map((item, i) => <li key={i}><a onClick={() => this.onChange(item) }>{item.title}</a></li>) }
                </ul>
            }
            <hr/>
            {this.state.current && this.state.current.component}
        </div>
    }

}



export default Menu;
