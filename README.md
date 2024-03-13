# Private Jet Analysis Fullstack Project Overview

This is Next.js application designed to compare private jets based on various metrics using OpenAI's GPT-3.5. It allows users to select jets and a comparison category, then displays a ranked list of jets based on the selected metric. The project utilizes Prisma with a PostgreSQL database for data management and TailwindCSS for styling.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/helizaga/jet.ai.git
   cd jet.ai
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following content, replacing placeholders with your actual database URL and OpenAI API key:

   ```plaintext
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   OPENAI_API_KEY="your_openai_api_key"
   ```

4. Run the Prisma migrations to set up your database schema:

   ```bash
   npx prisma migrate dev
   ```

5. (Optional) Import sample jet data into your database:
   ```bash
   npx tsx importCsv.ts
   ```

### Running the Application

- To start the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

- Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

- To build the application for production:

  ```bash
  npm run build
  # or
  yarn build
  ```

- To start the production server:
  ```bash
  npm start
  # or
  yarn start
  ```

## Example `.env` File

```plaintext
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
OPENAI_API_KEY="your_openai_api_key"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials and `your_openai_api_key` with your actual OpenAI API key.
