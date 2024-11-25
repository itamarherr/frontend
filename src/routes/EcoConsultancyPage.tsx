import React from 'react'
import image4 from '/src/images/image4.jpg'
import EcoConsultancyForm  from './forms/EcoConsultancyForm';
import { useNavigate } from 'react-router-dom';

const EcoConsultancyPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <h1 className="font-bold text-4xl mb-12 mt-12 text-center">Eco Consultancy Services</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mx-8 lg:mx-16">
    <div className='flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 mx-8 lg:mx-16'>
            <img
             src={image4} 
             alt="Eco Survey"
             style={{ height: '800px', width: "600px"}}  
            className="w-full lg:w-1/2 h-auto rounded-lg shadow-lg mb-8 lg:mb-0"
             />   
             </div>
             <div>
     <div className="lg:w-1/1 space-y-6 text-justify">
        <p className='text-lg leading-relaxed'>
        Our Ecological Consultancy service provides comprehensive insights and strategies to help businesses and individuals minimize environmental impacts. 
        </p>
        <p className='text-lg leading-relaxed'>
        Whether it’s biodiversity preservation, habitat restoration, or regulatory compliance, we’re here to guide you.
        </p>
        <h2 className="text-2xl font-bold mt-8">Why Choose Our Ecological Consultancy Services?</h2>
        <ul className="space-y-2 text-lg list-disc list-inside">
            <li><span className="font-semibold">Holistic Approach: </span>We evaluate the broader ecosystem and how various elements interact to create effective solutions.</li>
            <li><span className="font-semibold">Experienced Team: </span>Our team of ecologists brings extensive experience to each project, offering practical and science-based recommendations.</li>
            <li><span className="font-semibold">Sustainability Focused: </span>Our goal is to support long-term ecological health while meeting your project’s needs.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Our Ecological Consultancy Offerings</h2>
        <ul className="space-y-2 text-lg list-decimal list-inside pl-4">
            <li><span className="font-semibold">Biodiversity Assessments: </span>Identify and protect key species and habitats in your project area.</li>
            <li><span className="font-semibold">Habitat Restoration: </span>Develop strategies for restoring natural habitats impacted by human activities.</li>
            <li><span className="font-semibold">Environmental Compliance: </span> Guidance to ensure your project meets all relevant environmental regulations.</li>
        </ul >
       
        <h2 className="text-2xl font-bold mt-8">How It Works</h2>
        <ul className=" space-y-2 text-lg pl-4">
        <li><span className="font-semibold">Initial Consultation: </span> Discuss your project’s scope and environmental needs.</li>
        <li><span className="font-semibold">Field Study:</span> Our experts conduct on-site evaluations and ecological assessments.</li>
        <li><span className="font-semibold">Actionable Reports:</span> We provide detailed insights and recommendations for minimizing ecological impacts.</li>
        <li><span className="font-semibold">Ongoing Support:</span> Continued guidance to ensure the success of your sustainability goals.</li>
       </ul>
       </div> 
        </div>
        <button 
        className="bg-green-500
         text-white font-bold py-2 px-4 rounded 
         hover:bg-green-600 focus:outline-none focus:ring-2 
         focus:ring-green-500 focus:ring-opacity-50
         ml-20 mr-20 mb-11"
         onClick={() => navigate("/EcoConsultancyForm")}
         >
  Request Ecological consultancy
   </button>
        </div>
        </>
  )
}

export default EcoConsultancyPage