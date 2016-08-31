import {CreatePromiseAction} from 'redux-helper';
import {connect} from 'react-redux';
import AutoCompleteAnchor from './AutoCompleteAnchor';
import AutoCompleteButton from './AutoCompleteButton';
import AutoComplete, {IAutoCompleteProps, IProps} from './AutoComplete';
import * as React from 'react';

export function connectedAutoCompleteTextBox<T>(select:(s)=>T[],action: CreatePromiseAction<string>,props?: IAutoCompleteProps<T>){
    const mstp = (s) => (Object.assign({}, props, {items:select(s)}));
    const mdtp = {onSearchAction: action};
    return connect(mstp,mdtp)(AutoComplete)
}

export function connectedAutoCompleteAnchor<T>(select:(s)=>T[],action: CreatePromiseAction<string>,props?: IAutoCompleteProps<T>){
    const mstp = (s) => (Object.assign({}, props, {items:select(s)}));
    const mdtp = {onSearchAction: action}
    return connect(mstp,mdtp)(AutoCompleteAnchor);
}

export function connectedAutoCompleteButton<T>(select:(s)=>T[],action: CreatePromiseAction<string>,props?: IAutoCompleteProps<T>){
    const mstp = (s) => (Object.assign({}, props, {items:select(s)}));
    const mdtp = {onSearchAction: action}
    return connect(mstp,mdtp)(AutoCompleteButton);
}


export {AutoComplete, AutoCompleteAnchor, AutoCompleteButton,IAutoCompleteProps,IProps}
