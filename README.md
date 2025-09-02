**Better Dining Hall Menu** is a modern web application designed to improve the usability and visual appeal of dining hall menus for students. The app allows users to effortlessly check menus by location, meal type, and date, featuring rotating daily items and always-available options.

This project leverages **Next.js**, **TypeScript**, and **Tailwind CSS**, focusing on providing a seamless and aesthetically pleasing user experience.

## Features

- **Menu Browsing**: View dining hall menus by location, meal type, and date.
- **Search & Filter**: Quickly find specific menu items.
- **Allergen Information**: Get detailed allergen data for each menu item.
- **Dark Mode**: Toggle between light and dark themes for user preference.
- **Community Interaction**: Rate and comment on menu items.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - Custom CSS components for enhanced design.
- **Backend**:
  - [Python](https://www.python.org/) with [FastAPI](https://fastapi.tiangolo.com/)
  - Hosted on [Render](https://render.com/).
- **Database**: PostgreSQL for menu data storage and management.
- **Email Notifications**: Integrated using [Mailgun](https://www.mailgun.com/).

## Project Structure

```
better-dining-hall-menu/
├── backend/               # FastAPI backend code
├── frontend/              # Next.js frontend
├── database/              # PostgreSQL setup and data scripts
├── scrapper.py            # Script to scrape dining hall data
├── dining_menu.json       # Static menu data file
├── README.md              # Project documentation
└── .env.example           # Example environment variables
```

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- PostgreSQL (v13+)
- Render account for deployment (optional)

### Clone the Repository

```bash
git clone https://github.com/yourusername/better-dining-hall-menu.git
cd better-dining-hall-menu
```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up the environment variables using `.env.example` as a guide.

4. Run the FastAPI server:

   ```bash
   uvicorn main:app --reload
   ```

5. (Optional) Visit the live API documentation at `http://127.0.0.1:8000/docs`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:3000`.

### Database Setup

1. Create a new PostgreSQL database.
2. Apply the schema defined in the `database/` directory.
3. Populate the database with sample data using the `scrapper.py` script.

## API Endpoints

Base URL: [https://better-dining-hall-menu.onrender.com](https://better-dining-hall-menu.onrender.com/)

### Example Endpoints

- `/allergens`: Get all allergen data.
- `/menu`: Fetch dining hall menu by filters.

For full API documentation, visit `/docs`.

## Future Features

- Integration of dynamic user accounts and preferences.
- Push notifications for menu updates.
- AI-powered recommendations based on user preferences.

## Contributions

Contributions are welcome! Please follow the standard [fork and pull request workflow](https://docs.github.com/en/get-started/quickstart/contributing-to-projects).

## License

This project is licensed under a custom license. See the [LICENSE](LICENSE) file for details.
