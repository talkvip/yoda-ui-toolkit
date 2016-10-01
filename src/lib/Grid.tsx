import * as React from 'react';
import * as ShallowCompare  from 'react-addons-shallow-compare';

import {Grid, Row, Col, Clearfix, ColProps}  from 'react-bootstrap'

/****************************************************************************************************************************** */
const YodaGridCol = (props) => <Col className="yodaGrid-col" {...props}></Col>
const YodaGridClearfix = (props) => <Clearfix className="yodaGrid-fix" {...props}></Clearfix>

//YodaGrid
export interface YodaGridProps {
    items?: any[],
    children?: any[],
    multiselect?: boolean,
    onSelectionChanged?: (items: any[]) => boolean
}
export class YodaGrid<T> extends React.Component<YodaGridProps, { selectedItems: any[] }> {
    static propTypes = {
        children: function (props: YodaGridProps, propName: string, componentName: string) {
            var check = false;
            if (React.Children.count(props.children) > 0) {
                React.Children.forEach(props.children, (com: React.ReactElement<any>) => {
                    if (com.props.hasOwnProperty("dataField") || com.props.hasOwnProperty("mapDataToProps")) check = true;
                })
                if (!check) return new Error('`' + componentName + '` should have at least child of  YodaGridColumn type with prop dataField or prop mapDataToProps');
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = { selectedItems: [] }
    }

    componentWillReceiveProps() {
        this.state.selectedItems = [];
    }

    private handlerRowSelect = (item: any, selected: boolean) => {
        let newSel = this.props.multiselect ? this.state.selectedItems : [];

        if (selected) newSel.push(item);
        else newSel = newSel.filter(p => p !== item);

        let check = this.props.onSelectionChanged ? this.props.onSelectionChanged(newSel) : true;

        if (check) this.setState({ selectedItems: newSel })
    }

    render() {
        if (this.props.children) {
            return <Grid className="yodaGrid" fluid>
                {
                    this.props.items.map((item, i) => {
                        let selected = this.state.selectedItems.indexOf(item) != -1;
                        return <YodaGridRow key={i} item={item}  selected={selected} onSelectItem={this.handlerRowSelect}>{this.props.children}</YodaGridRow>
                    })
                }
            </Grid>
        } else {
            return null
        }
    }
}

//YodaGridRow
export interface YodaGridRowProps {
    item?: any,
    children?: any[],
    selected?: boolean
    onSelectItem?: (item: any, selected: boolean) => void,
}
export class YodaGridRow extends React.Component<YodaGridRowProps, {}> {
    private handlerSelect = (e) => {
        if (this.props.onSelectItem) this.props.onSelectItem(this.props.item, !this.props.selected);
    }

    shouldComponentUpdate(nextProps: YodaGridRowProps, nextState) {
        return ShallowCompare(this, nextProps, nextState);
    }

    render() {
        return <Row className= {"yodaGrid-row " + ((this.props.selected) ? "yoda-selected" : "") } onClick={this.handlerSelect} >
            {React.Children.map(this.props.children, (com: any, j) => {
                const {dataField, mapDataToProps} = (com.props as any);
                return React.cloneElement(com, {
                    key: j,
                    value: ((!dataField && mapDataToProps) || dataField == "*") ? this.props.item : dataField ? this.props.item[dataField] : null
                })
            }
            ) }
        </Row>
    }
}

//YodaGridColumn
export interface YodaGridColumnProps extends ColProps {
    dataField?: string;
    mapDataToProps?: (boolean | string | ((value) => any));
    value?: string;
}
export class YodaGridColumn extends React.Component<YodaGridColumnProps, any>{
    render() {
        let display = null;
        const {dataField, mapDataToProps, value} = (this.props);

        if (React.Children.count(this.props.children) > 0) {
            let childprops: any = {};

            if (typeof mapDataToProps === "function") {
                let f = mapDataToProps as ((value) => any)
                if (f) childprops = f(value);
            } else if (typeof mapDataToProps === "string") {
                let s = mapDataToProps as string || dataField
                if (s) {
                    if (s === "...") {
                        Object.assign(childprops, value)
                    } else {
                        childprops[s] = value;
                    }
                }
            }

            display = React.Children.map(this.props.children,
                (com: any, j) => {
                    return React.cloneElement(com, Object.assign(childprops, com.props));
                });
        } else if (value) {
            display = value;
        }

        const colprops = Object.assign({}, this.props);
        delete colprops.children;
        delete colprops.dataField;
        delete colprops.value;
        delete colprops.mapDataToProps;

        return <Col className="yodaGrid-col" {...colprops}>{display}</Col>
    }
}
