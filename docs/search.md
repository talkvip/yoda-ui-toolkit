# Search component
wrap a [react-bootstrap-typeahead](https://github.com/ericgio/react-bootstrap-typeahead) react component and provides
features like:

* connect to redux using [redux-helper](https://github.com/vgmr/redux-helper) action promise creators and redux selectors.
* optimize behavior reducing the actual number of data requests (throught optimization and debouncing)
* provide high order components to create Anchors and buttons instead of a text box.
* provide a raw version of the control (strongly typed).

## Autocomplete
wrap on react-bootstarp-typeahead

> usage

```js
    import {Autocomplete} from 'yoda-ui-toolbox';
    <Autocomplete {...props}/>    
```

### Props

Name | Type | Default | Description
-----|------|---------|------------
align | string | 'justify' | Specify menu alignment. The default value is `justify`, which makes the menu as wide as the input and truncates long values. Specifying `left` or `right` will align the menu to that side and the width will be determined by the length of menu item values.
allowNew | boolean | false | Allows the creation of new selections on the fly. Any new items will be added to the list of selections, but not the list of original options unless handled as such by `Typeahead`'s parent. The newly added item will *always* be returned as an object even if the other options are simply strings, so be sure your `onChange` callback can handle this.
defaultSelected | array | `[]` | Specify any pre-selected options. Use only if you want the component to be uncontrolled.
disabled | boolean | | Whether to disable the input. Will also disable selections when `multiple={true}`.
emptyLabel | string | 'No matches found.' | Message to display in the menu if there are no valid results.
labelKey | string | 'label' | Specify which option key to use for display. By default, the selector will use the `label` key.
maxHeight | number | `300` | Maximum height of the dropdown menu, in px.
maxResults | number | `100` | Maximum number of results to display by default. Mostly done for performance reasons so as not to render too many DOM nodes in the case of large data sets.
minLength | number | `0` | Number of input characters that must be entered before showing results.
multiple | boolean | `false` | Whether or not multiple selections are allowed.
name | string | | Name property for the input
newSelectionPrefix | string | 'New selection:' | Provides the ability to specify a prefix before the user-entered text to indicate that the selection will be new. No-op unless `allowNew={true}`.
onBlur | function | | Callback fired when the input is blurred. Receives an event.
onChange | function | | Callback fired whenever items are added or removed. Receives an array of the selected options.
onInputChange | function | | Callback fired when user-input text changes. Receives the text string.
items | array | | Full set of options, including any pre-selected options. usually injected by _connect_
paginate | boolean | `true` | Give user the ability to display additional results if the number of results exceeds `maxResults`.
paginationText | string | 'Display additional results...' | Prompt displayed when large data sets are paginated.
placeholder | string | | Placeholder text for the input.
renderMenuItemChildren | function | | Provides a hook for customized rendering of menu item contents.
renderToken | function | | Provides a hook for customized rendering of tokens when multiple selections are enabled.
searchedText | string | | Last seacthed text, usually injected by _connect_
onSearchAction | function | | redux-helper CreatePromiseAction to be dispatched on search, usually injected by _connect_
optimizeSearch | boolean | | Restrict the actual search to only when the lenght of the searched text is equal to the minLength. The further filtering is done on the same dataset.
debounceTime | number | | milliseconds to use in order to debounce the actual search.

## createSearchTextBox

Create a TextBox autocomplete component connected to redux.

```js
    createSearchTextBox <T, S>(
        getItemsFromState: (state: S) => [string, T[]],
        onSearchAction: CreatePromiseAction<string>,
        options?: IAutoCompleteProps<T>
    ) => typeof Autocomplete
```

### Arguments:

Name | Type | Description
-----|------|-----------
getItemsFromState | function (state;S) =>[string,t[]] | redux selector that returns an array where the 1st element is the searched text and the 2ns is the data array
onSearchAction | function | redux-helper promise action that needs to be dispatched on search.
options        | object | Autocomplete props

## createSearchAnchor

Same as createSearchTextBox but will create an anchor instead of a textbox

## createSearchButton

Same as createSearchTextBox but will create a button instead of a textbox

