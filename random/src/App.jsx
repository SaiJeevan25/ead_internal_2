import React, { useState } from "react";
import PasswordStrengthChecker from "./components/1Q";
import Placeholder from "./components/Placeholder";

const questionTexts = [
  `1. Design a React component that accepts a password from the user. The component should validate that the password contains at least 8 characters, one uppercase letter, one number, and one special character. Display the password strength dynamically as Weak, Medium, or Strong, and indicate the strength visually by changing the input field’s border color.`,
  `2. Design a Node.js and Express server to handle user registration. Implement the
following:
○ Create a route /register that accepts username and password from the request
body.
○ Store registered users in an in-memory array.
○ Return a JSON response confirming successful registration.`,
  `3. Develop a React component to display a list of students using a local array of objects
with fields name and marks. Implement pagination to display three students per page
with Next and Previous buttons. Ensure the displayed list updates correctly as the user
navigates between pages.`,
  `4. Build an Express Calculator API with a route /api/calc/:operation where operation can be
add, subtract, multiply, or divide. Accept two query parameters num1 and num2, perform
the calculation, and return the result as JSON. Handle invalid operations or missing
parameters.`,
  `5. Implement a React component to display a list of students with name and marks using a
Redux store. Include buttons to sort the students by marks in ascending or descending
order. Implement a Redux action and reducer to update the sorted list dynamically, and
ensure the UI reflects the sorted order immediately.`,
  `6. Create a MongoDB Atlas database called CollegeDB and a collection named Students.
Each document should have fields: name, rollNumber, marks, and department. Perform
the following operations:
○ Insert 5 student records into the collection.
○ Retrieve all students sorted by marks in descending order.
○ Update the marks of a student by roll number.
○ Delete a student document whose marks are below 40.
○ Display all remaining student records.`,
  `7. Implement a React login form with Username and Password input fields. Validate the
credentials against predefined values. Display an appropriate success or error message
based on the entered inputs. Use React state to handle form input values and feedback
messages dynamically.`,
  `8. You are managing a bookstore collection, BookInventory, with fields title (string), author
(string), category (string), availableCopies (number), and price (number). Insert at least
five sample documents and use the MongoDB aggregation framework to calculate the
total number of books available per category, the average price of books in each
category, and list all books in a specific category sorted by price in descending order.
Ensure all results are returned in JSON format.`,
  `9. Create a React component with two fields: password and confirm password. Validate
that the password meets strength requirements and confirm password matches the first
input. Show dynamic feedback messages for a weak password or a mismatch.`,
  `10. You are responsible for managing an online bookstore and need to maintain a
BookInventory collection with the following fields: title (string), author (string), category
(string), and availableCopies (number).
○ Insert at least 7 books with varying categories and stock levels.
○ Retrieve all books in the “Science Fiction” category.
○ Decrease the availableCopies by 1 for a book when it is purchased.
○ Delete all books that are out of stock (availableCopies = 0).`,
  `11. Design a React password input field that shows a checklist of password rules: minimum
length, uppercase, number, and special character. As the user types, each checklist item
should be marked green when satisfied, red when not.`,
  `12. Create a React component that opens a modal window when a button is clicked. Use
React Portals to render the modal outside the main DOM hierarchy. Include a close
button to hide the modal.`,
  `13. Develop an Express.js server with a route /greet/:name that generates a personalised
salutation for a user based on their name. The route should accept a query parameter
title (for example, /greet/John?title=Dr) and include it in the greeting. Ensure that the API
handles missing parameters gracefully and returns the response in JSON format.`,
  `14. Implement an Express.js server that maintains an in-memory product catalogue. Each
product has an ID, name, category, and price. Implement:
○ GET /products/:id – Retrieve a single product by ID.
○ POST /products – Add a new product from JSON body.`,
  `15. Develop an Express.js server that logs incoming requests, including the HTTP method,
requested URL, and timestamp. Implement two routes: GET /info, which returns a JSON
message "Server Information Route Accessed", and GET /status, which returns the
server status along with the current timestamp in JSON format. All other undefined
routes should respond with a 404 error in JSON. Ensure all responses are properly
formatted and the server handles requests.`
];

export default function App() {
  const [active, setActive] = useState(1);

  // Use this mapping to add real components as you build them
  const componentMap = {
    1: <PasswordStrengthChecker />,
    // 2: <RegisterComponent />, // when implemented
    // 3: <StudentsPagination />, // etc.
    // 12: <MyModalComponent />,
  };

  const ActiveComponent = componentMap[active] ?? (
    <Placeholder qNumber={active} />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col items-center p-6">
      {/* Glassmorphic Toggle Panel */}
      <div className="w-full max-w-4xl mt-6">
        <div className="mx-auto p-4 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 shadow-lg flex flex-wrap gap-3 justify-center">
          {[...Array(15)].map((_, i) => {
            const qNum = i + 1;
            const activeClass =
              active === qNum
                ? "bg-white/30 text-white scale-105"
                : "bg-white/8 text-gray-200 hover:bg-white/12";
            return (
              <button
                key={qNum}
                onClick={() => setActive(qNum)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeClass}`}
                aria-pressed={active === qNum}
                title={`Question ${qNum}`}
              >
                Q{qNum}
              </button>
            );
          })}
        </div>
      </div>
      <div className="items-center gap-10">

        {/* Question Card */}
        <div className="w-full  max-w-xl mt-8">
          <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-sm border border-white/10 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Question {active}</h3>
            <p className="text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">
              {questionTexts[active - 1]}
            </p>
          </div>
        </div>

        {/* Component render area */}
        <div className="w-full max-w-xl mt-8">{ActiveComponent}</div>
      </div>
    </div>
  );
}
