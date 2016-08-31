import * as React from 'react';
import Search,{IProps} from './AutoComplete';
import {Button} from 'react-bootstrap';
import SearchAnchor from './SearchAnchor';

export default class SearchButton<T> extends  SearchAnchor<T>{

    render(){   
        if (this.state.isOpen) {
            const searchProps = Object.assign({},this.props,{onChanged:this.onChanged,defaultSelected:this.state.value});
            return <Search {...searchProps as any} onBlur={this.onBlur as any}/>
        }

        return <Button onClick={this.toggleOpen}>{this.getCaption()}</Button>
    }
}





