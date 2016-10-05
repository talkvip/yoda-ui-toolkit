import * as React from 'react';
import 'react-bootstrap-typeahead/css/Token.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {CreatePromiseAction} from 'redux-helper';
import {debounce} from 'lodash';

let TH = require('react-bootstrap-typeahead').default;

export interface IPropsFromState<T> {
    /**
     * array<T>: Full set of options, including any pre-selected options.
     * this is usually injected by connect
     */
    items?: T[];
}

export interface IPropsFromDispatch {
    /**
     * callback: redux-helper CreatePromiseAction to be dispatched on search.
     * this is usually inhected by connect
     */
    onSearchAction?: CreatePromiseAction<string>
}

export interface IAutoCompleteProps<T> {
    /**
     * Callback fired whenever items are added or removed. Receives an array of the selected options.
     */
    onChanged?: (items: T[]) => void;
    /**
     * Callback fired when the input is blurred. Receives an event.
     */
    onBlur?: (event: Event) => void;
    /**
     * array<T>: The selected option(s) displayed in the input.
     */
    defaultSelected?: T | T[];

    /**
     * array<T>: The selected option(s) displayed in the input.
     */
    selected?: T | T[];
    /**
     * boolean: Whether or not multiple selections are allowed.
     */
    multiple?: boolean;
    /**
     * boolean: Whether to disable the input. Will also disable selections when multiple={true}.
     */
    disabled?: boolean;
    /**
     * boolean: Specify which option key to use for display. By default, the selector will use the label key.
     */
    labelKey?: string;
    /**
     * string: Placeholder text for the input.
     */
    placeholder?: string;
    /**
     * string: Message to display in the menu if there are no valid results.
     */
    emptyLabel?: string;
    /**
     * number: Maximum height of the dropdown menu, in px.
     */
    maxHeight?: number;
    /**
     * number: Maximum number of results to display by default. 
     * Mostly done for performance reasons so as not to render too many DOM nodes in the case of large data sets.
     */
    maxResults?: number;
    /**
     * number: Number of input characters that must be entered before showing results.
     */
    minLength?: number;
    /**
     * string: Name property for the input
     */
    name?: string;
    /**
     * string: Provides the ability to specify a prefix before the user-entered text to indicate that the selection will be new. No-op unless allowNew={true}.
     */
    newSelectionPrefix?: string;
    /**
     * boolean: Allows the creation of new selections on the fly. 
     * Any new items will be added to the list of selections, but not the list of original options unless handled as such by Autocomplete's parent. 
     * The newly added item will always be returned as an object even if the other options are simply strings, so be sure your onChange callback can handle this.
     */
    allowNew?: boolean;
    /**
     * boolean: Give user the ability to display additional results if the number of results exceeds maxResults.
     */
    paginate?: boolean;
    /**
     * string: Prompt displayed when large data sets are paginated.
     */
    paginationText?: string;
    /**
     * callback: Provides a hook for customized rendering of menu item contents.
     */
    renderMenuItemChildren?: (props: IProps<T>, option: T, index: number) => JSX.Element;
    /**
     *  callback: Provides a hook for customized rendering of tokens when multiple selections are enabled.
     */    
    renderToken?: (option: T, onRemove: () => void) => JSX.Element;
    /**
     * boolean: restrict the actual search to only when the length of the searched text is equal
     * to the minLength. 
     * The further filtering is done on the same dataset.
     */
    optimizeSearch? : boolean;
    /**
     * number: milliseconds to use in order to debounce the actual search.
     */
    debounceTime?: number;

    /**
     * return the reference to the actual typehead component.
     * on this instance you can execute methods like  focus();
     */

    inputRef?: (elem:any)=>any;

}

export interface IProps<T> extends IAutoCompleteProps<T>, IPropsFromState<T>, IPropsFromDispatch {

}

export interface IState<T> {
    selected: T[];
}

export default class AutoComplete<T> extends React.Component<IProps<T>, IState<T>> {

    private innerSearch: (term:string) => void;

    constructor(props: IProps<T>) {
        super(props);
        
        // If debounceTime is passed, we debounce the onSearchAction
        // if onSearchAction is not passed we don't use it.
        this.innerSearch = this.props.onSearchAction &&
                           props.debounceTime  
                           ? debounce(this.props.onSearchAction,this.props.debounceTime)
                           : this.props.onSearchAction

        this.state = {
            selected: props.selected ? [].concat(props.selected) :[] 
        }
    }

    componentWillReceiveProps (newProps:IProps<T>) {
        //TODO to optimize
        this.setState({
            selected: newProps.selected ? [].concat(newProps.selected) :this.state.selected
        });
    }


    private onSelected = (selected:T[]) => {
        this.setState({
            selected: selected
        }, ()=>{
            this.props.onChanged && this.props.onChanged(selected);
        });
    }

    private onInputChange = (text:string ) => {
        if (this.innerSearch) {
            if ( this.props.optimizeSearch) {
                if ( text.length == (this.props.minLength ||3)) this.innerSearch(text);
            } else {
                if ( text.length >= (this.props.minLength ||3)) this.innerSearch(text);
            }
        }
    }

    render() {
        const values = this.props.selected ? [].concat(this.props.selected) : [];
        const items = (this.props.items || []).concat(values);

        const props = {
            allowNew: this.props.allowNew,
            multiple: this.props.multiple,
            selected: this.state.selected, // this.props.defaultSelected && [].concat(this.props.defaultSelected),
            defaultSelected: this.props.defaultSelected,
            onInputChange: this.onInputChange,
            options: items,
            labelKey: this.props.labelKey,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            onChange: this.onSelected,
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
            renderToken: this.props.renderToken,
            ref: r=> this.props.inputRef &&  r && r.refs && r.refs.instance && this.props.inputRef (r.refs.instance)
        }

        return <TH {...props}  />
    }
}