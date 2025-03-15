
#  Eco Services – Frontend (React + TypeScript)

Eco Services is a **full-stack web application** that provides **oak tree consultancy services** for **private yard owners and public area managers**. This repository contains the **React frontend**, allowing users to **register, log in, submit orders, and track tree care recommendations**.

---

##  Tech Stack
-  **React 18** – Modern, type-safe frontend.
-  **Tailwind CSS** – Responsive UI with dark/light mode support.
-  **Axios** – Handles API requests to the backend.
-  **React Router** – Enables navigation and routing.
-  **Formik + Yup** – Manages form validation.
-  **Dark Mode Toggle** – Saves user theme preference.

---

##  Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/EcoServices-Frontend.git
cd EcoServices-Frontend
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Configure Environment Variables
```ini
VITE_API_BASE_URL="http://localhost:5000/api"
```
### 4️⃣ Run the Development Server
```sh
npm run dev
```
---

By default, the frontend will run at http://localhost:5173


This frontend communicates with the **EcoApiApp** backend using RESTful APIs.

Example API Call (src/api/Orders-api.ts):
```ts
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getOrders = async () => {
  return await axios.get(`${API_BASE_URL}/orders`);
};
   ```

##  Features
-  **Consultancy Form** – Users can submit oak tree consultations.
-  **JWT Authentication** – Secure login and registration.
-  **Order Tracking** – Users can track submitted orders & status.
-  **Dark Mode** – Fully responsive light/dark theme.

##  Deployment
To deploy the frontend, use

```sh
npm run build
```
Then, deploy the dist/ folder using Netlify, Vercel, or any static hosting provider.

## 📬 Contact
For support, email: itamarherr@gmail.com
