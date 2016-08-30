import {CreatePromiseAction} from 'redux-helper';
import {connect} from 'react-redux';
import SearchAnchor from './SearchAnchor';
import SearchButton from './SearchButton';
import AutoComplete,{IPropsFromDispatch,IPropsFromState} from './AutoComplete';
import * as React from 'react';

type ValidType = React.ComponentClass<any> | React.StatelessComponent<any>;

const createCreator = <C extends ValidType>(compo: C) =>
    <T, S>(
        getItemsFromState: (state: S) => [string, T[]],
        onSearchAction: CreatePromiseAction<string>,
        displayItem: (item: T) => string
    ) => {

        const mapStateToProps = (state: S): IPropsFromState<T> => {
            const searchResult = getItemsFromState(state);
            return {
                displayItem,
                items: searchResult[1],
                searchedText: searchResult[0]
            }
        }

        const mapDispatchToProps: IPropsFromDispatch = {
            onSearchAction: onSearchAction
        }

        return connect(mapStateToProps, mapDispatchToProps)(compo);
    }


export const createSearchTextBox = createCreator(AutoComplete);

export const createSearchAnchor = createCreator(SearchAnchor);

export const createSearchButton = createCreator(SearchButton);

export {AutoComplete}
