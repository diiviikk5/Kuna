import { Outlet } from 'react-router-dom';
import { Sidebar, Starfield } from '../components';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#020617] relative overflow-hidden">
            {/* Animated starfield background */}
            <Starfield />

            {/* Subtle grid overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Gradient overlay for depth */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#020617]/95 via-[#0a0f1c]/85 to-[#020617]/95 pointer-events-none z-0" />

            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <main className="ml-[260px] relative z-10 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
