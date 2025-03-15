import React from "react";
import { useNavigate } from "react-router-dom";
import HomeImage from "/src/assets/images/HomeImage.jpg";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleClickNewOrder = () => {
    navigate("/OaKConsultancyForm");
  };

  return (
    <div className="container mx-auto p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Eco Services</h1>
        <p className="text-lg test=gray-700">
          Preserving the environment, one oak at a time.
        </p>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <img
            src={HomeImage}
            alt="Eco Services"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        <div
          className="flex flex-col justify-center"
          style={{ height: "100%" }}
        >
          <h2 className="text-3xl font-bold mb-9">Oak Consultancy Services</h2>
          <p className="text-lg leading-relaxed mb-6">
            Our Oak Consultancy services focus on preserving, assessing, and
            managing oak tree populations in urban and natural environments.
            From ecological impact assessments to customized care strategies,
            we’re dedicated to ensuring oak trees thrive as a valuable part of
            our ecosystem.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            <strong>Oak Tree Care for Private & Public Spaces</strong>: Whether
            you're a homeowner nurturing trees in your private yard or a manager
            responsible for public green spaces, our consultancy services
            provide expert guidance. We tailor our approach to your specific
            needs, ensuring your trees remain healthy, resilient, and a thriving
            part of the environment.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            <strong>Pre-Construction Tree Care</strong>: Planning a construction
            project near your oak trees? We provide consultancy on how to
            protect and care for your trees before, during, and after
            construction to minimize stress and damage, ensuring they remain
            healthy.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            <strong>Tree Relocation Services</strong>: If you need to relocate
            an oak tree, our team can guide you through the process. We assess
            the feasibility, plan the relocation carefully, and provide
            aftercare strategies to help the tree establish itself in its new
            location.
          </p>
          <p className="text-lg leading-relaxed mb-6 h-full">
            <strong>Tree Health and Illness Consultation</strong>: Concerned
            about the health of your oak trees? We diagnose illnesses, recommend
            treatment options, and offer management plans to restore and
            maintain the vitality of your trees.
          </p>

          <p className="text-lg leading-relaxed mb-6 h-full">
            <strong>Ready to take care of your oak trees?</strong>: Register and
            Start your consultation today!
          </p>
          {isLoggedIn && (
            <button
              onClick={handleClickNewOrder}
              className="
            bg-green-500
             text-white font-bold py-2 px-4 rounded mt-6 
             hover:bg-green-600 focus:outline-none focus:ring-2 
             focus:ring-green-500 focus:ring-opacity-50"
            >
              Request Oak Consultancy
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
