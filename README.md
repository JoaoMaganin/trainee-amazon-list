# Find Amazon Products

## 📝 About The Project

This application is a full-stack web application developed as part of a Trainee selection process. The goal is to demonstrate skills in developing an API with **Bun** and a reactive frontend with **Vite**, by consuming and displaying data scraped in real-time from a web page.

The application allows a user to enter a keyword, which is then used to scrape the first page of Amazon Brazil's search results, displaying the found products in an organized manner.

## ✨ Features

-   Search for products on Amazon Brazil by keyword.
-   Scraping of data such as: Title, Star Rating, Number of Reviews, and Image URL.
-   Backend REST API to serve the scraped data in JSON format.
-   User-friendly interface to perform searches and view the results cleanly.

## 🚀 Technologies Used

This project was built using a modern JavaScript/TypeScript ecosystem.

### **Backend**
-   **Runtime:** [Bun](https://bun.sh/)
-   **Server:** [Express.js](https://expressjs.com/)
-   **HTTP Requests:** [Axios](https://axios-http.com/)
-   **HTML Parsing:** [JSDOM](https://github.com/jsdom/jsdom)

### **Frontend**
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Markup & Styling:** HTML5 & CSS3 (Vanilla)

## ⚙️ Prerequisites

Before you begin, you will need to have [Bun](https://bun.sh/docs/installation) installed on your machine.

## 🔧 Setup and Installation

Follow the steps below to set up the development environment.

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/[YOUR_REPOSITORY].git
    ```

2.  **Navigate to the project folder:**
    ```sh
    cd trainee-amazon-list
    ```

3.  **Install Backend dependencies:**
    ```sh
    cd backend
    bun install
    ```

4.  **Install Frontend dependencies:**
    ```sh
    cd ../frontend 
    # Return to the root and enter the frontend folder
    bun install
    ```

## ▶️ Running the Application

To run the application, you will need **two terminals** open simultaneously, one for the backend and one for the frontend.

1.  **Terminal 1: Start the Backend Server**
    ```sh
    # From the /backend folder
    cd backend
    bun run src/index.ts
    ```
    > The server will be running at `http://localhost:3000`.

2.  **Terminal 2: Start the Frontend Server**
    ```sh
    # From the /frontend folder
    cd frontend
    bun dev
    ```
    > Vite will start the development server, usually at `http://localhost:5173`.

Open the frontend URL in your browser, type in a product name, and click "Serach" to see the magic happen!

---

## ⚠️ Disclaimer

This project was created strictly for educational purposes and as a demonstration of technical skills. Web scraping sites like Amazon may go against their Terms of Service. This project should not be used for commercial or large-scale purposes.

---

Made by **JoaoMaganin**.
