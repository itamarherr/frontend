import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">About Eco Services</h1>
      <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-12">
        Preserving the environment, one oak at a time.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🌍 Introduction</h2>
        <p className="text-lg leading-relaxed">
          Welcome to <strong>Eco Services</strong>, an end-to-end <strong>full-stack</strong> web application 
          dedicated to <strong>oak tree consultancy and preservation</strong>. This platform is built as a 
          <strong> final project</strong> for a Full-Stack development course, implementing a <strong>React frontend</strong> 
          and a <strong>.NET Core backend</strong> with a <strong>SQL database</strong>. 
          Users can request consultations, manage their orders, and receive expert guidance on oak tree care.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🛠️ Tech Stack & Architecture</h2>
        <ul className="list-disc pl-6 text-lg leading-relaxed">
          <li><strong>Frontend:</strong> React (TypeScript), Tailwind CSS, Formik + Yup, Axios, React Router.</li>
          <li><strong>Backend:</strong> ASP.NET Core Web API, Entity Framework Core, SQL Server, JWT Authentication.</li>
          <li><strong>Other Features:</strong> Role-Based Access Control (RBAC), RESTful API, Dark/Light Mode.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">👤 User Roles & Permissions</h2>
        <ul className="list-disc pl-6 text-lg leading-relaxed">
          <li><strong>Regular Users:</strong> Can create orders, view their history, update profile.</li>
          <li><strong>Admins:</strong> Can manage users and orders through an admin panel.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🌿 Key Features</h2>
        <ul className="list-disc pl-6 text-lg leading-relaxed">
          <li><strong>Home Page:</strong> Introduces Eco Services and available consultancy options.</li>
          <li><strong>Authentication:</strong> JWT-based login and registration with secure API calls.</li>
          <li><strong>Consultancy Form:</strong> Users can request oak tree assessments with dynamic pricing.</li>
          <li><strong>Order Management:</strong> Users can track their orders, while admins can approve or reject them.</li>
          <li><strong>Dark/Light Mode:</strong> Users can toggle themes for better accessibility.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">💾 Database Design</h2>
        <p className="text-lg leading-relaxed">
          The SQL Server database stores all users, orders, and related data.
        </p>
        <ul className="list-disc pl-6 text-lg leading-relaxed">
          <li><strong>Users Table:</strong> Stores user details, roles, and authentication info.</li>
          <li><strong>Orders Table:</strong> Contains all consultancy requests and their statuses.</li>
          <li><strong>Admin Notes:</strong> Stores administrative actions on orders.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🔗 API Endpoints</h2>
        <ul className="list-disc pl-6 text-lg leading-relaxed">
          <li><strong>POST /api/auth/register:</strong> User registration.</li>
          <li><strong>POST /api/auth/login:</strong> User authentication (returns JWT token).</li>
          <li><strong>POST /api/orders:</strong> Create a new order.</li>
          <li><strong>GET /api/orders/my-orders:</strong> Retrieve current user’s orders.</li>
          <li><strong>PUT /api/orders/{`{id}`}</strong>: Update an existing order.</li>
          <li><strong>DELETE /api/orders/{`{id}`}</strong>: Remove an order.</li>
          <li><strong>GET /api/admin/orders:</strong> Fetch all orders (admin only).</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🚀 Future Enhancements</h2>
        <ul className="list-disc pl-6 text-lg leading-relaxed">
          <li>Cloud Deployment (Azure/AWS) for better scalability.</li>
          <li>Email Notifications for order updates.</li>
          <li>Real-Time Chat Feature for expert consultation.</li>
          <li>Improved Mobile Responsiveness for a seamless experience.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🔚 Conclusion</h2>
        <p className="text-lg leading-relaxed">
          <strong>Eco Services</strong> is a fully functional **full-stack** application providing 
          **end-to-end tree consultancy services**. Built using **modern web technologies**, 
          it offers a **seamless user experience**, dynamic forms, authentication, and 
          a structured backend with API communication.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          This project showcases **strong full-stack development skills**, handling **backend logic, frontend UI, authentication, API integration, and database management**.
        </p>
        <p className="text-lg leading-relaxed font-semibold mt-6">
          🌳 Ready to start your oak tree consultation? <br />
          <a href="/" className="text-green-700 dark:text-green-300 underline">
            Get Started Now!
          </a>
        </p>
      </section>
    </div>
  );
};

export default About;
