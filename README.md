# Project Management System

A Jira-inspired project management system built with Node.js, Express, and MySQL. This application provides a robust platform for managing projects, tasks, and team collaboration.

## Features

- User authentication and authorization
- Project management and tracking
- Task creation and assignment
- Team collaboration tools
- Real-time updates
- Responsive design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Pug (Template Engine)
- **Database**: MySQL
- **Authentication**: Express Session, bcryptjs
- **Development**: Nodemon for hot-reloading

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd project-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=project_management
   SESSION_SECRET=your_session_secret
   ```

4. Set up the database:
   ```bash
   # Create database and tables using the provided SQL scripts
   ```

## Running the Application


### Using Docker
```bash
docker-compose up
```

## Project Structure

```
project-management-system/
├── src/
│   ├── app.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── views/
├── public/
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## API Documentation

The API documentation is available at `/api-docs` when running the application.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or open an issue in the repository. 