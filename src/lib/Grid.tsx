import * as React from 'react';

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
    constructor(props) {
        super(props)
    }

    private handlerSelect = (e: Event) => {
        if (this.props.onSelectItem) {
            this.props.onSelectItem(this.props.item, !this.props.selected);
        }
    }

    componentWillReceiveProps(nextProps: YodaGridRowProps, nextContext: any) {
    }

    render() {
        return <Row className= {"yodaGrid-row " + ((this.props.selected) ? "yoda-selected" : "") } onClick={this.handlerSelect} >
            {this.props.children.map((com, j) => {
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
    mapDataToProps?: (string | ((value) => any));
    value?: string;
}
export class YodaGridColumn extends React.Component<YodaGridColumnProps, any>{
    render() {
        let display = null;
        if (React.Children.count(this.props.children) > 0) {
            let childprops: any = {};

            if (typeof this.props.mapDataToProps === "function") {
                let f = this.props.mapDataToProps as ((value) => any)
                if (f) childprops = f(this.props.value);
            } else {
                let s = this.props.mapDataToProps as string || this.props.dataField
                if (s) childprops[s] = this.props.value;
            }
            display = React.Children.map(this.props.children,
                (com: any, j) => {
                    //return React.cloneElement(com, Object.assign(childprops, { edit: this.props.edit }));
                    return React.cloneElement(com, childprops);
                });
        } else if (this.props.value) {
            display = this.props.value;
        }

        const colprops = Object.assign({}, this.props);
        delete colprops.children;
        delete colprops.dataField;
        delete colprops.value;
        delete colprops.mapDataToProps;

        return <Col className="yodaGrid-col" {...colprops}>{display}</Col>
    }
}
