import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const shopLinks = [
  { label: 'All Products', href: '/' },
  { label: 'New Arrivals', href: '/' },
  { label: 'Collections', href: '/' },
];

const companyLinks = [
  { label: 'Our Story', href: '/' },
  { label: 'Craftsmanship', href: '/' },
  { label: 'Contact', href: '/' },
];

const helpLinks = [
  { label: 'FAQ', href: '/' },
  { label: 'Shipping', href: '/' },
  { label: 'Returns', href: '/' },
];

export default function Footer() {
  return (
    <footer className="bg-[#30302d] py-20 px-[7vw]">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 mb-16">
          {/* Newsletter */}
          <div className="md:col-span-2">
            <p className="font-body text-[1.125rem] font-normal text-[#a7a37d] mb-6">
              Join our community
            </p>
            <div className="flex items-center border-b border-[#a7a37d]/30 pb-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-[#d1cfb9] font-body text-sm placeholder:text-[#a7a37d]/50 outline-none flex-1"
              />
              <button className="text-[#a7a37d] hover:text-[#d1cfb9] transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-body text-[14px] font-normal uppercase tracking-[0.08em] text-[#a7a37d] mb-4">
              Shop
            </p>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-[14px] font-normal uppercase text-[#a7a37d] hover:text-[#d1cfb9] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-body text-[14px] font-normal uppercase tracking-[0.08em] text-[#a7a37d] mb-4">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-[14px] font-normal uppercase text-[#a7a37d] hover:text-[#d1cfb9] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="font-body text-[14px] font-normal uppercase tracking-[0.08em] text-[#a7a37d] mb-4">
              Help
            </p>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-[14px] font-normal uppercase text-[#a7a37d] hover:text-[#d1cfb9] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#a7a37d]/10">
          <p className="font-body text-[12px] font-light text-[#a7a37d]">
            2025 Opulence. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/" className="font-body text-[12px] font-light text-[#a7a37d] hover:text-[#d1cfb9] transition-colors">
              Privacy
            </Link>
            <Link to="/" className="font-body text-[12px] font-light text-[#a7a37d] hover:text-[#d1cfb9] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
