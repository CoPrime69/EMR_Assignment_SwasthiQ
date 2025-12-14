import {
    Search,
    Book,
    Menu,
    Activity,
    Calendar,
    Stethoscope,
    Pill,
    Users,
    Plus,
    Sparkles,
    Settings,
} from 'lucide-react';


/* ---------------- Sidebar Icon ---------------- */
const SidebarIcon = ({ icon: Icon, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`
      w-11 h-11
      flex items-center justify-center
      rounded-xl
      transition-all
      ${active
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }
    `}
    >
        <Icon size={22} strokeWidth={1.8} />
    </button>
);

/* ---------------- Sidebar ---------------- */
const Sidebar = ({ activeView, onViewChange }) => {
    return (
        <aside className=" w-24 h-[95vh] bg-white rounded-3xl shadow-xl flex flex-col items-center py-6">
            {/* Top icons */}
            <div className="flex flex-col items-center space-y-6">
                <SidebarIcon icon={Search} />
                <SidebarIcon icon={Book} />
                <SidebarIcon icon={Menu} />
                <SidebarIcon icon={Activity} />
                <SidebarIcon
                    icon={Calendar}
                    active={activeView === 'calendar'}
                    onClick={() => onViewChange('calendar')}
                />
                <SidebarIcon icon={Stethoscope} />
                <SidebarIcon icon={Pill} />
                <SidebarIcon
                    icon={Users}
                    active={activeView === 'appointments'}
                    onClick={() => onViewChange('appointments')}
                />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Plus */}
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition mb-6">
                <Plus size={26} />
            </button>

            {/* Bottom */}
            <div className="flex flex-col items-center space-y-6">
                <SidebarIcon icon={Sparkles} />
                <SidebarIcon icon={Settings} />
            </div>
        </aside>
    );
};

/* ---------------- Layout ---------------- */
export default function RootLayout({ children, activeView, onViewChange }) {
    return (
        <div className="min-h-screen bg-gray-50 flex p-6 gap-6">
            {/* Sidebar */}
            <Sidebar activeView={activeView} onViewChange={onViewChange} />

            {/* Page Content */}
            <div className="flex-1 bg-white rounded-3xl shadow-sm overflow-hidden">
                {children}
            </div>
        </div>
    );
}
