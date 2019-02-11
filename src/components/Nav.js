import React, { Component } from 'react'
import styled from 'styled-components';

import '../App.css'
import Cart from './Cart';


const Wrapper = styled.section`
padding-top:3em;
padding-bottom:3em;
  background: #5DADE2
`;

class Nav extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <div class="Nav" id="left">
            <strong> Penn Course Cart </strong>
          </div>

          <div class="Nav" id="right-cart">
            <Cart history={this.props.history} />
          </div>
          
        </Wrapper>
      </div>
    )
  }
}


export default Nav;
