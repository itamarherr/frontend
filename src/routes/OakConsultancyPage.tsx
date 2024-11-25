import React from 'react'
import HomeImage from '/src/images/HomeImage.jpg'
import image3 from '/src/images/image3.jpg'

const OakConsultancyPage = () => {
  return (
    <>
    <h1 className="font-bold text-4xl mb-12 mt-12 text-center">Oak consultancy Services</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mx-8 lg:mx-16">
    <div className='flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 mx-8 lg:mx-16'>
            <img
             src={image3} 
             alt="Eco Survey"
             style={{ height: '800px', width: "600px"}}  
            className="w-full lg:w-1/2 h-auto rounded-lg shadow-lg mb-8 lg:mb-0"
             />   
             </div>
             <div>
     <div className="lg:w-1/1 space-y-6 text-justify">
        <p className='text-lg leading-relaxed'>
        Our Oak Consultancy services focus on preserving, assessing, and managing oak tree populations in urban and natural environments     
        </p>
        <p className='text-lg leading-relaxed'>
        From ecological impact assessments to customized care strategies, we’re dedicated to ensuring oak trees thrive as a valuable part of our ecosystem.
        </p>
        <h2 className="text-2xl font-bold mt-8">Why Choose Our Oak Consultancy Services?</h2>
        <ul className="space-y-2 text-lg list-disc list-inside">
            <li><span className="font-semibold">Expert Knowledge: </span> With years of expertise in oak tree biology and care, our specialists provide reliable insights and advice.</li>
            <li><span className="font-semibold">Conservation-Focused: </span> We aim to preserve and enhance oak populations, ensuring they remain healthy and resilient.</li>
            <li><span className="font-semibold">Customized Solutions: </span> Each consultation is tailored to the specific needs of the oak population in your area.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">Our Oak Consultancy Offerings</h2>
        <ul className="space-y-2 text-lg list-decimal list-inside pl-4">
            <li><span className="font-semibold">Health Assessments: </span> Evaluate the health and stability of oak trees in your area.</li>
            <li><span className="font-semibold">Impact Studies: </span> Understand how development or environmental changes may impact local oak populations.</li>
            <li><span className="font-semibold">Care Plans: </span> We offer ongoing support, creating actionable care plans to nurture and protect oak trees.</li>
        </ul >
       
        <h2 className="text-2xl font-bold mt-8">How It Works</h2>
        <ul className=" space-y-2 text-lg pl-4">
        <li><span className="font-semibold">Initial Consultation: </span> Discuss your specific oak-related needs and concerns.</li>
        <li><span className="font-semibold">Initial Consultation:</span> Our team conducts a thorough evaluation of the area and oak tree health.</li>
        <li><span className="font-semibold">Reporting::</span> Receive a detailed report with insights and actionable recommendations.</li>
        <li><span className="font-semibold">Follow-Up:</span> Guidance and support to help implement suggested care and preservation strategies.</li>
       </ul>
       </div> 
        </div>
        <button 
        className="bg-green-500
         text-white font-bold py-2 px-4 rounded 
         hover:bg-green-600 focus:outline-none focus:ring-2 
         focus:ring-green-500 focus:ring-opacity-50
         ml-20 mr-20 mb-11">
  Request an Oak Consultancy
   </button>
        </div>
        </>
  )
}

export default OakConsultancyPage