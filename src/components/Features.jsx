export default function Features() {
  return (
    <section className="bg-blue-50 py-20 relative">
      {/* Subtle background circle for depth */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-40 blur-3xl"
      />

      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          Powerful Features Built for Efficiency
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          TicketMgr streamlines your support operations with an intuitive interface,
          automation tools, and insightful analytics — all in one place.
        </p>

        <div
        aria-hidden="true"
        className="absolute -top-10 -left-40 w-56 h-56 bg-indigo-300 rounded-full opacity-40 blur-xl animate-bounce"
      />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Smart Ticket Tracking</h3>
            <p className="text-gray-600">
              Easily manage and monitor the progress of every customer request in real time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Team Collaboration</h3>
            <p className="text-gray-600">
              Assign, discuss, and resolve tickets together — all from one unified workspace.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Analytics & Reports</h3>
            <p className="text-gray-600">
              Get insights on response times, resolutions, and customer satisfaction trends.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Custom Forms</h3>
            <p className="text-gray-600">
              Create dynamic forms for users to submit detailed support requests effortlessly.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Automated Responses</h3>
            <p className="text-gray-600">
              Save time with pre-set responses and rule-based ticket prioritization.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Secure Data Storage</h3>
            <p className="text-gray-600">
              Keep customer information safe with encrypted and compliant storage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
