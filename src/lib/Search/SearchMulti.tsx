import * as React from 'react';
import Search, {IProps as IBaseSearchProps, IPropsFromDispatch, IPropsFromState} from './Search';
import {Button, Glyphicon} from 'react-bootstrap';
/**
 * Embed a search text in an anchor
 */

export interface IState<T> {
    value: T[];
}

export interface ISearchProps<T> extends IPropsFromState<T>, IPropsFromDispatch {
    onSelected: (items: T[]) => void;
    onReset?: (items: T[]) => void;
    placeholder?: string;
    minCharacters?: number;
    value?: T[];
    visibleItems?: number;
}

export interface IProps<T> extends ISearchProps<T> {
    nullValueDisplay?: string;
}

export default class SearchMulti<T> extends React.Component<IProps<T>, IState<T>>{
    constructor(props) {
        super(props);
        this.state = { value: [] }
    }

    protected toggleOpen = () => {
        this.setState(Object.assign({}, this.state, { isOpen: true }))
    }

    protected onSelect = (item: T) => {
        this.setState({
            value: (this.state.value || []).concat([item]),
        }, () => {
            this.props.onSelected(this.state.value);
        });
    }

    protected handleReset = (item: T[]) => {
        this.setState({
            value: this.state.value,
        });
    }

    protected removeValue = (ix: number) => {
        this.setState({
            value: this.state.value.slice(0, ix).concat(this.state.value.slice(ix + 1))
        })
    }

    render() {
        const prevValues = this.state.value &&
            this.state.value.map((item, i) => <Button key={i}
                style={{ marginRight: '1px' }}
                onClick={(e) => { e.preventDefault(); this.removeValue(i) } }>
                    {this.props.displayItem(item) }
                    {' '}
                    <Glyphicon glyph='remove'/>
            </Button>);

        const searchProps: IBaseSearchProps<T> = {
            items: this.props.items,
            onSelected: this.onSelect,
            onSearchAction: this.props.onSearchAction,
            value: null,
            searchedText: this.props.searchedText,
            displayItem: this.props.displayItem,
            clearAfterSelect: true,
            placeholder: this.props.placeholder

        }
        return <div>
            {prevValues}
            <Search style={{ display: 'inline-block', width: '250px' }} {...searchProps as any} onReset={this.handleReset as any}/>
        </div>
    }
}
