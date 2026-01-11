# 🎬 Movie Master Pro

![Movie Master Pro Banner](https://movies-master-pro.web.app/)

**Movie Master Pro** is a modern, responsive, and feature-rich movie portal application designed to provide users with an immersive experience in exploring, collecting, and managing their favorite movies. Built with **React 19**, **Tailwind CSS v4**, and **DaisyUI**, it offers a sleek interface with seamless animations and specific user functionalities like watchlists and collections.

## 🔗 Live Demo

[**🚀 View Live Site**](https://movies-master-pro.web.app/)

---

## ✨ Key Features

- **🔐 User Authentication**: Secure Login and Registration system using **Firebase Authentication**.
- **🎥 Extensive Movie Library**: Browse "All Movies", "Top Rated", and filtered generic collections.
- **❤️ Favorites & Watchlist**: Users can add movies to their personal **Watchlist** and **My Collection**.
- **⭐ Dynamic Content**: Features like "Featured Collections", "Recently Added", and "Testimonials".
- **📊 Interactive Dashboard**: User feedback and statistics visualization using **Recharts**.
- **🎨 Modern UI/UX**: Fully responsive and dark-mode ready design using **Tailwind CSS 4** and **DaisyUI 5**.
- **⚡ High Performance**: Fast data fetching and caching with **TanStack Query**.
- **🔔 Real-time Notifications**: Toast notifications for user actions (Add to favorites, Login success, etc.).
- **💎 Premium Features**: Membership page logic and premium content sections.

---

## 🛠️ Technology Stack

### **Frontend**
- **React 19**: The latest version of the core UI library.
- **Vite**: Ultra-fast build tool and development server.
- **React Router v7**: For seamless client-side navigation.
- **TanStack Query (React Query)**: For efficient server state management.
- **Axios**: For making HTTP requests to the backend.

### **Styling & UI**
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development.
- **DaisyUI v5**: Component library for Tailwind CSS.
- **Framer Motion**: For complex and fluid animations.
- **Lucide React & React Icons**: For modern and scalable icons.

### **Backend & Services**
- **Firebase**: For Authentication and potentially Hosting/Database.
- **Node.js**: (Implied runtime environment).

### **Tools & Utilities**
- **ESLint**: For code quality and linting.
- **SweetAlert2 & React Toastify**: For beautiful alerts and notifications.
- **React Loading Indicators**: For loading states.

---

## 🚀 Run Locally

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have **Node.js** installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/rakib-hossain32/Movie-Master-Pro.git
cd Movie-Master-Pro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add your Firebase and API keys:

```env
VITE_API_URL=your_api_url_here
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server
```bash
npm run dev
```
The app will typically run at `http://localhost:5173`.

---

## 📂 Project Structure

```bash
Movie-Master-Pro/
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context API (Auth, Theme)
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Main layout wrappers
│   ├── pages/           # Application pages (Home, Dashboard, etc.)
│   ├── routes/          # Route definitions
│   └── main.jsx         # Entry point
├── public/              # Public static files
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

---

## 📦 Dependencies

| Package | Version |
| :--- | :--- |
| `react` | ^19.1.1 |
| `vite` | ^7.1.7 |
| `tailwindcss` | ^4.1.17 |
| `daisyui` | ^5.4.7 |
| `firebase` | ^12.5.0 |
| `react-router` | ^7.9.5 |
| `@tanstack/react-query` | ^5.90.16 |

---

## 🤝 Contribution

Contributions are welcome! If you'd like to improve this project:

1.  **Fork** the repository.
2.  Create a new branch (`git checkout -b feature-name`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature-name`).
5.  Open a **Pull Request**.

---

## 📞 Contact

For any inquiries or feedback, please contact:

- **Email**: rakibulhasanmd678@gmail.com
- **LinkedIn**: [Rakib Hossain](https://www.linkedin.com/in/rakib-hossain-md/)
- **GitHub**: [Rakib Hossain](https://github.com/rakib-hossain32)