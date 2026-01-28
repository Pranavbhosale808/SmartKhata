import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <main className="ml-64 min-h-screen flex flex-col">
        <div className="flex-1 px-6 py-10">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
