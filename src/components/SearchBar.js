import React, { Component } from 'react'
import '../App.css'
import courseList from '../data/courses';

import Courses from './Courses';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: courseList
        }
    }

    handleChange = async (input) => {
        if (input === "") {
            this.setState({ filtered: courseList });
        } else {
            let result = [];
            result = await courseList.filter(course => {
                const courseName = course.dept.toLowerCase() + course.number;
                return courseName.includes(input.toLowerCase().replace(" ", ""));
            })
            this.setState({ filtered: result });
        }
    }

    render() {
        return (
            <>
                <div style={{ marginLeft: "3.1%" }}>
                    <i class="fas fa-search"></i>
                    <input type="text" className="input" placeholder="Filter the courses by typing the course code   e.g. cis110" onChange={e => { this.handleChange(e.target.value) }} style={{ width: "40%", height: "8%" }} />
                </div>

                <div id="limit-label" hidden>
                    {<u> <strong> Limit of 7 courses is reached </strong> </u>}
                </div>

                <div class='CoursesDiv'> <Courses filtered={this.state.filtered} /> </div>
            </>
        )

    }
}

export default SearchBar;