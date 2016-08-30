import * as React from 'react';
import Search,{IProps} from './Search';
import {Button} from 'react-bootstrap';
import SearchAnchor from './SearchAnchor';

export default class SearchButton<T> extends  SearchAnchor<T>{

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





