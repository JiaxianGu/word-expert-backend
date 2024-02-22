# Word Expert - Backend

This repository contains the backend code for Word Expert, a vocabulary management app designed for English learners to enhance their vocabulary by searching for word meanings and managing personalized word lists.

## Technology Stack

- **Server**: [Express.js](https://expressjs.com/) is used for setting up the server, providing a robust set of features for web and mobile applications.
- **Database**: [PostgreSQL](https://www.postgresql.org/) serves as the relational database for storing user data and word lists.
- **Database Abstraction**: [Knex.js](http://knexjs.org/) is utilized for building SQL queries and managing the database schema, migrations, and seeds.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/): Ensure Node.js is installed on your machine to run the server.
- [PostgreSQL](https://www.postgresql.org/): Ensure PostgreSQL is installed and running on your machine for the database.

### Running the Server Locally

Follow these steps to get the backend server running on your local machine:

1. **Clone the repository**

```bash
git clone https://github.com/JiaxianGu/word-expert-backend.git
cd word-expert-backend
```

2. **Install dependencies**
```
npm install
```
3. **Configure the local database.**
Edit the `knexfile.js` under the root directory to configure your database connection. Set the following variables to match your local PostgreSQL setup
```
DB_USER = 'your_database_user';
DB_NAME = 'your_database_name';
DB_HOST = 'localhost';
DB_PORT = '5432';
```
4. **Run database migrations.**
This step creates the necessary tables in your database.
```
npm run migrate-latest
```

5. **Start the development server**
```
npm run dev
```

The backend server should now be running on http://localhost:8080.

### Frontend Integration
For a complete setup and to utilize the full features of the app, the frontend needs to be set up as well. Visit the frontend repository for instructions: [Word Expert Frontend Repository](https://github.com/JiaxianGu/word-expert-frontend).

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/JiaxianGu/word-expert-backend/blob/main/LICENSE) file for details.