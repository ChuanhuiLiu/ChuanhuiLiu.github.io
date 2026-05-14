import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoBackground from '@/components/VideoBackground';

gsap.registerPlugin(ScrollTrigger);

interface BrandStatementSectionProps {
  headline: string;
  body: string;
  ctaText: string;
  videoSrc: string;
}

export default function BrandStatementSection({
  headline,
  body,
  ctaText,
  videoSrc,
}: BrandStatementSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const children = el.children;
    gsap.set(children, { opacity: 0, y: 50 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden flex items-center justify-center">
      <VideoBackground
        src={videoSrc}
        parallax
        overlay
        overlayColor="rgba(0,0,0,0.55)"
      />

      <div
        ref={contentRef}
        className="relative z-10 text-center px-[7vw] py-32 max-w-[800px] mx-auto"
      >
        <h2 className="font-display text-[7vw] md:text-[5vw] uppercase text-[#d1cfb9] leading-[1.1] mb-8">
          {headline}
        </h2>
        <p className="font-body text-[1rem] md:text-[1.125rem] font-light text-[#a7a37d] leading-[1.7] mb-10 max-w-[600px] mx-auto">
          {body}
        </p>
        <button className="btn-outlined">{ctaText}</button>
      </div>
    </section>
  );
}
