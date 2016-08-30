import * as Redux from 'redux';
import {createPromiseAction, createAction, Action, CreateAction, CreatePromiseAction, checkedPromiseMiddleware} from 'redux-helper';

/* Actions */

export const searchSuccess = createAction<IState>('SEARCH_SUCCESS');

export const search = createPromiseAction('SEARCH', localSearch, searchSuccess);


/* Reducers */
export interface IState {
    data: QueryItem[],
    searchText: string
}

const reducer = (state: IState = { data: [], searchText: '' }, action: Action<IState>) => {
    if (searchSuccess.matchAction(action)) {
        return action.payload;
    }
    return state;
}

const mdw = Redux.applyMiddleware(checkedPromiseMiddleware());

export default Redux.createStore(reducer, window["devToolsExtension"] && window["devToolsExtension"](), mdw);

/* SELECTOR */

export const getItemsFromState = (state: IState): [string, QueryItem[]] => [state.searchText, state.data];


/* API */

function localSearch(search: string, location: string = 'milan, it', pageIndex: number = 0, pageSize: number = 100) {
    const offset = (pageIndex - 1) * pageSize;
    const actualQuery = `select * from local.search(${offset},${pageSize}) where query="${search}" and location="${location}"`;
    //const actualQuery = `select * from local.search(${offset},${pageSize}) where query="${search}" and latitude=45.46 and longitude=9.10`;
    const url = "https://restcountries.eu/rest/v1/name/" + search

    return (fetch(url).then(res => res.json()).catch(err => []))
        .then(res => {
            if (!Array.isArray(res)) {
                //ERROR - return empty result...
                return {
                    data:[],
                    searchText:search
                }
            }

            return {
                data: res as QueryItem[],
                searchText: search
            }
        });
}

export interface QueryItem {
    name: string;
    alpha3Code: string;

}
