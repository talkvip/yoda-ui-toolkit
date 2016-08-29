import * as React from 'react';
import * as builder from '../lib/Search';
import * as rs from './ReduxDemoStore';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Col, Row} from 'react-bootstrap';


let Search = builder.createSearchTextBox(rs.getItemsFromState, rs.search, (item) => item.name);
let ASearch = builder.createSearchAnchor(rs.getItemsFromState, rs.search, (item) => item.name);
let BSearch = builder.createSearchButton(rs.getItemsFromState, rs.search, (item) => item.name);
let MSearch = builder.createSearchMulti(rs.getItemsFromState, rs.search, (item) => item.name);

export default class SearchDemo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            msg1: '',
            msg2: '',
            msg3: ''
        }
    }

    render() {
        return <Provider store = {rs.default}>
            <div>
                <h1>test</h1>
                <div>
                    <Col xs={12} sm={4}>
                        <h4>Standard textbox search</h4>
                        <Search onSelected={(e) => { this.setState({ msg1: e }) } }
                            minCharacters={1}
                            placeholder='type a country name (e.g. Italy)'/>
                    </Col>
                    <Col xs={12} sm={4}>
                        <h4>Anchor search</h4>
                        <ASearch onSelected={(e) => { this.setState({ msg2: e }) } }
                            placeholder='type a country name (e.g. Italy)'
                            minCharacters={1}
                            nullValueDisplay='No Country Selected'/>
                    </Col>
                    <Col xs={12} sm={4}>
                        <h4>Button search</h4>
                        <BSearch onSelected={(e) => { this.setState({ msg3: e }) } }
                            placeholder='type a country name (e.g. Italy)'
                            minCharacters={1}
                            nullValueDisplay='No Country Selected'/>
                    </Col>
                </div>
                <div>
                    <Col xs={12} sm={4}>
                        <pre>{this.state.msg1.name }</pre>
                    </Col>
                    <Col xs={12} sm={4}>
                        <pre>{this.state.msg2.name }</pre>
                    </Col>
                    <Col xs={12} sm={4}>
                        <pre>{this.state.msg3.name }</pre>
                    </Col>
                </div>
                <div>
                        <h4>Multi Search</h4>
                        <MSearch onSelected={(e) => { this.setState({ msg3: e }) } }
                            placeholder='type a country name (e.g. Italy)'
                            minCharacters={1}
                            nullValueDisplay='No Country Selected'/>
                </div>
            </div>
        </Provider>
    }

}





