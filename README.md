# Loudronline

Loudronline is a platform that resonates with African youth culture globally, fostering a community of creators, fans, and brands. It aims to redefine content creation and appreciation.

## Tech Stack

- Typescript
- Nextjs
- Tailwindcss
- Strapi
- Sqlite
- Stripe
- Chakra UI

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Nodejs v20.0.0
- npm v7.0.0

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/your-repo/loudronline.git
   ```

2. Navigate to the project directory

   ```sh
   cd loudronline
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

STRAPI_CLIENT_SECRET=your_strapi_client_secret
STRAPI_URL_BASE=your_strapi_url_base
STRAPI_WEBHOOK_SECRET=your_strapi_webhook_secret

### Running the Application

To start the application, run the following command:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `src/`: Contains the source code
  - `app/`: Next.js app directory
  - `components/`: React components
  - `utils/`: Utility functions
  - `assets/`: Static assets (fonts, icons)
- `public/`: Public assets

## API Integration

The project uses Strapi as its CMS. Ensure you have a Strapi instance set up and running.

## Styling

The project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.ts`.

## Deployment

The project is set up for deployment on Vercel. It includes Vercel Analytics and Speed Insights.

## Additional Notes

- The project uses custom fonts (Plus Jakarta and Larken)
- Mailchimp is integrated for newsletter subscriptions
- The `getData` function in `src/utils/helpers.tsx` is used for making API calls to Strapi

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
