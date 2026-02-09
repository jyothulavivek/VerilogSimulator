import React from 'react';

export const MultiplexerDiagram = () => {
    return (
        <div className="w-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-white/10 rounded-2xl p-8 my-6">
            <h3 className="text-xl font-black uppercase italic text-[#00D9A3] mb-6 text-center">
                4:1 Multiplexer (MUX)
            </h3>

            <div className="grid grid-cols-2 gap-8">
                {/* MUX Diagram */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                    <div className="text-center mb-4">
                        <span className="text-sm font-black text-white">BLOCK DIAGRAM</span>
                    </div>
                    <svg viewBox="0 0 200 180" className="w-full h-48">
                        {/* MUX Body */}
                        <path d="M 40 20 L 120 40 L 120 140 L 40 160 Z"
                            fill="#1a1a1a" stroke="#00D9A3" strokeWidth="2" />

                        {/* Input Lines */}
                        <line x1="0" y1="50" x2="40" y2="50" stroke="#FFD700" strokeWidth="2" />
                        <text x="5" y="48" fill="#FFD700" fontSize="10" fontWeight="bold">I0</text>

                        <line x1="0" y1="75" x2="40" y2="75" stroke="#FFD700" strokeWidth="2" />
                        <text x="5" y="73" fill="#FFD700" fontSize="10" fontWeight="bold">I1</text>

                        <line x1="0" y1="100" x2="40" y2="100" stroke="#FFD700" strokeWidth="2" />
                        <text x="5" y="98" fill="#FFD700" fontSize="10" fontWeight="bold">I2</text>

                        <line x1="0" y1="125" x2="40" y2="125" stroke="#FFD700" strokeWidth="2" />
                        <text x="5" y="123" fill="#FFD700" fontSize="10" fontWeight="bold">I3</text>

                        {/* Select Lines */}
                        <line x1="60" y1="165" x2="60" y2="180" stroke="#8B5CF6" strokeWidth="2" />
                        <text x="50" y="175" fill="#8B5CF6" fontSize="10" fontWeight="bold">S0</text>

                        <line x1="90" y1="165" x2="90" y2="180" stroke="#8B5CF6" strokeWidth="2" />
                        <text x="80" y="175" fill="#8B5CF6" fontSize="10" fontWeight="bold">S1</text>

                        {/* Output Line */}
                        <line x1="120" y1="90" x2="160" y2="90" stroke="#00FF00" strokeWidth="2" />
                        <text x="135" y="88" fill="#00FF00" fontSize="10" fontWeight="bold">Y</text>

                        {/* MUX Label */}
                        <text x="60" y="95" fill="#00D9A3" fontSize="14" fontWeight="bold">MUX</text>
                        <text x="55" y="110" fill="#00D9A3" fontSize="12">4:1</text>
                    </svg>
                </div>

                {/* Truth Table */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                    <div className="text-center mb-4">
                        <span className="text-sm font-black text-white">TRUTH TABLE</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-[11px] font-mono">
                        <div className="grid grid-cols-3 gap-2 text-center font-black text-gray-400 mb-2 pb-2 border-b border-white/10">
                            <span className="text-[#8B5CF6]">S1 S0</span>
                            <span>Selected</span>
                            <span className="text-[#00FF00]">Output Y</span>
                        </div>
                        <div className="space-y-1">
                            <div className="grid grid-cols-3 gap-2 text-center py-1 hover:bg-white/5 rounded">
                                <span className="text-[#8B5CF6]">0 0</span>
                                <span>I0</span>
                                <span className="text-[#00FF00]">I0</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center py-1 hover:bg-white/5 rounded">
                                <span className="text-[#8B5CF6]">0 1</span>
                                <span>I1</span>
                                <span className="text-[#00FF00]">I1</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center py-1 hover:bg-white/5 rounded">
                                <span className="text-[#8B5CF6]">1 0</span>
                                <span>I2</span>
                                <span className="text-[#00FF00]">I2</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center py-1 hover:bg-white/5 rounded">
                                <span className="text-[#8B5CF6]">1 1</span>
                                <span>I3</span>
                                <span className="text-[#00FF00]">I3</span>
                            </div>
                        </div>
                    </div>

                    {/* Equation */}
                    <div className="mt-4 bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-lg p-3">
                        <p className="text-[10px] text-gray-400 mb-1 font-black">BOOLEAN EXPRESSION:</p>
                        <p className="text-xs font-mono text-white">
                            Y = S̄1·S̄0·I0 + S̄1·S0·I1 + S1·S̄0·I2 + S1·S0·I3
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-[#00D9A3]/5 border border-[#00D9A3]/20 rounded-xl p-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="text-[#00D9A3] font-black">💡 Key Concept:</span> A multiplexer selects one of many inputs and forwards it to a single output.
                    The select lines (S1, S0) determine which input (I0-I3) appears at the output Y. Think of it as a digital switch!
                </p>
            </div>
        </div>
    );
};
