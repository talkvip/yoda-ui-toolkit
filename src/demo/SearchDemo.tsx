import * as React from 'react';
import * as builder from '../lib/Search';
import * as rs from './ReduxDemoStore';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Col, Row} from 'react-bootstrap';


let Search = builder.createSearchTextBox(rs.getItemsFromState, rs.search, {
    labelKey: 'name',
    renderMenuItemChildren: (props, ele, ix) => <span>{ele.name} ({ele.alpha3Code}) </span>
});

let ASearch = builder.createSearchAnchor(rs.getItemsFromState, rs.search, { labelKey: 'name' });
let BSearch = builder.createSearchButton(rs.getItemsFromState, rs.search, { labelKey: 'name' });

export default class SearchDemo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            msg1: '',
            msg2: '',
            msg3: ''
        }
    }


    private display = (props, ele, ix) => {
        return <span>{ele.name} ({ele.alpha3Code}) </span>
    }

    render() {
        return <Provider store = {rs.default}>
            <div>
                <a href='http://github.com/vgmr/yoda-ui-toolkit/docs/search.md'>Documentation</a>
                {[false, true].map((multi, ix) => (
                    <div key={ix} >
                        <h2 >{multi ? 'Multiple Selection' : 'Simple Selection'} </h2>
                        <Row>
                            <Col xs={12} sm={4}>
                                <h4>Standard textbox search</h4>
                                <Search onChanged={(e) => { this.setState({ ["msg1" + multi]: e }) } }
                                    minLength={3}
                                    multiple={multi}
                                    debounceTime={200}
                                    placeholder='type a country name (e.g. Italy)'/>
                            </Col>
                            <Col xs={12} sm={4}>
                                <h4>Anchor search</h4>
                                <ASearch onChanged={(e) => { this.setState({ ["msg2" + multi]: e }) } }
                                    placeholder='type a country name (e.g. Italy)'
                                    minLength={1}
                                    multiple={multi}
                                    emptyLabel='No Country Selected'/>
                            </Col>
                            <Col xs={12} sm={4}>
                                <h4>Button search</h4>
                                <BSearch onChanged={(e) => { this.setState({ ["msg3" + multi]: e }) } }
                                    placeholder='type a country name (e.g. Italy)'
                                    minLength={1}
                                    multiple={multi}
                                    emptyLabel='No Country Selected'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={4}>
                                {displaySelected(this.state["msg1" + multi]) }
                            </Col>
                            <Col xs={12} sm={4}>
                                {displaySelected(this.state["msg2" + multi]) }
                            </Col>
                            <Col xs={12} sm={4}>
                                {displaySelected(this.state["msg3" + multi]) }
                            </Col>
                        </Row>
                        <Row style={{ height: '50px', width: '100%' }}/>
                    </div>
                )) }
            </div>
        </Provider>
    }

}

function displaySelected(s) {
    return (s && s.length > 0) && 'you selected: ' + ([].concat(s)).map(p => p.name).join(', ');
}




