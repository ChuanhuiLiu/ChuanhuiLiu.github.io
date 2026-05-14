import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoBackground from '@/components/VideoBackground';

gsap.registerPlugin(ScrollTrigger);

interface InstagramCTASectionProps {
  headline: string;
  body: string;
  handle: string;
  ctaText: string;
  videoSrc: string;
  textColor?: string;
  bgColor?: string;
}

export default function InstagramCTASection({
  headline,
  body,
  handle,
  ctaText,
  videoSrc,
  textColor = '#3e3d3a',
  bgColor = '#e4e2c5',
}: InstagramCTASectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const children = el.children;
    gsap.set(children, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Video side */}
        <div className="relative aspect-square md:aspect-auto md:min-h-[500px] overflow-hidden">
          <VideoBackground src={videoSrc} />
        </div>

        {/* Text side */}
        <div
          className="flex items-center justify-center px-[7vw] py-20 md:py-0"
          style={{ backgroundColor: bgColor }}
        >
          <div ref={contentRef}>
            <h2
              className="font-display text-[7vw] md:text-[5vw] uppercase leading-[1.1] mb-6"
              style={{ color: textColor }}
            >
              {headline}
            </h2>
            <p
              className="font-body text-[1rem] md:text-[1.125rem] font-light leading-[1.7] mb-6"
              style={{ color: textColor }}
            >
              {body}
            </p>
            <p
              className="font-body text-[14px] font-normal uppercase tracking-[0.08em] mb-8"
              style={{ color: textColor }}
            >
              {handle}
            </p>
            <button
              className="btn-filled"
              style={{
                backgroundColor: textColor,
                color: bgColor,
              }}
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
