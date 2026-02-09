import React from 'react';

export const LogicGatesDiagram = () => {
    return (
        <div className="w-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-white/10 rounded-2xl p-8 my-6">
            <h3 className="text-xl font-black uppercase italic text-[#00D9A3] mb-6 text-center">
                Logic Gates Overview
            </h3>

            <div className="grid grid-cols-3 gap-6">
                {/* AND Gate */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <div className="text-center mb-3">
                        <span className="text-sm font-black text-white">AND GATE</span>
                    </div>
                    <svg viewBox="0 0 100 60" className="w-full h-24 mb-3">
                        <path d="M 10 10 L 40 10 Q 70 30 40 50 L 10 50 Z"
                            fill="none" stroke="#00D9A3" strokeWidth="2" />
                        <line x1="0" y1="20" x2="10" y2="20" stroke="#FFD700" strokeWidth="2" />
                        <line x1="0" y1="40" x2="10" y2="40" stroke="#FFD700" strokeWidth="2" />
                        <line x1="70" y1="30" x2="90" y2="30" stroke="#8B5CF6" strokeWidth="2" />
                        <text x="5" y="18" fill="#FFD700" fontSize="8">A</text>
                        <text x="5" y="38" fill="#FFD700" fontSize="8">B</text>
                        <text x="75" y="28" fill="#8B5CF6" fontSize="8">Y</text>
                    </svg>
                    <div className="bg-white/5 rounded p-2 text-[10px] font-mono">
                        <div className="grid grid-cols-3 gap-1 text-center font-black text-gray-400 mb-1">
                            <span>A</span><span>B</span><span className="text-[#00D9A3]">Y</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                            <span>0</span><span>0</span><span>0</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                            <span>0</span><span>1</span><span>0</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                            <span>1</span><span>0</span><span>0</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                            <span>1</span><span>1</span><span className="text-[#00D9A3]">1</span>
                        </div>
                    </div>
                </div>

                {/* OR Gate */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <div className="text-center mb-3">
                        <span className="text-sm font-black text-white">OR GATE</span>
                    </div>
                    <svg viewBox="0 0 100 60" className="w-full h-24 mb-3">
                        <path d="M 10 10 Q 20 30 10 50 Q 50 50 70 30 Q 50 10 10 10"
                            fill="none" stroke="#00D9A3" strokeWidth="2" />
                        <line x1="0" y1="20" x2="12" y2="20" stroke="#FFD700" strokeWidth="2" />
                        <line x1="0" y1="40" x2="12" y2="40" stroke="#FFD700" strokeWidth="2" />
                        <line x1="70" y1="30" x2="90" y2="30" stroke="#8B5CF6" strokeWidth="2" />
                        <text x="5" y="18" fill="#FFD700" fontSize="8">A</text>
                        <text x="5" y="38" fill="#FFD700" fontSize="8">B</text>
                        <text x="75" y="28" fill="#8B5CF6" fontSize="8">Y</text>
                    </svg>
                    <div className="bg-white/5 rounded p-2 text-[10px] font-mono">
                        <div className="grid grid-cols-3 gap-1 text-center font-black text-gray-400 mb-1">
                            <span>A</span><span>B</span><span className="text-[#00D9A3]">Y</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                            <span>0</span><span>0</span><span>0</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                            <span>0</span><span>1</span><span className="text-[#00D9A3]">1</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                            <span>1</span><span>0</span><span className="text-[#00D9A3]">1</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                            <span>1</span><span>1</span><span className="text-[#00D9A3]">1</span>
                        </div>
                    </div>
                </div>

                {/* NOT Gate */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <div className="text-center mb-3">
                        <span className="text-sm font-black text-white">NOT GATE</span>
                    </div>
                    <svg viewBox="0 0 100 60" className="w-full h-24 mb-3">
                        <path d="M 10 10 L 10 50 L 60 30 Z"
                            fill="none" stroke="#00D9A3" strokeWidth="2" />
                        <circle cx="65" cy="30" r="5" fill="none" stroke="#00D9A3" strokeWidth="2" />
                        <line x1="0" y1="30" x2="10" y2="30" stroke="#FFD700" strokeWidth="2" />
                        <line x1="70" y1="30" x2="90" y2="30" stroke="#8B5CF6" strokeWidth="2" />
                        <text x="5" y="28" fill="#FFD700" fontSize="8">A</text>
                        <text x="75" y="28" fill="#8B5CF6" fontSize="8">Y</text>
                    </svg>
                    <div className="bg-white/5 rounded p-2 text-[10px] font-mono">
                        <div className="grid grid-cols-2 gap-1 text-center font-black text-gray-400 mb-1">
                            <span>A</span><span className="text-[#00D9A3]">Y</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-center">
                            <span>0</span><span className="text-[#00D9A3]">1</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-center">
                            <span>1</span><span>0</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-[#00D9A3]/5 border border-[#00D9A3]/20 rounded-xl p-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="text-[#00D9A3] font-black">💡 Key Concept:</span> Logic gates are the fundamental building blocks of digital circuits.
                    AND outputs 1 only when ALL inputs are 1. OR outputs 1 when ANY input is 1. NOT inverts the input.
                </p>
            </div>
        </div>
    );
};
