import * as React from 'react';
import Search, {IProps as ISearchProps} from './AutoComplete';


/**
 * Embed a search text in an anchor
 */
export interface IState<T> {
    value: T[];
    isOpen: boolean;
}

export interface IProps<T> extends ISearchProps<T> {

}

export default class SearchAnchor<T> extends React.Component<IProps<T>, IState<T>>{
    constructor(props) {
        super(props);
        this.state = { value: null, isOpen: false }
    }

    protected toggleOpen = () => {
        this.setState(Object.assign({}, this.state, { isOpen: true }))
    }

    protected onChanged = (item: T[]) => {
        this.setState({
            value: item,
            isOpen: true
        }, () => {
            this.props.onChanged(item);
        });
    }

    protected onBlur = (event:Event) => {
        setTimeout(() => {
        this.setState({
            value: this.state.value,
            isOpen: false
        });
        }, 300);
    }

    protected getCaption (){

        return  this.state.value && this.state.value.length && this.state.value.length > 0  
                     ? this.state.value.map(i=>i[this.props.labelKey]).join(', ') 
                     : this.props.emptyLabel || 'No value';
    }

    render() {
        if (this.state.isOpen) {
            const searchProps = Object.assign({}, this.props, { onChanged: this.onChanged, defaultSelected: this.state.value });
            return <Search {...searchProps as any} onBlur={this.onBlur as any}/>
        }
        return <a style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>{this.getCaption()}</a>
    }
}
