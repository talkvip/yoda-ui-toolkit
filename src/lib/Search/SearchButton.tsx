import * as React from 'react';
import Search,{IProps} from './Search';
import {Button} from 'react-bootstrap';

/**
 * Embed a search button
 */
export interface SearchButtonState<T> {
    value:T;
    isOpen:boolean;
}

export interface SearchButttonProps<T> extends IProps<T> {
    nullValueDisplay?: string;
}
export default class SearchButton<T> extends React.Component<SearchButttonProps<T>,SearchButtonState<T>>{
    constructor(props){
        super(props);
        this.state = {value:null,isOpen:false}
    }

    private toggleOpen =() =>{
        this.setState(Object.assign({},this.state,{isOpen:true}))
    }

    private onSelect = (item:T) => {
        this.setState({
            value: item,
            isOpen:false
        }, ()=>{
            this.props.onSelected(item);
        });
    }
    
    private handleReset = (item: T) => {
        this.setState({
            value: item,
            isOpen: false
        });
    }
    

    render(){   
        if (this.state.isOpen) {
            const searchProps = Object.assign({},this.props,{onSelected:this.onSelect,value:this.state.value});
            return <Search {...searchProps as any} onReset={this.handleReset as any}/>
        }
        return <Button onClick={this.toggleOpen}>
            {!this.state.value ?  this.props.nullValueDisplay || 'No value' :this.props.displayItem(this.state.value)}           
        </Button>
    }
}





