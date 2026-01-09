// src/components/MobileBottomNav.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MobileBottomNav: React.FC = () => {
    const { cartCount } = useCart();

    const navItems = [
        { icon: <Home size={22} />, label: 'Home', path: '/' },
        { icon: <Search size={22} />, label: 'Shop', path: '/shop' },
        {
            icon: (
                <div className="relative">
                    <ShoppingBag size={22} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-yellow-500 text-gray-900 text-[10px] flex items-center justify-center font-bold">
                            {cartCount > 9 ? '9+' : cartCount}
                        </span>
                    )}
                </div>
            ),
            label: 'Cart',
            path: '/cart'
        },
        { icon: <Menu size={22} />, label: 'More', path: '/about' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 safe-area-pb">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-yellow-500' : 'text-gray-400 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default MobileBottomNav;
