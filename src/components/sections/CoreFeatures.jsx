import React from 'react'
import {motion} from 'motion/react'
import { features } from '../../data/corefeatures'
import useEmblaCarousel from "embla-carousel-react";
import FeatureCarousel from '../ui/FeatureCarousel.jsx';
const CoreFeatures = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
});
  
  return (
    <motion.section initial={{opacity:0 , y:30,scale:0.95}} whileInView={{opacity:1,y:0 ,scale:1 }} transition={{duration:0.7}} viewport={{amount:0.5}}  className='pt-4 justify-center'>
        <div className="flex flex-col text-center">
                <h2  className='text-7xl font-semibold '>Core Features</h2>
       
          <FeatureCarousel  features={features}/>
                
 

          </div> 
    </motion.section>
  )
}

export default CoreFeatures
  