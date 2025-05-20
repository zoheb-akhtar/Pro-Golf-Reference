# Pro Golf Reference

Welcome to **Pro Golf Reference**! This is a dynamic web application I created to track and explore professional golf player statistics based on the early 2025 golf season. Developed using a modern tech stack, the platform allows users to view comprehensive player profiles, rankings, and performance data with an intuitive and responsive design.

Check it out live [here](https://pro-golf-reference.vercel.app/).

## Features

- **Player Profiles:** Browse detailed player profiles featuring personalized data and statistics. <br />
- **Rankings:** View and filter player rankings based on various metrics such as world ranking, scoring average, and more. <br />
- **Responsive Design:** Optimized for a seamless user experience across all devices. <br />
- **Advanced Filtering and Sorting:** Easily sort and filter players by their league and/or country. <br />
- **Compare Players:** Pick two players and compare their stats side by side. <br />
- **Search Functionality:** Search players by name, country, or other attributes with real-time results. <br />

## Technologies Used

- **Frontend:** React.js, CSS, HTML <br />
- **Backend:** Node.js, Express.js <br />
- **Database:** PostgreSQL <br />
- **Deployment:** Heroku for backend hosting, Supabase for database hosting, and Vercel for frontend hosting <br />
- **Development Tools:** Postman, Git <br />

## Programming Techniques Used

- **Component-Based Architecture:** Using React.js, I structured the app with reusable components, promoting clean code and modularity. This makes it easier to maintain and scale the app. <br />
- **State Management:** Leveraged React’s `useState` and `useEffect` hooks for managing component states and handling side effects, like fetching player data or updating rankings. <br />
- **API Integration:** The app communicates with the backend using RESTful APIs built with Node.js and Express, allowing seamless interaction between the frontend and the PostgreSQL database. <br />
- **Pagination:** Efficiently paginates large datasets of players, displaying a manageable number of players per page. This limits the number of API calls, enhancing performance and reducing server load by fetching only the necessary data for each page. <br />

- **Responsive Web Design:** Applied SCSS with media queries to ensure that the app is responsive and provides an optimal experience across various devices, from desktop to mobile. <br />
- **Database Normalization:** Designed the PostgreSQL database schema to be normalized, minimizing redundancy and ensuring data integrity while enabling efficient queries. <br />
- **Error Handling:** Implemented robust error handling in both the frontend and backend to ensure smooth operation, including custom error messages for failed API calls and data retrieval issues. <br />
- **Async Data Fetching:** Used async/await syntax for fetching data asynchronously, improving the user experience by preventing UI blocking while loading data. <br />
- **Dynamic Search and Filtering:** Developed dynamic search and filter functionality that allows users to query data in real time, improving navigation and user interactivity. <br />
