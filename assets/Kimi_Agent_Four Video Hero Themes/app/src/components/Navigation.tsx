import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import gsap from 'gsap';

const navLinks = [
  { label: 'NATURE', href: '/' },
  { label: 'STILL LIFE', href: '/still-life' },
  { label: 'MATERIALS', href: '/materials' },
  { label: 'METAL PARTS', href: '/metal-parts' },
];

export default function Navigation() {
  const { setCartOpen, menuOpen, setMenuOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, setMenuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to('.menu-overlay', { x: 0, duration: 0.6, ease: 'power3.inOut' })
        .fromTo('.menu-link', { x: 60, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo('.menu-close', { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.2');
    } else {
      document.body.style.overflow = '';
      gsap.to('.menu-link', { x: 40, opacity: 0, stagger: 0.05, duration: 0.3 });
      gsap.to('.menu-overlay', { x: '100%', duration: 0.5, ease: 'power3.inOut', delay: 0.2 });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#30302d]/95 border-b border-[#d1cfb9]/10' : 'bg-transparent'
        }`}
        style={{ height: 60 }}
      >
        <div className="flex items-center justify-between h-full px-[7vw] max-w-[1600px] mx-auto">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[#d1cfb9] hover:text-[#e4e2c5] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <Link
            to="/"
            className="font-display text-[20px] text-[#d1cfb9] uppercase tracking-[0.1em]"
          >
            OPULENCE
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="text-[#d1cfb9] hover:text-[#e4e2c5] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        className="menu-overlay fixed inset-0 z-[60] bg-[#30302d]"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <button
            onClick={() => setMenuOpen(false)}
            className="menu-close absolute top-5 right-[7vw] text-[#d1cfb9] hover:text-[#e4e2c5] transition-colors opacity-0"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`menu-link font-display text-[5vw] md:text-[4vw] uppercase text-[#d1cfb9] hover:text-[#e4e2c5] transition-colors opacity-0 ${
                  location.pathname === link.href ? 'text-[#e4e2c5]' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
