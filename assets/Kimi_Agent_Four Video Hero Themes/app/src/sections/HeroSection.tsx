import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import VideoBackground from '@/components/VideoBackground';
import StaggeredHeadline from '@/components/StaggeredHeadline';

interface HeroSectionProps {
  caption: string;
  headline: string;
  subhead: string;
  ctaText: string;
  ctaHref?: string;
  videoSrc: string;
}

export default function HeroSection({
  caption,
  headline,
  subhead,
  ctaText,
  ctaHref = '#',
  videoSrc,
}: HeroSectionProps) {
  const captionRef = useRef<HTMLParagraphElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(
      captionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
      .fromTo(
        subheadRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <VideoBackground src={videoSrc} parallax overlay overlayColor="rgba(0,0,0,0.35)" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-[7vw]">
        <p
          ref={captionRef}
          className="caption-text mb-6 opacity-0"
        >
          {caption}
        </p>

        <StaggeredHeadline
          text={headline}
          as="h1"
          className="font-display text-[10vw] md:text-[8vw] uppercase text-[#d1cfb9] leading-[1.05] tracking-[0.02em] max-w-[90%] mb-8"
          delay={0.2}
        />

        <p
          ref={subheadRef}
          className="font-body text-[1rem] md:text-[1.125rem] font-light text-[#a7a37d] max-w-[480px] leading-[1.7] mb-10 opacity-0"
        >
          {subhead}
        </p>

        <a
          ref={ctaRef}
          href={ctaHref}
          className="btn-filled opacity-0"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
