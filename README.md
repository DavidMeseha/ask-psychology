# Ask Pop

A Next.js web application with user authentication, admin functionality, and charting capabilities.

## Tech Stack

- Next.js
- TypeScript
- MongoDB (with Mongoose)
- NextAuth.js for authentication
- Tailwind CSS
- React Hook Form
- Zod for validation

## Features

- User authentication with multiple providers:
  - Google OAuth
  - Facebook OAuth
  - Email/Password
- Admin dashboard
- Question submission system
- Responsive design

## Prerequisites

- Node.js (Latest LTS version)
- MongoDB database
- Environment variables:
  ```
  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
  FACEBOOK_CLIENT_ID=
  FACEBOOK_CLIENT_SECRET=
  ADMIN_EMAIL=
  PERSONAL_EMAIL=
  ```

## Getting Started

1. Install dependencies:
```sh
npm install
```

2. Create a `.env.local` file with required environment variables

3. Run the development server:
```sh
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

- `/src/app` - App router routes and API endpoints
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and configurations
- `/src/models` - MongoDB models
- `/public` - Static assets

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT