import * as React from 'react';
import {Button, Glyphicon, ButtonGroup, FormControl, ListGroup, ListGroupItem, OverlayTrigger, Popover} from 'react-bootstrap'
import {CreatePromiseAction, CreateAction} from 'redux-helper';
import * as _ from 'lodash';

const DEF_VISIBLE_ITEMS = 5;

export interface IPropsFromState<T> {
    items?: T[];
    searchedText?: string;
    displayItem?: (item: T) => string
}

export interface IPropsFromDispatch {
    onSearchAction?: CreatePromiseAction<string>
}

export interface IProps<T> extends IPropsFromState<T>, IPropsFromDispatch {
    onSelected: (item: T) => void;
    onReset?: (item: T) => void;
    placeholder?: string;
    minCharacters?: number;
    value?: T;
    visibleItems?: number;
    clearAfterSelect?:boolean;
    style?: React.CSSProperties;
}

export interface IState<T> {
    text: string,
    selectedIndex: number,
    firstVisibleIndex: number,
    value: T
    searchItems: { [key: string]: T[] }
}

export default class Search<T> extends React.Component<IProps<T>, IState<T>> {
    constructor(props: IProps<T>) {
        super(props);
        this.state = {
            text: props.value ? this.display(props.value) : '',
            selectedIndex: 0,
            firstVisibleIndex: 0,
            value: props.value,
            searchItems: {}
        };
    }

    private onSearchDebounced = _.debounce(this.props.onSearchAction, 300, { trailing: true });

    private display = (item: T) => (item !=null) ? this.props.displayItem(item) : '';

    componentWillReceiveProps(newProps: IProps<T>) {
        if (!this.state.searchItems[newProps.searchedText]) {
            this.setState({
                text: this.state.text,
                selectedIndex: this.state.selectedIndex,
                value: this.state.value,
                searchItems: Object.assign({ [newProps.searchedText]: newProps.items }, this.state.searchItems),
                firstVisibleIndex: this.state.firstVisibleIndex
            });
        }
    }

    private onKeyDown = (event: KeyboardEvent) => {
        const items = this.state.searchItems[this.state.text] || [];
        switch (event.keyCode) { }
        if (event.keyCode == 13) {
            event.preventDefault();
            this.onSelected();
        } else if (event.keyCode == 38) { 
            // Arrow Up
            event.preventDefault();
            if (this.state.selectedIndex != 0) {
                const ix = this.state.selectedIndex -1;
                const fi = Math.min (ix, this.state.firstVisibleIndex);
                this.setState(Object.assign({}, this.state, { selectedIndex: ix, firstVisibleIndex: fi}))
            }
        } else if (event.keyCode == 40) {
            event.preventDefault();
            if (this.state.selectedIndex < (items.length - 1)) {
                const ix = this.state.selectedIndex +1;
                const fi = Math.max ((ix - (this.props.visibleItems ||DEF_VISIBLE_ITEMS) +1 ), this.state.firstVisibleIndex);
                this.setState(Object.assign({}, this.state, { selectedIndex: ix, firstVisibleIndex: fi}))
            }
        } else if (event.keyCode == 27) {
            this.onReset();
        }
    }

    private onReset = () => {
        // start after 100 ms. to let onSelected work in case the list is clicked.
        setTimeout(() => {
            this.setState({
                text: this.display(this.state.value),
                value: this.state.value,
                searchItems: {},
                selectedIndex: 0,
                firstVisibleIndex: 0
            }, () => {
                if (this.props.onReset) {
                    this.props.onReset(this.props.value);
                }
            });
        }, 100);
    }

    private onSelected = (ix: number = this.state.selectedIndex) => {
        const items = this.state.searchItems[this.state.text] || [];
        const clear = this.props.clearAfterSelect || false;
        const sel = items[ix];
        this.setState({
            text: clear ? '' : this.display(sel),
            value: clear ? null :sel,
            selectedIndex: 0,
            firstVisibleIndex: 0,
            searchItems: this.state.searchItems
        }, () => {
            this.props.onSelected(sel);
        });;
    }

    private onChange = (elm) => {
        this.setState({
            text: elm.target.value,
            selectedIndex: this.state.selectedIndex,
            firstVisibleIndex: this.state.firstVisibleIndex,
            value: null,
            searchItems: this.state.searchItems
        }, () => {
            if (this.state.text.length >= this.props.minCharacters || 3) {
                if (!this.state.searchItems[this.state.text]) {
                    this.onSearchDebounced(this.state.text);
                }
            }
        });
    }



    render() {
        const items = this.state.searchItems[this.state.text] || [];
        const input = <FormControl  style={this.props.style} placeholder={this.props.placeholder || 'Enter some text'}
            autoFocus={true}
            onKeyDown={this.onKeyDown}
            onBlur = {this.onReset}
            type='text'
            value={this.state.text}
            onChange={this.onChange}/>;

        const ix = this.state.firstVisibleIndex;
        const cnt = this.props.visibleItems || DEF_VISIBLE_ITEMS;
        const list = items && (items.length > 0) && this.state.value == null ?
            <Popover id='pop'>
                <ListGroup>
                    {items.slice(ix, ix + cnt)
                        .map((item, i) => (
                            <ListGroupItem active={ (i + ix) == this.state.selectedIndex} key={i} onClick={
                                () => this.onSelected(i + ix)
                            }>
                                {this.display(item) }
                            </ListGroupItem>
                        )) }
                </ListGroup>
            </Popover> : <span id='test'/>

        return <OverlayTrigger trigger="focus" placement="bottom" overlay={list}>
            {input}
        </OverlayTrigger>

    }
}


