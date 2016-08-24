import * as React from 'react';
import {Button,Navbar} from './lib';
import TableDemoAjax from './demo/TableDemoAjax';
import TableDemo from './demo/TableDemo';



const data = [
    {title:'Table', component: <TableDemo/>},
    {title:'AjaxTable', component: <TableDemoAjax/>},
]


class Menu extends React.Component<any,any> {
    constructor(props){
        super(props);
        this.state = {
            current: null
        }
    }

    onChange = (item) =>{
        this.setState({current:item});
    }
    render () {
        return <div style={{padding:'50px'}}>
            <h1>yoda-ui-kit demo {this.state.current && `: ${this.state.current.title}`}
            </h1>
            {this.state.current ? <a onClick={()=>this.onChange(null)}>home</a> :
            <ul>
             {data.map((item,i)=><li key={i}><a onClick={()=>this.onChange(item)}>{item.title}</a></li>)}
             </ul>
            }
            <hr/>
            {this.state.current && this.state.current.component}            
        </div>
    }

}




export default Menu;
