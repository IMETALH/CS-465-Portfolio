# cs465-fullstack
CS-465 Full Stack Development with MEAN Stack


## Architecture
The frontend development technology stack used in the full stack project includes Express HTML, Angular, JavaScript, MongoDB, and the single-page application (SPA)

### Express HTML vs. JavaScript

Express HTML focuses on server-side rendering and content structure.
JavaScript focuses on client-side interactivity, dynamic updates, and asynchronous data handling..
They worked together, with Express rendering initial content and JavaScript enhancing user interaction.

### JavaScript vs. Single-Page Application (SPA)
JavaScript and SPAs.
SPAs take JavaScript usage further by creating a seamless user experience without full page reloads.
SPAs rely heavily on JavaScript frameworks to manage complex UI components and handle dynamic updates.

MongoDB was used for various reasons.
The flexibility of Schema:
MongoDB is a schema-less database, which means that it doesn't require a predefined schema for data storage. This flexibility is particularly useful when dealing with rapidly evolving data models or projects where the structure of data might change frequently. MongoDB is very scalability and it is a Document-Oriented Model: MongoDB uses a document-oriented data model, where data is stored in JSON-like documents. This closely resembles the data structures used in modern programming languages, making it intuitive for developers to work with. It's especially beneficial when dealing with complex or nested data used like the data used in this project.

Aggregation Framework: MongoDB's aggregation framework provides powerful tools for performing complex data manipulations, transformations, and aggregations within the database. This can improve performance by reducing the amount of data transferred between the database and the application.

Support for Unstructured Data: MongoDB's ability to handle unstructured or semi-structured data is advantageous for data that doesn't fit neatly into a tabular structure. This can include data like text, images, or geospatial information.

Real-time Data Processing: MongoDB's support for real-time data processing and change streams allows applications to react to data changes as they happen. This is particularly valuable for building features like real-time notifications or live updates.

Developer Productivity: MongoDB's query language and APIs are developer-friendly, allowing for quick and easy retrieval and manipulation of data. This sped up development and iteration cycles.

Adoption in Modern Tech Stacks: MongoDB is widely used in modern tech stacks, and its popularity means that there's a good chance that developers working on the project are familiar with it.


## Functionality
JSON (JavaScript Object Notation) and JavaScript are related concepts, but they serve different purposes and are used in different contexts in these projects. JSON is a lightweight data-interchange format that is easy for both humans and machines to read and write. It is used to represent structured data in a text format. JSON is language-independent, meaning it can be used with many programming languages, not just JavaScript.

JavaScript is a versatile programming language used primarily for creating interactive and dynamic content on web pages. It is commonly used in front-end development to enhance user experience through animations, interactivity, and client-side logic.

Code Refactoring for Improved Efficiency: Some API endpoint is being called multiple times with similar parameters, leading to redundant data retrieval and slowing down the application. I refactored the code to implement caching for the API responses. I used a caching library to store the fetched data temporarily and retrieve it from the cache when the same request is made again within a certain timeframe. I also refactored the function into smaller, more focused functions with descriptive names. Each subtask is encapsulated within a separate function.

## Testing: API Testing and Security Challenges
Methods and Endpoints: An API defines how different software components or systems communicate with each other.
Methods (HTTP Verbs):
HTTP methods, also known as HTTP verbs, define the type of operation that a client wants to perform on a resource. Common HTTP methods include:
GET: Retrieve data from the server.
POST: Send data to the server to create a new resource.
PUT: Update an existing resource on the server.
DELETE: Delete a resource on the server.

Unit Testing: Tested individual API methods to ensure they behave as expected. For example, test that a "POST" request to a certain endpoint creates a new resource.

Integration Testing:
Tested the interactions between different components or systems to ensure they work seamlessly together. For example, test whether authentication and authorization mechanisms are functioning correctly.

Mocking and Faking:
Use mock data or mock services to simulate interactions and responses for APIs that are not fully developed or are dependent on external services.
