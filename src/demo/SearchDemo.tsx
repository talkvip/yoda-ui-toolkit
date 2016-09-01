import * as React from 'react';
import {AutoComplete, IProps, connectedAutoCompleteTextBox, connectedAutoCompleteAnchor, connectedAutoCompleteButton} from '../lib/Search';
import * as rs from './ReduxDemoStore';
import {createStore} from 'redux';
import {CreatePromiseAction} from 'redux-helper';
import {Provider} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as moment from 'moment';
const SearchA = connectedAutoCompleteTextBox(rs.getItemsFromState, rs.search, { labelKey: 'name' });
const SearchB = connectedAutoCompleteButton(rs.getItemsFromState, rs.search, {
    labelKey: 'name',
    renderMenuItemChildren: (p, e, i) => <span>{e.name} ({e.alpha3Code}) </span>
});
const SearchC = connectedAutoCompleteAnchor(rs.getItemsFromState, rs.search, { labelKey: 'name' });



export class Examples extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            msg1: '',
            msg2: '',
            msg3: '',
        }
    }


    private display = (props, ele, ix) => {
        return <span>{ele.name} ({ele.alpha3Code}) </span>
    }

    render() {

        return <div>
                <a href='http://github.com/vgmr/yoda-ui-toolkit/blob/master/docs/search.md'>Documentation</a>
                {[false, true].map((multi, ix) => (
                    <div key={ix} >
                        <h2 >{multi ? 'Multiple Selection' : 'Simple Selection'} </h2>
                        <p>{moment().toISOString()}</p>
                        <Row>
                            <Col xs={12} sm={4}>
                                <h4>Standard textbox search</h4>
                                <SearchA onChanged={(e) => { this.setState({ ["msg1" + multi]: e }) } }
                                    minLength={1}
                                    multiple={multi}
                                    debounceTime={200}
                                    placeholder='type a country name (e.g. Italy)'/>
                            </Col>
                            <Col xs={12} sm={4}>
                                <h4>Anchor search</h4>
                                <SearchB
                                    onChanged={(e) => { this.setState({ ["msg2" + multi]: e }) } }
                                    placeholder='type a country name (e.g. Italy)'
                                    minLength={1}
                                    multiple={multi}
                                    emptyLabel='No Country Selected'/>
                            </Col>
                            <Col xs={12} sm={4}>
                                <h4>Button search</h4>
                                <SearchC onChanged={(e) => { this.setState({ ["msg3" + multi]: e }) } }
                                    placeholder='type a country name (e.g. Italy)'
                                    selected={this.state["msg1" + multi]}
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
                <Row>
                    <Col xs={12} sm={4}>
                        <h4>Controlled</h4>
                        <SearchA 
                            onChanged={(e) => {
                                console.log('changed',e);
                                this.setState({ ctld: e }) } 
                            }
                            minLength={2}
                            debounceTime={200}
                            optimizeSearch={true}
                            selected = {this.state.ctld}
                            placeholder='type a country name (e.g. Italy)'/>
                        <pre> state value:{this.state.ctld && this.state.ctld.length>0 && this.state.ctld[0].name} </pre>
                    </Col>
                </Row>
            </div>
    }

}

function displaySelected(s) {
    return (s && s.length > 0) && 'you selected: ' + ([].concat(s)).map(p => p.name).join(', ');
}


export  const ConnectedExamples = connect((s)=>({state:s}) ) (Examples);

const SearchDemo = (props) =>{
    return  <Provider store = {rs.default}>
            <ConnectedExamples/>
        </Provider>
}

export default SearchDemo;



