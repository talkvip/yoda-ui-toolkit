import * as React from 'react';
import {Col, Row,Glyphicon} from 'react-bootstrap';
import {DatePicker, DatePickerProps} from '../lib/DatePicker';
import * as moment from 'moment';

export default class DatePickerDemo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            value: '2011-12-31'
        }
    }

    private onChange = (e) => this.setState({
        msg: JSON.stringify(e),
        value: e
    });

    render() {
        return <div>
            <Col xs={6} sm={2}>
                <DatePicker
                    value={this.state.value }
                    onChange= {this.onChange}
                    placeholder='enter a valid date'
                    />
            </Col>
            <div>{this.state.msg || ''}</div>
        </div>
    }
}