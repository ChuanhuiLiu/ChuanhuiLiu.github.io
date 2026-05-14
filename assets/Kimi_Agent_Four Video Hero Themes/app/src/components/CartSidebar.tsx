import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import gsap from 'gsap';

export default function CartSidebar() {
  const { cartOpen, setCartOpen } = useApp();
  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(sidebarRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
    }
  }, [cartOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[70] bg-black/50 opacity-0 pointer-events-none"
        onClick={() => setCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full z-[80] bg-[#e4e2c5]"
        style={{ width: 'min(460px, 90vw)', transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-[24px] uppercase text-[#30302d]">
              YOUR CART
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-[#30302d] hover:text-[#3e3d3a] transition-colors"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>

          {/* Empty state */}
          <div className="flex-1 flex items-center justify-center">
            <p className="font-body text-[1rem] font-light text-[#a7a37d] text-center">
              Your cart is empty
            </p>
          </div>

          {/* Checkout button */}
          <button className="w-full h-12 bg-[#30302d] text-[#e4e2c5] font-body text-[14px] uppercase tracking-[0.06em] hover:bg-[#3e3d3a] transition-colors">
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
