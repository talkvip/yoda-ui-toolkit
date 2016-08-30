import * as React from 'react';
import 'react-bootstrap-typeahead/css/Token.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {CreatePromiseAction} from 'redux-helper';

let TH = require('react-bootstrap-typeahead').default;

export interface IPropsFromState<T> {
    items?: T[];
    searchedText?: string;
    displayItem?: (item: T) => string
}

export interface IPropsFromDispatch {
    onSearchAction?: CreatePromiseAction<string>
}

export interface IProps<T> extends IPropsFromState<T>, IPropsFromDispatch {
    onChanged: (items:T[]) => void;
    onBlur?: (event:Event)=>void;
    defaultSelected?: T|T[];
    multiple?: boolean;
    disabled?: boolean;
    labelKey?: string;
    placeholder?: string;
    emptyLabel?: string;
    maxHeight?: number;
    maxResults?: number;
    minLength?:number;
    name?: string;
    newSelectionPrefix?: string;
    paginate?: boolean;
    paginationText?: string;
    renderMenuItemChildren?: (props:IProps<T>, option:T, index:number) => JSX.Element;
    renderToken?:(option:T, onRemove:()=>void)=>any;
}

export interface IState<T> {
    
}


export default class Typeahead<T> extends React.Component<IProps<T>, IState<T>> {
    constructor(props: IProps<T>) {
        super(props);
    }

    render() {
        const values = this.props.defaultSelected ? [].concat(this.props.defaultSelected) :[];
        const items = (this.props.items||[]).concat(values);

        const props = {
            multiple: this.props.multiple,
            defaultSelected: this.props.defaultSelected  && [ ].concat(this.props.defaultSelected),
            onInputChange: this.props.onSearchAction,
            options: items,
            labelKey:this.props.labelKey,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            onChange: this.props.onChanged,
            onBlur: this.props.onBlur,
            emtpyLabel: this.props.emptyLabel,
            maxHeight: this.props.maxHeight,
            maxResults: this.props.maxResults,
            minLength: this.props.minLength,
            name: this.props.name,
            newSelectionPrefix: this.props.newSelectionPrefix,
            paginate: this.props.paginate,
            paginationText: this.props.paginationText,
            renderMenuItemChildren: this.props.renderMenuItemChildren,
            renderToken: this.props.renderToken
        }

        return <TH {...props}  />
    }
}