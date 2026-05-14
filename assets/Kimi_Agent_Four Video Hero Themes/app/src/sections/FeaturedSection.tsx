import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedSectionProps {
  caption: string;
  headline: string;
  body: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  bgColor?: string;
}

export default function FeaturedSection({
  caption,
  headline,
  body,
  ctaText,
  imageSrc,
  imageAlt,
  reversed = false,
  bgColor = '#3e3d3a',
}: FeaturedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const content = el.querySelectorAll('.featured-animate');
    gsap.set(content, { opacity: 0, y: 50 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-[7vw]"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`max-w-[1200px] mx-auto flex flex-col ${
          reversed ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center gap-12 md:gap-16`}
      >
        {/* Image */}
        <div className="featured-animate w-full md:w-[55%]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto object-cover"
            style={{ aspectRatio: '4/3' }}
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-[45%]">
          <p className="featured-animate caption-text mb-4">{caption}</p>
          <h2 className="featured-animate font-display text-[7vw] md:text-[5vw] uppercase text-[#d1cfb9] leading-[1.1] mb-6">
            {headline}
          </h2>
          <p className="featured-animate font-body text-[1rem] md:text-[1.125rem] font-light text-[#a7a37d] leading-[1.7] max-w-[400px] mb-8">
            {body}
          </p>
          <button className="featured-animate btn-outlined !border-[#d1cfb9] !text-[#d1cfb9]">
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
