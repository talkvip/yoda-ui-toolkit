import * as React from 'react';
import {YodaGrid, YodaGridRow, YodaGridColumn}  from '../lib/Grid';
import {FormControl}  from 'react-bootstrap'

let items =  () => { let tmp = []; for (let i = 1; i < 1000; i++)  tmp.push({ id: `${i}`, name: `name_${i}` }); return tmp }

export default class GridDemo extends React.Component<any, any>{
    render() {
        return <div>
            <h1>Div Demo</h1>
            <YodaGrid items={items()} multiselect={false}>
                <YodaGridColumn md={1} sm={2}  xsHidden dataField= "id"/>
                <YodaGridColumn md={2} sm={2}  xsHidden dataField= "name" />

                <YodaGridColumn md={2} sm={2} xs={12} dataField= "id"  mapDataToProps="defaultValue">
                    <FormControl type='text' />
                </YodaGridColumn>
                <YodaGridColumn md={2} sm={2} xs={6} dataField= "name" mapDataToProps={(item) => { return { defaultValue: item } } }>
                    <FormControl type='text'/>
                </YodaGridColumn>

                <YodaGridColumn md={2} sm={2} xs={6} mapDataToProps={(item) => { return { defaultValue: item.name } } }>
                    <FormControl  type='text'/>
                </YodaGridColumn>

                <YodaGridColumn md={2} sm={4} xs={12} mapDataToProps={(item) => { return { type: item.name, defaultValue: item.name } } }>
                    <FormControl type='text'/>
                </YodaGridColumn>

                <YodaGridColumn md={1} smHidden xsHidden mapDataToProps={(item) => { return { children: item.name } } }>
                    <div style={{ background: "yellow" }}/>
                </YodaGridColumn>
            </YodaGrid>

        </div>
    }
}

