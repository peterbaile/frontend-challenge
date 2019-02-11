import React, { Component } from 'react'

import '../App.css'
import Nav from './Nav';
import SearchBar from './SearchBar';

class HomeComponent extends Component {
    render() {
        return (
            <>
                <Nav history={this.props.history}/>
                <SearchBar />
                <div style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0 calc(1rem + 10%)',
                }}>

                </div>
            </>
        )
    }
}


export default HomeComponent;
