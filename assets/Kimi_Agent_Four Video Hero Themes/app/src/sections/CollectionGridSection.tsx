import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  name: string;
  price: string;
  image: string;
}

interface CollectionGridSectionProps {
  caption: string;
  headline: string;
  products: Product[];
  bgColor?: string;
}

export default function CollectionGridSection({
  caption,
  headline,
  products,
  bgColor = '#30302d',
}: CollectionGridSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Header animation
    const header = el.querySelectorAll('.grid-header-animate');
    gsap.set(header, { opacity: 0, y: 50 });

    const headerTrigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    // Parallax columns
    const outerCols = [col1Ref.current, col3Ref.current].filter(Boolean);
    const middleCol = col2Ref.current;

    outerCols.forEach((col) => {
      if (!col) return;
      gsap.fromTo(
        col,
        { y: 0 },
        {
          y: '20vh',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    if (middleCol) {
      gsap.fromTo(
        middleCol,
        { y: '10vh' },
        {
          y: '-10vh',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    return () => {
      headerTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, []);

  const col1 = products.filter((_, i) => i % 3 === 0);
  const col2 = products.filter((_, i) => i % 3 === 1);
  const col3 = products.filter((_, i) => i % 3 === 2);

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="mb-10">
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-square object-cover mb-4"
      />
      <p className="font-body text-[14px] font-normal uppercase text-[#d1cfb9] tracking-[0.04em]">
        {product.name}
      </p>
      <p className="font-body text-[12px] font-light text-[#a7a37d]">
        {product.price}
      </p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-[7vw]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="grid-header-animate caption-text mb-4">{caption}</p>
          <h2 className="grid-header-animate font-display text-[7vw] md:text-[5vw] uppercase text-[#d1cfb9] leading-[1.1]">
            {headline}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div ref={col1Ref}>
            {col1.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
          <div ref={col2Ref}>
            {col2.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
          <div ref={col3Ref}>
            {col3.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
