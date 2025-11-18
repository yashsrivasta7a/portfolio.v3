"use client"
import React from 'react'
import Card from '@/components/Card.jsx'

function FeaturedPage() {
  return (
  <div>
  <div className="satoshi5 text-3xl mt-10 tracking-widest items-center flex justify-center mb-6">
    FEATURED PROJECTS
  </div>
  {/* <div className="grid md:grid-cols-2 gap-10 mx-10 md:mx-32"></div> */}
  <div className="md:grid md:grid-cols-2 gap-10 mx-10 md:mx-40 mb-40">
    <Card size="sm"  className="col-span-2"  title="AI-Powered Mock Interviews with" title2='InterviewD' textColor='#562ea3' content="InterviewD is a cutting-edge interview preparation platform that combines artificial intelligence, real-time video feedback, and comprehensive assessment tools to help candidates prepare for technical interviews. Our platform uses advanced AI technology to create realistic interview scenarios,providing personalized feedback and helping candidates improve their interview skills."/>
    <Card size="lg" title="Dynamic Playlists Powered by" shadowTo="#a855f7" shadowFrom="#a855f7" image='/images/projects/auroraplay.png'  title2='Weather & Spotify' textColor='#64319e'  gradientEnd='#64319e' gradientStart='#361b62' content='Real-time weather insights meet intelligent music curation, delivering personalized listening experiences whenever you need them.' />
    <Card size="lg"  title="Streamlined Digital Presence for" shadowTo="#123d95" shadowFrom="#123d95" image='/images/projects/adquora.png'  title2='AdQuora' textColor='#123d95'  gradientEnd='#123d95' gradientStart='#061b52' content='A sleek, conversion-focused website designed to highlight AdQuora’s marketing expertise, service offerings, and client success metrics.' />
    <Card size="lg" title="From Resume to Website in" shadowTo="#035476" shadowFrom="#a63f1a" image='/images/projects/showfolio.png'  title2='One Click' textColor='#035476'  gradientEnd='#1E2233' gradientStart='#035476' content='Showfolio simplifies personal branding by converting resumes into stylish, responsive portfolio sites built for professionals.' />
    <Card size="lg" title="Share, Organize & Discover. All in your" shadowTo="#035476" shadowFrom="#a63f1a" image='/images/projects/es.png'  title2='Essential Space ' textColor='#52B9C8'  gradientEnd='#52B9C8' gradientStart='#035476' content='A modern platform for organizing notes, links, and ideas with intelligent search and one-click summaries, plus secure public/private sharing.' />
    <Card size="lg" title="Create & Curate AI Art with" shadowTo="#a63f1a" shadowFrom="#a63f1a" image='/images/projects/dreampix.png'  title2='DreamPix' textColor='#ff5418'  gradientEnd='#ff5418' gradientStart='#e05c2c' content='An immersive platform that generates unique images from text, featuring a personalized gallery, user accounts, and a polished, modern interface.' />
    <Card size="lg" title="Life-Saving Connections, Powered by" shadowTo="#a855f7" shadowFrom="#a855f7" image='/images/projects/flow4life.png'  title2='Tech' textColor='#ef4444'  gradientEnd='#7b2222' gradientStart='#ef4444' content='A seamless platform that enables users to request blood, find nearby donors, chat in real time, and stay updated with instant notifications.' />
  </div>
</div>

    
  )
}

export default FeaturedPage