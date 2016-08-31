import {CreatePromiseAction} from 'redux-helper';
import {connect} from 'react-redux';
import SearchAnchor from './SearchAnchor';
import SearchButton from './SearchButton';
import AutoComplete, {IPropsFromDispatch, IPropsFromState, IAutoCompleteProps, IProps} from './AutoComplete';
import * as React from 'react';

export * from './AutoComplete';

export function connectedAutoCompleteTextBox<T>(select:(s)=>T[],action: CreatePromiseAction<string>){
    const mstp = (s) => ({items:select(s)});
    const mdtp = {onSearchAction: action}
    return connect(mstp,mdtp)(AutoComplete);
}

export function connectedAutoCompleteAnchor<T>(select:(s)=>T[],action: CreatePromiseAction<string>){
    const mstp = (s) => ({items:select(s)});
    const mdtp = {onSearchAction: action}
    return connect(mstp,mdtp)(SearchAnchor);
}

export function connectedAutoCompleteButton<T>(select:(s)=>T[],action: CreatePromiseAction<string>){
    const mstp = (s) => ({items:select(s)});
    const mdtp = {onSearchAction: action}
    return connect(mstp,mdtp)(SearchButton);
}


export {AutoComplete, SearchAnchor, SearchButton}
