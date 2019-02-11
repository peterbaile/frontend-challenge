import React, { Component } from 'react';
import styled from 'styled-components';
import '../App.css'

// styled components
const Wrapper = styled.section`
margin-bottom: 1em;
padding: 1em;
background: #AED6F1;
`;

class CartCourses extends Component {
    minusEventHandler(dept, number) {
        if (Object.keys(localStorage)) {
            localStorage.removeItem(`${dept}${number}`);
        }

        document.getElementsByName("add" + dept+number).forEach(button => { button.disabled = false });
    }


    displayCourses() {
        if (this.props.filtered.length === 0) {
            return (
                <></>

            )
        }
        return (this.props.filtered.map((course) => {
            return (
                <>
                    <div class="Courses-checkout" id="courses-checkout">
                        <Wrapper name={"wrapper" + course.number}>
                            <h4>{`${course.dept} ${course.number}: ${course.title}`}</h4>
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
                <div style={{marginLeft: '2%' }}>
                    <h2>{this.props.filtered.length + " courses selected"}</h2>
                </div>

                <div class='Courses' id='courses-checkout'> {this.displayCourses()} </div>
            </div>
        )

    }
}

export default CartCourses;
