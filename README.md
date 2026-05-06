# Training Management Application

A modern, responsive React application designed for fitness professionals to manage training schedules and customer data. This project utilizes a centralized API architecture to handle asynchronous data fetching and complex data transformations for calendar and grid views.

---

## Key Features

*   **Training Calendar:** Interactive schedule view powered by **FullCalendar**, featuring monthly, weekly, and daily views.
*   **Dynamic Data Mapping:** Automatic transformation of raw API data into formatted calendar events.
*   **Asynchronous Name Resolution:** Efficiently resolves customer URLs into readable names within the calendar and data grid without compromising performance.
*   **Training Management:** Full CRUD capabilities for training sessions, including a customized **MUI DataGrid** for high-performance list management.
*   **Responsive UI:** Mobile-friendly design with flexible grid layouts and text-wrapping logic for smaller viewports.

---

## Tech Stack

| Category | Tools |
| :--- | :--- |
| **Framework** | React 18 (Vite) |
| **Language** | TypeScript |
| **Styling** | CSS3, Material UI (MUI) |
| **Date Handling** | Day.js, Intl.DateTimeFormat |
| **Components** | FullCalendar, MUI DataGrid |
| **API** | Fetch API with centralized utility pattern |

---

## 🏗️ Architecture & Logic

### Centralized API Pattern
The application follows a **DRY (Don't Repeat Yourself)** principle by housing all network requests in `trainingapi.ts`. This ensures that data fetching logic is consistent across the `Trainings` `Customers` and `Calendar` views.

### State-Driven Event Resolution
The calendar implements a "lazy-loading" style update for titles. It first renders training activities immediately, then iteratively fetches and injects customer names into the `events` state to ensure the UI remains responsive even during high-latency API responses.
