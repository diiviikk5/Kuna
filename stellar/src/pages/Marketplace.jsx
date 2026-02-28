/**
 * STELLAR Marketplace
 * Pre-trained Indian context models & community uploads
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCartIcon,
    SparklesIcon,
    StarIcon,
    ArrowDownTrayIcon,
    FireIcon,
    CheckBadgeIcon,
    CubeTransparentIcon,
    GlobeAsiaAustraliaIcon,
    SunIcon,
    CloudIcon,
    BuildingOffice2Icon,
    TruckIcon,
    BoltIcon,
    HeartIcon,
    EyeIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const models = [
    {
        id: 'paddy-net',
        name: 'Paddy-Net v2',
        category: 'Agriculture',
        icon: SunIcon,
        description: 'Crop health detection for Indian rice varieties. Trained on 50,000+ paddy field images from Punjab, Haryana & Bengal.',
        accuracy: 94.2,
        downloads: 12400,
        rating: 4.8,
        reviews: 234,
        price: 0,
        badge: 'OFFICIAL',
        badgeColor: 'bg-emerald-500',
        tags: ['Rice', 'NDVI', 'Disease Detection', 'Yield Prediction'],
        author: 'STELLAR Team',
        size: '145 MB',
        lastUpdated: '2 days ago'
    },
    {
        id: 'himalaya-terrain',
        name: 'Himalaya-Terrain',
        category: 'Terrain',
        icon: GlobeAsiaAustraliaIcon,
        description: 'Landslide prediction & glacier monitoring for Himalayan regions. Used by NDRF for disaster management.',
        accuracy: 91.8,
        downloads: 8700,
        rating: 4.9,
        reviews: 156,
        price: 0,
        badge: 'FEATURED',
        badgeColor: 'bg-indigo-400',
        tags: ['Landslide', 'DEM', 'Glacier', 'Uttarakhand'],
        author: 'STELLAR Team',
        size: '230 MB',
        lastUpdated: '1 week ago'
    },
    {
        id: 'dense-urban-in',
        name: 'DenseUrban-IN',
        category: 'Urban',
        icon: BuildingOffice2Icon,
        description: 'Building detection in chaotic Indian cities. Works on slums, mixed-use areas, dense bazaars.',
        accuracy: 89.5,
        downloads: 6200,
        rating: 4.6,
        reviews: 89,
        price: 4999,
        badge: 'PRO',
        badgeColor: 'bg-purple-500',
        tags: ['Building', 'Segmentation', 'Smart City', 'Urban Planning'],
        author: 'IIT Delhi Lab',
        size: '340 MB',
        lastUpdated: '3 days ago'
    },
    {
        id: 'monsoon-flood',
        name: 'Monsoon-Flood',
        category: 'Disaster',
        icon: CloudIcon,
        description: '20 years of Indian flood patterns. Predicts inundation areas 48-72 hours ahead.',
        accuracy: 87.3,
        downloads: 15600,
        rating: 4.7,
        reviews: 312,
        price: 0,
        badge: 'OFFICIAL',
        badgeColor: 'bg-emerald-500',
        tags: ['Flood', 'SAR', 'Disaster', 'Early Warning'],
        author: 'STELLAR Team',
        size: '180 MB',
        lastUpdated: '5 days ago'
    },
    {
        id: 'stubble-detect',
        name: 'Stubble-Detect',
        category: 'Environment',
        icon: FireIcon,
        description: 'Detect crop burning in Punjab/Haryana before pollution spreads to Delhi NCR.',
        accuracy: 96.1,
        downloads: 4300,
        rating: 4.9,
        reviews: 67,
        price: 0,
        badge: 'NEW',
        badgeColor: 'bg-blue-500',
        tags: ['Fire', 'Pollution', 'AQI', 'Thermal'],
        author: 'STELLAR Team',
        size: '95 MB',
        lastUpdated: '12 hours ago'
    },
    {
        id: 'rail-infra',
        name: 'Rail-Infra',
        category: 'Infrastructure',
        icon: TruckIcon,
        description: 'Indian Railways corridor monitoring. Track condition, encroachment, vegetation overgrowth.',
        accuracy: 92.4,
        downloads: 2100,
        rating: 4.5,
        reviews: 34,
        price: 9999,
        badge: 'ENTERPRISE',
        badgeColor: 'bg-slate-600',
        tags: ['Railway', 'Maintenance', 'Safety', 'IoT'],
        author: 'CRIS Partnership',
        size: '420 MB',
        lastUpdated: '1 week ago'
    }
];

const categories = ['All', 'Agriculture', 'Terrain', 'Urban', 'Disaster', 'Environment', 'Infrastructure'];

const Marketplace = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedModel, setSelectedModel] = useState(null);
    const [cart, setCart] = useState([]);

    const filteredModels = selectedCategory === 'All'
        ? models
        : models.filter(m => m.category === selectedCategory);

    const addToCart = (model) => {
        if (!cart.find(m => m.id === model.id)) {
            setCart([...cart, model]);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-200 p-8 pb-20 font-sans">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center rounded-2xl shadow-lg shadow-indigo-500/20">
                            <CubeTransparentIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-1">
                                Model Marketplace
                            </h1>
                            <p className="text-slate-400 font-medium text-sm">
                                Pre-trained Indian context models • Ready to deploy
                            </p>
                        </div>
                    </div>

                    {/* Cart */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex items-center gap-3 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
                    >
                        <ShoppingCartIcon className="w-5 h-5" />
                        <span>Cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs border-2 border-[#030712]">
                                {cart.length}
                            </span>
                        )}
                    </motion.button>
                </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex gap-2 mb-8 overflow-x-auto pb-2"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`
                            px-5 py-2 font-bold text-sm rounded-full whitespace-nowrap transition-all border
                            ${selectedCategory === cat
                                ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModels.map((model, index) => (
                    <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all overflow-hidden group"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/5 bg-white/5">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shadow-inner">
                                        <model.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{model.name}</h3>
                                        <p className="text-xs font-semibold text-slate-400">{model.category}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full ${model.badgeColor} text-white shadow-sm`}>
                                    {model.badge}
                                </span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            <p className="text-sm text-slate-300 font-medium leading-relaxed mb-5 line-clamp-2">
                                {model.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {model.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-semibold tracking-wide text-slate-300 shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-5">
                                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-lg font-bold text-emerald-400 drop-shadow-[0_2px_10px_rgba(52,211,153,0.3)]">{model.accuracy}%</div>
                                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mt-1">Accuracy</div>
                                </div>
                                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-lg font-bold text-amber-400 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">{(model.downloads / 1000).toFixed(1)}K</div>
                                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mt-1">Downloads</div>
                                </div>
                                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center justify-center gap-1">
                                        <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                                        <span className="font-bold text-white">{model.rating}</span>
                                    </div>
                                    <div className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mt-1">{model.reviews} reviews</div>
                                </div>
                            </div>

                            {/* Author & Size */}
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                                <span>By {model.author}</span>
                                <span>{model.size}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-5 border-t border-white/5 bg-black/20 flex items-center justify-between">
                            <div>
                                {model.price === 0 ? (
                                    <span className="text-xl font-bold tracking-tight text-emerald-400">FREE</span>
                                ) : (
                                    <span className="text-xl font-bold tracking-tight text-white">₹{model.price.toLocaleString()}</span>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    <HeartIcon className="w-5 h-5 text-slate-300" />
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => addToCart(model)}
                                    className={`
                                        px-5 py-2.5 font-bold text-sm flex items-center gap-2 rounded-xl transition-all shadow-md
                                        ${model.price === 0
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white'
                                            : 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-indigo-500/20'
                                        }
                                    `}
                                >
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                    {model.price === 0 ? 'Download' : 'Add to Cart'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Upload Your Model CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 p-10 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl backdrop-blur-xl text-center relative overflow-hidden"
            >
                <div className="absolute inset-x-0 -top-full h-[200%] bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent transform -rotate-45 pointer-events-none" />
                <div className="relative z-10">
                    <SparklesIcon className="w-14 h-14 text-indigo-400 mx-auto mb-5 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Built a Model? Share It!</h2>
                    <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto leading-relaxed">
                        Upload your trained models to the marketplace. Earn 70% revenue share on every sale to our enterprise clients.
                    </p>
                    <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-1">
                        Upload Your Model
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Marketplace;
