import React, { Component } from 'react';
import styled from 'styled-components';
import courses from '../data/courses';
import '../App.css'

// styled components
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
        if (hasNumber(course)) {
            const index = BSearch(courses, course, 0, courses.length - 1);
            filtered.push(courses[index]);
        }

    })
    return filtered;
}

class CheckOutCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: null,
            cartedCourse: gather(localStorage)
        }
    }

    minusEventHandler(dept, number) {
        if (Object.keys(localStorage)) {
            localStorage.removeItem(`${dept}${number}`);
        }

        this.setState({cartedCourse: gather(localStorage)})
    }

    displayPreReq(prereqs){
        if (!prereqs){
            return (
                <>
                No
                </>
            )
        }

        return prereqs.map(prereq => {
            return (
                <li> {`${prereq}`} </li>
            )
        })
    }

    displayCross(cross){
        if (!cross){
            return (
                <>
                No
                </>
            )
        }

        return cross.map(elt => {
            return (
                <li> {`${elt}`} </li>
            )
        })
    }

    displayCourses() {
        if (this.state.cartedCourse.length === 0) {
            return (
                <></>
                
            )
        }
        return (this.state.cartedCourse.map((course) => {
            return (
                <>
                    <div class="Courses-checkout" id="courses-checkout">
                        <Wrapper>
                            <h4>{`${course.dept} ${course.number}: ${course.title}`}</h4>
                            Description: {course.description}
                            <br/>
                            <br/>
                            Prerequisites: {this.displayPreReq(course.prereqs)}
                            <br/>
                            <br/>
                            Cross-listed: {this.displayCross(course["cross-listed"])}
                            <i class="fas fa-times" id="remove-checkout" onClick={e => { this.minusEventHandler(course.dept, course.number) }}></i>
                        </Wrapper>
                    </div>


                </>
            )
        }))
    }

    render() {
        return (
            <div>
                <div class='Courses' id='courses-checkout'> {this.displayCourses()} </div>
            </div>
        )

    }
}

export default CheckOutCourses;
