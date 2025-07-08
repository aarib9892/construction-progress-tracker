# ProTrack - Construction Progress Tracking Dashboard

ProTrack is a modern, interactive web application designed to streamline progress tracking for construction projects. It provides a clear, hierarchical view of work items, real-time progress updates, and an AI-powered assistant to suggest next steps.

![image](https://github.com/user-attachments/assets/87e579c3-bab1-4d96-a9bc-75d97db14f9c)


## ✨ Core Features

-   **Tabbed Interface**: Organize work into "Typical Areas," "Other Areas (with Quantity)," and "Other Areas (without Quantity)."
-   **Hierarchical Accordion View**: Easily navigate through Floors, Flats, Areas, and down to individual Line Items.
-   **Real-time Progress Tracking**: Automatically calculated progress bars and percentages give an at-a-glance view of completion status.
-   **Smart Checkboxes**: Parent-child checkbox relationships allow for quick updating of entire sections. Checking a parent marks all its children as complete.
-   **Efficient Navigation**: Quick actions to expand/collapse all accordions, reset progress for the current tab, and save your work.
-   **Persistent State**: Progress is automatically saved to the browser's local storage, ensuring you can pick up where you left off.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **UI Library**: [React](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/)

### Installation & Setup

1.  **Install dependencies:**
    From the project's root directory, run:
    ```bash
    npm install
    ```


3.  **Run the Development Servers:**

    -   **To run the Next.js application:**
        ```bash
        npm run dev
        ```
        The application will be available at `http://localhost:3000`.


## 📂 Project Structure

The project follows a standard Next.js App Router structure with some key directories:

```
.
├── src/
│   ├── app/                # Next.js pages, layouts, and route definitions
│   ├── components/
│   │   ├── core/       # Core application components (Dashboard, Hierarchy, etc.)
│   │   └── ui/             # Reusable UI components from ShadCN
│   ├── data/               # Mock data for the application
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── store/              # Zustand state management stores
│   └── types/              # TypeScript type definitions
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

## 📜 Available Scripts

In the `package.json` file, you can find several useful scripts:

-   `npm run dev`: Starts the Next.js development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server after a build.
-   `npm run lint`: Lints the project files using Next.js's built-in ESLint configuration.
