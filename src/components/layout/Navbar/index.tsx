import { useApp } from "../../../context/AppContext";

const Navbar = () => {
  const { role, setRole } = useApp();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold">Finance Dashboard</h1>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        className="border px-2 py-1 rounded"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default Navbar;