export default function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded">Users</div>
        <div className="bg-white p-6 shadow rounded">Donations</div>
        <div className="bg-white p-6 shadow rounded">Messages</div>
      </div>
    </div>
  );
}