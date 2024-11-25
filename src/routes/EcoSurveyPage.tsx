import React from 'react'
import tailwind from './index.css'
import HomeImage from '/src/images/HomeImage.jpg'
import image1 from '/src/images/image1.jpg'
import { useNavigate } from 'react-router-dom'

const EcoSurveyPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <h1 className="font-bold text-4xl mb-12 mt-12 text-center">Eco Survey Services</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mx-8 lg:mx-16">
    <div className='flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 mx-8 lg:mx-16'>
            <img
             src={image1} 
             alt="Eco Survey"
             style={{ height: '800px', width: "600px"}}  
            className="w-full lg:w-1/2 h-auto rounded-lg shadow-lg mb-8 lg:mb-0"
             />   
             </div>
             <div>
     <div className="lg:w-1/1 space-y-6 text-justify">
        <p className='text-lg leading-relaxed'>
        Our Eco Survey Services provide in-depth environmental assessments
         to help individuals and businesses understand the ecological impact of their activities.      
        </p>
        <p className='text-lg leading-relaxed'>
        Whether you're planning a project or need to comply with environmental regulations, 
        our expert team offers tailored solutions to meet your needs.
        </p>
        <h2 className="text-2xl font-bold mt-8">Why Choose Our Eco Surveys?</h2>
        <ul className="space-y-2 text-lg list-disc list-inside">
            <li><span className="font-semibold">Comprehensive Analysis: </span>We cover a wide range of environmental factors, including soil, water, and biodiversity assessments.</li>
            <li><span className="font-semibold">Expert Team: </span>Our environmental specialists have years of experience in conducting accurate and reliable surveys.</li>
            <li><span className="font-semibold">Customized Reports: </span>Receive detailed, actionable insights to help guide your projects in an eco-friendly direction.</li>
            <li><span className="font-semibold">Sustainability Focused: </span>We prioritize sustainability and help you make informed decisions that benefit both your business and the environment</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Our Eco Survey Offerings</h2>
        <ul className="space-y-2 text-lg list-decimal list-inside pl-4">
            <li><span className="font-semibold">Biodiversity Surveys: </span>We discuss your project and its environmental requirements.</li>
            <li><span className="font-semibold">Soil and Water Quality Surveys: </span>Our team conducts a thorough analysis of the area.</li>
            <li><span className="font-semibold">Environmental Impact Surveys: </span> You’ll receive a detailed report with recommendations and findings.</li>
        </ul >
       
        <h2 className="text-2xl font-bold mt-8">How It Works</h2>
        <ul className=" space-y-2 text-lg pl-4">
        <li><span className="font-semibold">Initial Consultation: </span> We discuss your project and its environmental requirements.</li>
        <li><span className="font-semibold">On-Site Survey:</span> Our team conducts a thorough analysis of the area.</li>
        <li><span className="font-semibold">Report Delivery:</span> You’ll receive a detailed report with recommendations and findings.</li>
        <li><span className="font-semibold">Follow-Up:</span> We help guide you through the results and next steps.</li>
       </ul>
       </div> 
        </div>
        <button 
        onClick={()=> navigate("/EcoSurveyForm")}
        className="bg-green-500
         text-white font-bold py-2 px-4 rounded 
         hover:bg-green-600 focus:outline-none focus:ring-2 
         focus:ring-green-500 focus:ring-opacity-50
         ml-20 mr-20 mb-11">
  Request Ecological Survey
   </button>
        </div>
        </>
  )
}

export default EcoSurveyPage

