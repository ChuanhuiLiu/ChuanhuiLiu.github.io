import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoBackgroundProps {
  src: string;
  className?: string;
  parallax?: boolean;
  overlay?: boolean;
  overlayColor?: string;
}

export default function VideoBackground({
  src,
  className = '',
  parallax = false,
  overlay = false,
  overlayColor = 'rgba(0,0,0,0.4)',
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setLoaded(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    if (video.readyState >= 3) setLoaded(true);

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, [src]);

  useEffect(() => {
    if (!parallax || !containerRef.current || !videoRef.current) return;

    const video = videoRef.current;
    gsap.set(video, { scale: 1.05, y: '5%' });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(video, {
          scale: 1.05 - progress * 0.05,
          y: `${5 - progress * 10}%`,
        });
      },
    });

    return () => trigger.kill();
  }, [parallax]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-[#3e3d3a]" />
      )}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ background: overlayColor }}
        />
      )}
    </div>
  );
}
