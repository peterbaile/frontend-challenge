# Penn Labs Frontend Challenge (Peter Chen)

### Instructions

* `cd` to the `local` directory
*  Run `sh deploy.sh` to start the React App
*  Please use Chrome to enable optimal user experience

--------------------

### General structure

```
public/
  index.html               Root HTML file for each page

src/                       Where the JS logic is
  components/              Contains all React components
    Cart.js                Basic component for the course cart
    CartCourses.js         Generate the courses listed in the cart
    CheckOutComponent.js   Basic component for the check-out page
    Courses.js             Basic component for rendering courses
    Description.js         Generate the description for each course
    HomeComponent.js       A wrapper component for the rendering of home page 
    Nav.js                 Basic component for the navbar
    SearchBar.js           Additional component for filtering courses

  data/                    Contains data rendered by the components
    courses.json           Contains information on CIS courses at Penn


  App.css                  CSS for the app
  App.js                   Root component for the app
  index.js                 Renders the React app
  ...
```

--------------------

### Features

1. __Explore courses__
  * All fields present in `src/data/courses.json` are rendered in the `Description` component, including Description, Pre-requisites, and Cross-listed
  * Use of algorithm: Binary Search is used to figure out the position of the course in `courses.json`
  * Display description: description of a particular course can be seen by clicking on the course bar
    * __Penn Labs API__ is also used to render other fields such as instructors, credit units, and recitations.
    * __Search Bar__ is also created to provide convenience for users. User can enter the course code to search for courses of similar names

2. __Add courses to your cart__
  * 7 courses can be added to the cart.
    * If the user tries to add more, a message will pop up
  * The change in the status of a course (add/ delete from the list) can be reflected through the course cart at the top right corner of the home page
    1. User can remove course from the course cart by simply clicking the __x__ button and the corresponding change will be reflected in the list of courses in place (without refreshing the page). 
    2. After adding the course, the add button will be disabled in-place
      * After removing the course from the cart, the add button will be enabled again.

3. __View cart and checkout__
  * User can click `check out` button at the bottom of the course cart to be redirected to the check-out page.
    * The label at the top indicates the the number of courses chosen
    * The course is displayed with relevant data
  * User can remove a course by clicking the __x__ button and corresponding changes will be reflected immediately
  * At the bottom of the page, the user can either check-out or return to the home page to continue their course selection
    * `Go back to Course Selection` button enables user to return to home page
    * `Confirm` button will return "sucess" if the number of courses chosen is smaller than or equal to 7. If there is no course chosen, the user will be redirected to home page to choose more courses.

4. __The Persistency of Data__
  * The list of courses present in the cart is stored in `Local Storage`. Therefore, even after refreshing the page, the list of courses that the user selects will still be kept.
    * It is normal if you see some greyed-out "add" buttons after refreshing. This is because your preference list consisted of the 7 courses is stored and the "add" buttons are disabled intentionally.

5. __In-place Modification__
  * Any modification will be reflected in the page without having to refresh.
    * To achieve this, `React lifecyle Methods` are used, such as `componentDidMount()`, to repeatedly render the page after state change

6. __Intuitive Interface__
  * With the apparent color changes on hover and easy-to-follow icons, this web is easy to use. 

--------------------

### Tools used

* For styling:
  * CSS files
  * CSS-in-JS
  * `styled-components`
  * `fontawesome`

* For state management:
  * Vanilla react state and props

* For navigation:
  * React Router

* Others:
  * `reactjs-popup` (for rendering pop-up windows)
  * Local Storage
