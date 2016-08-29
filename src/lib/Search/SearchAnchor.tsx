import * as React from 'react';
import Search, {IProps} from './Search';


/**
 * Embed a search text in an anchor
 */
export interface SearchAnchorState<T> {
    value: T;
    isOpen: boolean;
}

export interface SearchAnchorProps<T> extends IProps<T> {
    nullValueDisplay?: string;
}

export default class SearchAnchor<T> extends React.Component<SearchAnchorProps<T>, SearchAnchorState<T>>{
    constructor(props) {
        super(props);
        this.state = { value: null, isOpen: false }
    }

    private toggleOpen = () => {
        this.setState(Object.assign({}, this.state, { isOpen: true }))
    }

    private onSelect = (item: T) => {
        this.setState({
            value: item,
            isOpen: false
        }, () => {
            this.props.onSelected(item);
        });
    }

    private handleReset = (item: T) => {
        this.setState({
            value: item,
            isOpen: false
        });
    }

    render() {
        if (this.state.isOpen) {
            const searchProps = Object.assign({}, this.props, { onSelected: this.onSelect, value: this.state.value });
            return <Search {...searchProps as any} onReset={this.handleReset as any}/>
        }
        return <a style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>
            {!this.state.value ? this.props.nullValueDisplay || 'No value' : this.props.displayItem(this.state.value) }
        </a>
    }
}
