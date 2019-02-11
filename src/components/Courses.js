import React, { Component } from 'react';
import styled from 'styled-components';
import courses from '../data/courses';
import '../App.css'

// import components
import Description from './Description';

// styled components
const Button = styled.button`
  color: white;
  background-color:#2E86C1;
  cursor: pointer;
  padding: 10px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
`;

const Wrapper = styled.section`
margin-bottom: 2em;
padding: 2em;
background: #AED6F1;
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
      if (hasNumber(course)){
          const index = BSearch(courses, course, 0, courses.length - 1);
          filtered.push(courses[index]);
      }
      
  })
  return filtered;
}

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCourse: null,
      cartedCourse: gather(localStorage)
    }
  }

  eventHandler(dept, number) {
    this.setState({ selectedCourse: `${dept}-${number}`, selectedCourseNumber: number });
  }

  addEventHandler(dept, number) {
    if (document.getElementsByName("add" + dept+number)[0].disabled === true) {
      return;
    }

    if (this.state.cartedCourse.length >= 7) {
      document.getElementById("limit-label").hidden = false;
      return;
    }

    document.getElementById("limit-label").hidden = true;

    localStorage.setItem(`${dept}${number}`, "registered");

    document.getElementsByName("add" + dept+number).forEach(button => { button.disabled = true });

    this.setState({cartedCourse: gather(localStorage)});
  }

  minusEventHandler(dept, number) {
    document.getElementById("limit-label").hidden = true;
    if (Object.keys(localStorage)) {
      localStorage.removeItem(`${dept}${number}`);
    }

    document.getElementsByName("add" + dept+number).forEach(button => { button.disabled = false });

    this.setState({cartedCourse: gather(localStorage)});
  }

  displayCourses() {
    if (this.props.filtered.length === 0) {
      return (
        <Wrapper> No match courses </Wrapper>
      )
    }

    return (this.props.filtered.map(({ dept, number, title }) => {
      return (
        <Wrapper id="wrapperCourseButton" onClick={e => { this.eventHandler(dept, number) }} name={"wrapper" + dept+number}>
          {`${dept} ${number}: ${title}`}
          <div class="Courses" id='right' >
            <Button id="minusCourseButton" name={"minus" + dept+number} onClick={e => { this.minusEventHandler(dept, number) }}> <i class="fas fa-minus"></i> </Button>
          </div>
          <div class="Courses" id="right">
            <Button id="addCourseButton" name={"add" + dept+number} onClick={e => { this.addEventHandler(dept, number) }} > <i class="fas fa-plus"></i></Button>
          </div>
        </Wrapper>
      )
    }))
  }

  componentDidMount(){
    this.disableEdit();
  }

  disableEdit(){
    this.state.cartedCourse.map(course => {
      document.getElementsByName("add" + course.dept+course.number).forEach(button => { button.disabled = true });
    })
  }

  render() {
    return (
      <div>
        <div class='Courses' id='courses'> {this.displayCourses()} </div>
        <div class='Courses' id='description'> <Description courseName={this.state.selectedCourse} /> </div>
        
      </div>
    )

  }
}

export default Courses;
