import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Bell, 
  Briefcase, 
  Users, 
  CheckCircle,
  PlusCircle
} from "lucide-react";
import { useAuth} from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user, setUser } = useAuth();

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans text-slate-900">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ReactApp
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                {user.name[0]}
              </div>
              <button className="text-gray-500 hover:text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-10 relative z-0">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <h2 className="text-4xl font-extrabold tracking-tight">
            Welcome back, <span className="text-blue-600">{user.name}</span> 👋
          </h2>
          <p className="text-slate-500 mt-2 text-lg">Here's what's happening with your projects today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <StatCard icon={<Briefcase className="text-blue-600" />} label="Total Projects" value="12" color="blue" />
          <StatCard icon={<Users className="text-purple-600" />} label="Team Members" value="48" color="purple" />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} label="Tasks Done" value="124" color="emerald" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <motion.div 
            variants={itemVars}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Recent Activity</h3>
                <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <ActivityItem title="Project 'Alpha' Updated" time="2 hours ago" type="update" />
                <ActivityItem title="New member joined" time="5 hours ago" type="member" />
                <ActivityItem title="Weekly report generated" time="Yesterday" type="report" />
              </div>
            </div>
          </motion.div>

          {/* Sidebar / Quick Actions */}
          <motion.div 
            variants={itemVars}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl shadow-lg text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10">
                  <PlusCircle className="mb-2" />
                  <span className="text-xs">New Project</span>
                </button>
                <button className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10">
                  <Settings className="mb-2" />
                  <span className="text-xs">Settings</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4">System Status</h3>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">All systems operational</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon, label, value, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 transition-shadow hover:shadow-md"
  >
    <div className={`p-4 rounded-2xl bg-${color}-50`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const ActivityItem = ({ title, time, type }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-2 h-2 bg-blue-400 rounded-full" />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;