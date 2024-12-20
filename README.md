# CS-465-Portfolio
CS-465 Full Stack Development I.

- Code
  - [Application Backend Server](./app_server/)
  - [Application APIs](./app_api/)
  - [Application Admin Portal](./app_admin/)
- Assignments
  - [Software Design Document](CS%20465%20Software%20Design%20Document.pdf)
  - [Project Reflection](#project-reflection)
    - [Architecture](#architecture)
    - [Functionality](#functionality)
    - [Testing](#testing)
    - [Reflection](#reflection)

## Project Reflection

### Architecture

###### Compare and contrast the types of frontend development you used in your full stack project, including Express, HTML, JavaScript, and the single-page application (SPA)

One part of the site used Express, HTML, and JavaScript to display web pages. Routes and controllers were created with Express and JavaScript to handle browser requests for specific pages. Express would then either serve static HTML files or dynamically generate pages using Handlebars templates, which were populated with data retrieved from the database. These tools worked together seamlessly to process server requests and deliver the appropriate content to the frontend.

The Angular portion of the project functioned differently. On the initial load, the entire single-page application (SPA) was sent to the client. Once loaded, all rendering and code execution occurred on the client side within the browser, with calls to the backend made only when data needed to be fetched from the database.

With Express, server calls were made frequently, as each page load or refresh required fetching the relevant resources from the server. In contrast, with the SPA, the initial load time was longer because all necessary assets were fetched at once from the backend. However, after that first load, no additional server requests were required for navigation between pages within the SPA.

###### Why did the backend use a NoSQL MongoDB database?

Because MongoDB is highly scalable and supports fast querying. Its document-based storage structure closely aligns with JSON formatting, making it an excellent choice for integration with frontend applications.

### Functionality

###### How is JSON different from JavaScript and how does JSON tie together the frontend and backend development pieces?

JSON is a standardized format for structuring data that can be utilized across various programming languages. In JavaScript, JSON is commonly used to define objects. It plays a crucial role in connecting the frontend and backend through APIs. RESTful APIs, in particular, rely on JSON to handle requests and deliver responses, enabling seamless communication between the client and server.

#### Provide instances in the full stack process when you refactored code to improve functionality and efficiencies and name the benefits that come from reusable user interface (UI) components

One example of enhancing functionality through refactoring was replacing certain static HTML pages with dynamic templates created using Handlebars. This approach enabled the reuse of a consistent page structure while allowing the displayed content to be updated dynamically. Another improvement involved migrating the content used to populate these templates from static JSON files stored in the codebase to a MongoDB database. This change made it possible to add or modify content data without needing to redeploy the website or make changes to the codebase.

### Testing

Request and retrieval methods require thorough API endpoint testing, which becomes more complex when additional layers of security like JWT are involved.

###### Explain your understanding of methods, endpoints, and security in a full stack application

HTTP methods define the types of interactions a client can have with a server. Common HTTP methods include GET, POST, PUT, and DELETE. These methods are used by clients to communicate with the server via API endpoints. In the context of this full-stack application, security involved authenticating users and providing them with a valid JSON Web Token (JWT), enabling them to access certain protected endpoints.

### Reflection

###### How has this course helped you in reaching your professional goals?

This course has provided me with valuable insights into how full-stack applications are designed and built. Throughout the course, I was continuously introduced to the principles of web development and the full-stack application development process. I gained experience working with essential web technologies, including the Express and Angular frameworks, as well as MongoDB. As I continue my journey toward becoming a professional full-stack software developer, I believe the work I completed during this course will serve as a strong foundation for future projects, where I can apply similar frameworks and methodologies demonstrated in this course.  

###### What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course has significantly enhanced my JavaScript skills through hands-on practice. It also provided me with the opportunity to use JavaScript on the backend with Node.js and Express. Given that knowledge of Node.js is frequently listed as a required or preferred skill in many job postings, I am glad to have gained a solid understanding of this in-demand technology.

