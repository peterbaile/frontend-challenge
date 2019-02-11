import React, { Component } from 'react'
import styled from 'styled-components';
import courses from '../data/courses';

// import components
import CheckOutCourses from './CheckOutCourses';


const Wrapper = styled.section`
padding-top:3em;
padding-bottom:3em;
  background: #5DADE2
`;

const Button = styled.button`
margin-top: 1%;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 2%;
  color: white;
  font-size: 15px;
  background-color:#2E86C1;
  cursor: pointer;
  padding: 10px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  :hover{
    background-color: #3498DB;
    color: white;
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

class Nav extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <div class="Nav" id="left">
                        <strong> Penn Course Cart (Checkout) </strong>
                    </div>
                </Wrapper>
            </div>
        )
    }
}


class CheckOutComponent extends Component {
    constructor() {
        super();
        this.state = {
            test: null,
            filteredCourses: gather(localStorage)
        }
    }

    handleConfirm() {
        if (this.state.filteredCourses.length > 0) {
            alert("success");
        } else {
            alert("Error: Please select at least 1 course");
            this.props.history.push('./');
        }
    }

    render() {
        return (
            <>
                <Nav history={this.props.history} />
                <div style={{ marginTop: '2%', marginLeft: '2%' }}>
                    <h2> {`${this.state.filteredCourses.length} Course(s) Selected`} </h2>
                </div>
                <div onClick={e => { this.setState({ filteredCourses: gather(localStorage) }) }} >
                    <CheckOutCourses filtered={this.state.filteredCourses} />
                </div>

                <Button onClick={e => { this.props.history.push('./') }}> Go back to Course Selection </Button>
                <Button onClick={e => { this.handleConfirm() }}> Confirm </Button>
            </>
        )
    }
}


export default CheckOutComponent;
