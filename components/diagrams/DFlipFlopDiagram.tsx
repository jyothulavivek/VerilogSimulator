import React from 'react';

export const DFlipFlopDiagram = () => {
    return (
        <div className="w-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-white/10 rounded-2xl p-8 my-6">
            <h3 className="text-xl font-black uppercase italic text-[#00D9A3] mb-6 text-center">
                D Flip-Flop Timing Diagram
            </h3>

            <div className="grid grid-cols-2 gap-8">
                {/* Circuit Symbol */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                    <div className="text-center mb-4">
                        <span className="text-sm font-black text-white">CIRCUIT SYMBOL</span>
                    </div>
                    <svg viewBox="0 0 200 150" className="w-full h-40 mb-4">
                        {/* DFF Box */}
                        <rect x="60" y="30" width="80" height="90"
                            fill="#1a1a1a" stroke="#00D9A3" strokeWidth="2" />

                        {/* D Input */}
                        <line x1="20" y1="50" x2="60" y2="50" stroke="#FFD700" strokeWidth="2" />
                        <text x="25" y="48" fill="#FFD700" fontSize="12" fontWeight="bold">D</text>
                        <text x="68" y="55" fill="#FFD700" fontSize="10">D</text>

                        {/* Clock Input with triangle */}
                        <line x1="20" y1="90" x2="60" y2="90" stroke="#8B5CF6" strokeWidth="2" />
                        <text x="20" y="88" fill="#8B5CF6" fontSize="12" fontWeight="bold">CLK</text>
                        <path d="M 60 85 L 68 90 L 60 95" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />

                        {/* Q Output */}
                        <line x1="140" y1="60" x2="180" y2="60" stroke="#00FF00" strokeWidth="2" />
                        <text x="125" y="65" fill="#00FF00" fontSize="10">Q</text>
                        <text x="155" y="58" fill="#00FF00" fontSize="12" fontWeight="bold">Q</text>

                        {/* Q' Output */}
                        <line x1="140" y1="100" x2="180" y2="100" stroke="#FF6B9D" strokeWidth="2" />
                        <text x="122" y="105" fill="#FF6B9D" fontSize="10">Q'</text>
                        <text x="155" y="98" fill="#FF6B9D" fontSize="12" fontWeight="bold">Q'</text>

                        {/* DFF Label */}
                        <text x="85" y="80" fill="#00D9A3" fontSize="14" fontWeight="bold">DFF</text>
                    </svg>

                    {/* Truth Table */}
                    <div className="bg-white/5 rounded-lg p-3 text-[10px] font-mono">
                        <div className="grid grid-cols-3 gap-2 text-center font-black text-gray-400 mb-1">
                            <span className="text-[#8B5CF6]">CLK</span>
                            <span className="text-[#FFD700]">D</span>
                            <span className="text-[#00FF00]">Q(next)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center py-1">
                            <span className="text-[#8B5CF6]">↑</span>
                            <span>0</span>
                            <span>0</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center py-1">
                            <span className="text-[#8B5CF6]">↑</span>
                            <span>1</span>
                            <span className="text-[#00FF00]">1</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center py-1 text-gray-600">
                            <span>0/1</span>
                            <span>X</span>
                            <span>No change</span>
                        </div>
                    </div>
                </div>

                {/* Timing Diagram */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                    <div className="text-center mb-4">
                        <span className="text-sm font-black text-white">TIMING WAVEFORMS</span>
                    </div>
                    <svg viewBox="0 0 300 180" className="w-full h-48">
                        {/* Grid lines */}
                        <defs>
                            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff10" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="300" height="180" fill="url(#grid)" />

                        {/* CLK Signal */}
                        <text x="5" y="25" fill="#8B5CF6" fontSize="10" fontWeight="bold">CLK</text>
                        <path d="M 40 30 L 40 10 L 70 10 L 70 30 L 100 30 L 100 10 L 130 10 L 130 30 L 160 30 L 160 10 L 190 10 L 190 30 L 220 30 L 220 10 L 250 10 L 250 30"
                            fill="none" stroke="#8B5CF6" strokeWidth="2" />

                        {/* D Signal */}
                        <text x="5" y="75" fill="#FFD700" fontSize="10" fontWeight="bold">D</text>
                        <path d="M 40 80 L 70 80 L 70 60 L 130 60 L 130 80 L 190 80 L 190 60 L 250 60"
                            fill="none" stroke="#FFD700" strokeWidth="2" />

                        {/* Q Signal */}
                        <text x="5" y="125" fill="#00FF00" fontSize="10" fontWeight="bold">Q</text>
                        <path d="M 40 130 L 100 130 L 100 110 L 160 110 L 160 130 L 220 130 L 220 110 L 250 110"
                            fill="none" stroke="#00FF00" strokeWidth="2" />

                        {/* Rising edge markers */}
                        <circle cx="70" cy="20" r="3" fill="#FF6B9D" opacity="0.8" />
                        <circle cx="130" cy="20" r="3" fill="#FF6B9D" opacity="0.8" />
                        <circle cx="190" cy="20" r="3" fill="#FF6B9D" opacity="0.8" />

                        {/* Annotations */}
                        <text x="65" y="150" fill="#FF6B9D" fontSize="8">↑ Capture</text>
                        <text x="125" y="150" fill="#FF6B9D" fontSize="8">↑ Capture</text>
                        <text x="185" y="150" fill="#FF6B9D" fontSize="8">↑ Capture</text>
                    </svg>
                </div>
            </div>

            <div className="mt-6 bg-[#00D9A3]/5 border border-[#00D9A3]/20 rounded-xl p-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="text-[#00D9A3] font-black">💡 Key Concept:</span> A D Flip-Flop captures the value of D input on the rising edge (↑) of the clock.
                    The output Q holds this value until the next rising edge. This is fundamental for storing data in sequential circuits!
                </p>
            </div>
        </div>
    );
};
