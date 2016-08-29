import * as React from 'react';
import {YodaGrid, YodaGridRow, YodaGridColumn}  from '../lib/Grid';
import {FormControl, Row}  from 'react-bootstrap'

let logo = require('../logo.svg');

export interface TestUiDemo1Props {
    id?: any;
    name?: any,
    date?: any
}
export interface TestUiDemo2Props {
    item?: any;
}

const TestUIDemo1 = (props: TestUiDemo1Props) => {
    return <div style={{ border: "1px solid" }}>
        <div>name: {props.name}</div>
        <div>date: {props.date}</div>
    </div>
}
const TestUIDemo2 = (props: TestUiDemo2Props) => {
    return <div style={{ border: "1px solid" }}>
        <div>name: {props.item.name}</div>
        <div>date: {props.item.date}</div>
    </div>
}


export default class GridDemo extends React.Component<any, { items?: any[], multiselect?: boolean }>{
    private  input:HTMLInputElement;

    constructor(props) {
        super(props);
        this.state  = {items : this.createItems(10), multiselect:false}
    }

    createItems(num: number) {
        let tmp = []; for (let i = 0; i < num; i++)  tmp.push({ id: `${i}`, name: `name_${i}`, date: "2015-02-02" }); 
        return tmp
    }

    private onCreateClick = (e:Event) =>{

        if (this.input.value)  {
            this.setState({items: this.createItems(parseInt(this.input.value) )});
        }
    }
    private onMultiselectClick = (e:Event) =>{
            this.setState({multiselect: !this.state.multiselect});
    }

    render() {
        return <div>
            <input type='number' defaultValue={this.state.items.length}  ref = {e=> this.input = e}/>
            <button onClick={this.onCreateClick}>create test rows</button>
            { "   " }
            <button onClick={this.onMultiselectClick}>multiselect {this.state.multiselect ? "on" : "off" }</button>
            <hr/>
            <YodaGrid items={this.state.items} multiselect={this.state.multiselect}>
                <YodaGridColumn md={1} sm={1}  xsHidden><img src={logo}/></YodaGridColumn>
                <YodaGridColumn md={1} sm={1}  xsHidden dataField= "id"/>
                <YodaGridColumn md={1} sm={1}  xsHidden dataField= "name" />
                <YodaGridColumn md={2} sm={2}  dataField= "name" mapDataToProps="defaultValue">
                    <FormControl type='text' />
                </YodaGridColumn>
                <YodaGridColumn md={3} sm={3}  dataField= "date" mapDataToProps={(item) => { return { defaultValue: item, type: "date" } } }>
                    <FormControl />
                </YodaGridColumn>
                <YodaGridColumn md={2} sm={2} mapDataToProps="...">
                    <TestUIDemo1 />
                </YodaGridColumn>
                <YodaGridColumn md={2} sm={2} mapDataToProps="item">
                    <TestUIDemo2 />
                </YodaGridColumn>
            </YodaGrid>
        </div>
    }
}

