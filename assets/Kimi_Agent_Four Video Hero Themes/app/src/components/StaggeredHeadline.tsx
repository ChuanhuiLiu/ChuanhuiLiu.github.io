import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface StaggeredHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3';
}

export default function StaggeredHeadline({
  text,
  className = '',
  delay = 0.2,
  as: Tag = 'h1',
}: StaggeredHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;
    hasAnimated.current = true;

    const split = new SplitText(el, { type: 'words' });

    split.words.forEach((word) => {
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.verticalAlign = 'bottom';
      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    gsap.set(split.words, { y: '100%', opacity: 0 });

    gsap.to(split.words, {
      y: '0%',
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: 'power3.out',
      delay,
    });

    return () => {
      split.revert();
    };
  }, [text, delay]);

  return (
    <Tag ref={containerRef as any} className={className}>
      {text}
    </Tag>
  );
}
