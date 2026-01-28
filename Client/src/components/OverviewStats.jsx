export default function OverviewStats({ loading, data }) {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-gray-100 h-24 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: "Total Bills", value: data.totalBills },
    { label: "Paid Bills", value: data.paidBills },
    { label: "Total Revenue", value: `₹ ${data.totalRevenue}` },
    { label: "Pending Credit", value: `₹ ${data.pendingCredit}` },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-4 flex flex-col justify-center"
        >
          <div className="text-sm text-black/60">{c.label}</div>
          <div className="text-xl font-bold text-black mt-1">{c.value}</div>
        </div>
      ))}
    </div>
  );
}