import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft , ChevronRight } from 'lucide-react'
import Autoplay from "embla-carousel-autoplay";

const FeatureCarousel = ({ features }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align:"center",
  },
 [
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    }),
  ]);

  return (
    <div className="relative mt-10">
      {/* Buttons */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 z-10  bg-black/10
                            backdrop-blur-sm
                            border border-black/20
                            rounded-full
                            p-2
                            hover:bg-black/15
                            cursor-pointer
                            transition"
      >
        <ChevronLeft size={26}/>
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-0 top-1/2 z-10  bg-black/10
                            backdrop-blur-sm
                            border border-black/20
                            rounded-full
                            p-2
                            hover:bg-black/15
                            cursor-pointer
                            transition"
      >
        <ChevronRight size={26}/>
      </button>

      {/* Carousel */}
      <div
        className="overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex-[0_0_80%] md:flex-[0_0_33%] px-4"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                 <h3 className="mt-4 text-xl font-semibold">
                  {feature.title}
                </h3>
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="h-40 mx-auto"
                />

               

                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCarousel;