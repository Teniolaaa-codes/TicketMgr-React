import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    if (!session) {
      navigate("/auth/login");
      return;
    }
    setUser(session);

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const userTickets = tickets.filter(
      (ticket) => ticket.createdBy === session.email
    );

    const total = userTickets.length;
    const open = userTickets.filter((t) => t.status === "open").length;
    const resolved = userTickets.filter((t) => t.status === "resolved").length;

    setStats({ total, open, resolved });
  }, [navigate]);

  if (!user) return null;

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center mt-10 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-[1440px] mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Dashboard Overview
          </h1>
        </header>

        <p className="text-gray-700 mb-10 text-lg">
          Welcome back, <span className="font-semibold">{user.name}</span> 👋
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-100 p-6 rounded-xl text-center shadow">
            <h3 className="text-lg font-semibold mb-2">Total Tickets</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl text-center shadow">
            <h3 className="text-lg font-semibold mb-2">Open Tickets</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.open}</p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl text-center shadow">
            <h3 className="text-lg font-semibold mb-2">Resolved Tickets</h3>
            <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/tickets"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Manage Tickets
          </Link>
        </div>
      </div>
    </section>
  );
}
