const dummyApplications = [
  {
    id: 1,
    company: "Google",
    role: "frontend Developer",
    status: "Interview",
    appliedDate: "12 May 2026",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "frontend Developer",
    status: "Applied",
    appliedDate: "12 May 2026",
  },
  {
    id: 3,
    company: "Netflix",
    role: "frontend Developer",
    status: "Rejected",
    appliedDate: "12 May 2026",
  },
  {
    id: 4,
    company: "Netflix",
    role: "frontend Developer",
    status: "Rejected",
    appliedDate: "12 May 2026",
  },
  {
    id: 5,
    company: "Netflix",
    role: "frontend Developer",
    status: "Rejected",
    appliedDate: "12 May 2026",
  },
  {
    id: 6,
    company: "Netflix",
    role: "frontend Developer",
    status: "Rejected",
    appliedDate: "12 May 2026",
  },
];

function ApplicationsTable() {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Recent Applications
        </h2>
        <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600">
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Company
              </th>
              <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Role
              </th>
              <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Status
              </th>
              <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Applied
              </th>
            </tr>
          </thead>

          <tbody>
            {dummyApplications.map((application) => (
              <tr key={application.id} className="border-t border-slate-200 dark:border-slate-700">
                <td className="py-4 font-medium text-slate-800 dark:text-white">
                  {application.company}
                </td>
                <td className="py-4 text-slate-600 dark:text-slate-400">{application.role}</td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium 
                        ${
                          application.status === "Interview"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : application.status === "Applied"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="py-4 text-slate-600 dark:text-slate-400">
                  {application.appliedDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicationsTable;
