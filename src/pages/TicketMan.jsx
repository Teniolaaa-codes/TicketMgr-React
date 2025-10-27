import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const STATUS_OPTIONS = ["open", "in_progress", "closed"]; 

const makeId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export default function TicketMan() {
  const navigate = useNavigate();
  const { showToast } = useToast(); 
  const [user, setUser] = useState(null);

  // tickets for current user
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
  });

  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session")); // required session key
    if (!session) {
      navigate("/auth/login");
      return;
    }
    setUser(session);

    const all = JSON.parse(localStorage.getItem("tickets")) || [];
    const userTickets = all.filter((t) => t.createdBy === session.email);
    setTickets(userTickets);
    setLoading(false);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  // validation function
  const validate = () => {
    const e = {};
    if (!form.title || !form.title.trim()) e.title = "Title is required.";
    if (!form.status || !STATUS_OPTIONS.includes(form.status))
      e.status = `Status must be one of: ${STATUS_OPTIONS.join(", ")}`;
    if (form.description && form.description.length > 1000)
      e.description = "Description is too long (max 1000 characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Save tickets to localStorage (merged with all users)
  const persistAllTickets = (updatedForUser) => {
    const all = JSON.parse(localStorage.getItem("tickets")) || [];
    const others = all.filter((t) => t.createdBy !== user.email);
    const merged = [...others, ...updatedForUser];
    localStorage.setItem("tickets", JSON.stringify(merged));
  };

  // Create or Update handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix form errors.", "error"); 
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      // update existing tickets
      const updated = tickets.map((t) =>
        t.id === editingId ? { ...t, ...form, updatedAt: now } : t
      );
      setTickets(updated);
      persistAllTickets(updated);
      showToast("Ticket updated.", "success");
      setEditingId(null);
    } else {
      // create new ticket
      const newTicket = {
        id: makeId(),
        title: form.title.trim(),
        description: form.description?.trim() || "",
        status: form.status,
        createdBy: user.email,
        createdAt: now,
        updatedAt: now,
      };
      const updated = [newTicket, ...tickets];
      setTickets(updated);
      persistAllTickets(updated);
      showToast("Ticket created.", "success");
    }

    // clear form
    setForm({ title: "", description: "", status: "open" });
    setErrors({});
  };

  // Edit button:
  const startEdit = (ticket) => {
    setEditingId(ticket.id);
    setForm({
      title: ticket.title,
      description: ticket.description || "",
      status: ticket.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", description: "", status: "open" });
    setErrors({});
  };

  const handleDelete = (ticketId) => {
    const ok = window.confirm("Delete this ticket? This action cannot be undone.");
    if (!ok) return;
    const updated = tickets.filter((t) => t.id !== ticketId);
    setTickets(updated);
    persistAllTickets(updated);
    showToast("Ticket deleted.", "success");
  };

  const statusBadge = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-amber-100 text-amber-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return null; 

  return (
    <section className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 mt-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Ticket Management</h1>
              <p className="text-gray-600">Create, view, edit, and delete your support tickets.</p>
            </div>

            <div className="flex gap-3 items-center">
              <Link to="/dashboard" className="text-sm md:text-base text-gray-700 hover:text-blue-600">
                ← Back to Dashboard
              </Link>

            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Ticket" : "Create Ticket"}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Title (required) */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 ${
                  errors.title ? "border-red-400" : "border-gray-200"
                }`}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <p id="title-error" className="text-red-500 text-sm mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 ${
                  errors.status ? "border-red-400" : "border-gray-200"
                }`}
                aria-invalid={!!errors.status}
                aria-describedby={errors.status ? "status-error" : undefined}
              >

                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p id="status-error" className="text-red-500 text-sm mt-1">
                  {errors.status}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 ${
                  errors.description ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {editingId ? "Update Ticket" : "Create Ticket"}
              </button>

              {editingId && (
                <button type="button" onClick={cancelEdit} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <p className="text-gray-600">You have no tickets yet. Create your first ticket above.</p>
            </div>
          ) : (
            tickets
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((t) => (
                <article key={t.id} className="bg-white rounded-2xl shadow p-6 relative">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>
                      <p className="text-sm text-gray-500 mt-2">{t.description || <span className="italic text-gray-400">No description</span>}</p>

                      <div className="mt-3 flex items-center gap-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(t.status)}`}>
                          {t.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-gray-400">Created: {new Date(t.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => startEdit(t)}
                        className="text-sm text-blue-600 hover:underline"
                        aria-label={`Edit ticket ${t.title}`}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-sm text-red-600 hover:underline"
                        aria-label={`Delete ticket ${t.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
          )}
        </div>
      </div>
    </section>
  );
}
