import React, { Component } from 'react';
import courses from '../data/courses'

const BSearch = (array, courseName, lo, hi) => {
    if (hi >= lo) {
        let mid = Math.floor((lo + hi) / 2)
        courseName = courseName.toUpperCase().replace(" ", "");
        courseName = courseName.replace("-", "");
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

class Description extends Component {
    constructor() {
        super();
        this.state = {
            index: null,
            credit: null,
            instructors: null
        }
    }

    gatherInfo = (courseName) => {
        fetch(`https://api.pennlabs.org/registrar/search?q=${courseName}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const courseData = data.courses;
                if (courseData.length === 0) {
                    this.setState({ credit: "N/A" })
                    localStorage.setItem("credit", "");
                    localStorage.setItem("recitation", "");
                    localStorage.setItem("instructors", "");
                    return;
                }

                // set credit and recitation
                this.setState({ credit: courseData[0]["credits"] })
                localStorage.setItem("credit", courseData[0]["credits"]);
                localStorage.setItem("recitation", courseData[0]["recitations"].length);

                // set instructors & class time
                let instructors = [];
                // let classTime = {};

                for (let i = 0; i < courseData.length; i++) {
                    if (courseData[i].activity === "REC") {
                        break;
                    }

                    courseData[i].instructors.forEach(instructor => {
                        if (!instructors.includes(instructor.name)) {
                            instructors.push(instructor.name);
                        }
                    })


                    // if (!classTime[name]) {
                    //     classTime[name] = [];
                    // }

                    // const meetings = courseData[i].meetings;

                    // meetings.forEach(meeting => {
                    //     let obj = {};
                    //     obj.sectionID = meeting["section_id_normalized"];
                    //     obj.startTime = meeting["start_time"];
                    //     obj.endTime = meeting["end_time"];
                    //     classTime[name].push(obj);
                    // })
                }

                // localStorage.setItem("classTime", classTime);
                localStorage.setItem("instructors", instructors);
            })
    }

    displayDescription() {
        const index = BSearch(courses, this.props.courseName, 0, courses.length - 1);
        return (
            <div>
                <strong> Course: {`${courses[index]["dept"]} ${courses[index]["number"]}`} </strong>
                <br></br>
                <br></br>
                Instructor(s): {localStorage.getItem("instructors") ? localStorage.getItem("instructors") : "N/A"}
                <br></br>
                <br></br>
                Description: {courses[index]["description"]}
            </div>
        )
    }

    displayPrereq() {
        const index = BSearch(courses, this.props.courseName, 0, courses.length - 1);
        if (courses[index]["prereqs"]) {
            return courses[index]["prereqs"].map(prereq => {
                return (
                    <li> {`${prereq}`} </li>
                )
            })
        }
        return (
            <div>
                No such thing. You are ready to take this course :)
            </div>
        )
    }

    displayCross() {
        const index = BSearch(courses, this.props.courseName, 0, courses.length - 1);
        if (!courses[index]["cross-listed"]) {
            return (
                <>
                    No
                </>
            )
        }

        return courses[index]["cross-listed"].map(elt => {
            return (
                <li> {`${elt}`} </li>
            )
        })
    }

    displayRecitation() {
        if (!localStorage.getItem("recitation")) {
            return (
                <div>
                    Recitation: N/A
                </div>
            )
        }
        return (
            <div>
                Recitation: Yes
            </div>
        )
    }

    displayClassTime() {
        for (let name in this.state.classTime) {
            this.state.classTime[name].forEach(meeting => {
                return (
                    <div>
                        Instructor: {name}
                        Section: {meeting.sectionID}
                        Start Time: {meeting.startTime}
                        End Time: {meeting.endTime}
                    </div>
                )
            })
        }
    }

    render() {
        if (!this.props.courseName) {
            return (
                <div>
                    You can see the description here by clicking on the course you want to know more about~
                </div>
            )
        }

        this.gatherInfo(this.props.courseName);

        // check if state changed?

        return (
            <div>
                {this.displayDescription()}
                <br></br>
                Pre-requisities: {this.displayPrereq()}
                <br></br>
                Cross-listed: {this.displayCross()}
                <br></br>
                <br></br>
                Credit: {this.state.credit}
                <br></br>
                <br></br>
                Recitation: {localStorage.getItem("recitation") ? "Yes" : "N/A"}
                <br></br>
                <br></br>
                {/* {this.displayClassTime()} */}
            </div>

        )
    }
}

export default Description;