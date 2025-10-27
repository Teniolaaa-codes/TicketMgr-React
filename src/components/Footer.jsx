import { Link } from "react-router-dom";
export default function Footer() {
  return (
<footer className="relative text-gray-700 pt-16 pb-0 overflow-hidden">

      {/* Gradient fade  */}
      <div className="absolute top-0 left-0 w-full h-40 bg-blue-50 bg-opacity-90 z-0"></div> 

      {/* Footer container from features section*/}
      <div className="relative bg-blue-100 border-t border-blue-300 z-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
          
          {/* Brand name and catchphrase*/}
          <div>
            <h2 className="text-5xl font-bold text-blue-700 mb-3">TicketMgr</h2>
            <p className="text-gray-600 leading-relaxed">
              Empowering teams to manage customer support efficiently and intuitively.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Quick Links</h3>
            <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Contact us</h3>
            <p className="text-gray-600">support@ticketmgr.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-blue-300 pt-5 pb-0">
  © {new Date().getFullYear()} TicketMgr — All rights reserved.
</div>
      </div>
    </footer>
  );
}
