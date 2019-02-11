import React, { Component } from 'react'
import styled from 'styled-components';
import { AddShoppingCart } from 'styled-icons/material/AddShoppingCart';
import Popup from 'reactjs-popup';
import CartCourses from './CartCourses';
import '../App.css'
import courses from '../data/courses';

const Button = styled.button`
  color: white;
  background-color: #2471A3;
  cursor: pointer;
  padding-top: 5px;
  font-size: 12px;
  padding-bottom: 5px;
  padding-left: 40%;
  padding-right: 40%;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  :hover{
    background-color: #3498DB;
  };
`;

const hasNumber = (myString) => {
  return /\d/.test(myString);
}

const BSearch = (array, courseName, lo, hi) => {
  if (hi >= lo) {
    let mid = Math.floor((lo + hi) / 2)
    courseName = courseName.toUpperCase().replace(" ", "");
    if (courseName === array[mid]["dept"] + array[mid]["number"]) {
      return mid;
    } else if (courseName < array[mid]["dept"] + array[mid]["number"]) {
      return BSearch(array, courseName, lo, mid)
    } else {
      return BSearch(array, courseName, mid + 1, hi)
    }
  }

  return -1;
}

const gather = (obj) => {
  const coursesTest = Object.keys(obj);
  const filtered = [];
  coursesTest.forEach(course => {
    if (hasNumber(course)) {
      const index = BSearch(courses, course, 0, courses.length - 1);
      filtered.push(courses[index]);
    }

  })
  return filtered;
}

class Cart extends Component {

  constructor() {
    super();
    this.state = {
      test: null,
      filtered: []
    }
  }

  Tooltip = () => (
    <Popup
      trigger={open => (
        // <button className="button">Trigger - {open ? 'Opened' : 'Closed'}</button>
        <AddShoppingCart id="cart" style={{ cursor: 'pointer' }} color="#FBFCFC" size="40" />
      )}
      position="bottom right"
      closeOnDocumentClick
    >
      <span onClick={e => { this.setState({ test: null }) }}> <CartCourses filtered={gather(localStorage)} /> </span>
      <Button onClick={e => { this.props.history.push('./cart') }}> <strong> Check out </strong> </Button>
    </Popup>
  )



  render() {
    return (
      <>
        <div onClick={e => { this.setState({ test: null }) }}>
          {<this.Tooltip />}
        </div>
        </>
    )
  }
}

export default Cart;

