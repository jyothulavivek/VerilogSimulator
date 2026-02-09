"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Settings as SettingsIcon, User, Bell, Palette, Database, Shield, Trash2, Download, Upload } from "lucide-react"
import { useStore } from "@/lib/store"

export default function Settings() {
    const { progress, completedLessons, coins, gems, badges } = useStore()
    const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'data'>('profile')

    const handleResetProgress = () => {
        if (confirm("Are you sure you want to reset all progress? This cannot be undone!")) {
            localStorage.clear()
            window.location.reload()
        }
    }

    const handleExportData = () => {
        const data = {
            progress,
            completedLessons,
            coins,
            gems,
            badges,
            exportDate: new Date().toISOString()
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `vlsi-academy-backup-${new Date().toISOString().split('T')[0]}.json`
        a.click()
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header title="Settings" />

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
                        Settings
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Manage your account preferences and data
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="col-span-3 space-y-2">
                        {[
                            { id: 'profile', label: 'Profile', icon: User },
                            { id: 'preferences', label: 'Preferences', icon: Palette },
                            { id: 'data', label: 'Data & Privacy', icon: Database }
                        ].map((tab) => {
                            const Icon = tab.icon
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-[#00D9A3]/10 text-[#00D9A3] border border-[#00D9A3]/20'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-bold">{tab.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="col-span-9 bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black uppercase italic">Profile</h2>

                                {/* Stats Overview */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Total Coins</p>
                                        <p className="text-2xl font-black text-[#FFD700]">{coins}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Total Gems</p>
                                        <p className="text-2xl font-black text-[#8B5CF6]">{gems}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Badges Earned</p>
                                        <p className="text-2xl font-black text-[#00D9A3]">{badges.length}</p>
                                    </div>
                                </div>

                                {/* Learning Stats */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-black uppercase text-gray-400">Learning Progress</h3>
                                    {Object.entries(completedLessons || {}).map(([track, lessons]) => (
                                        <div key={track} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-bold capitalize">{track}</span>
                                                <span className="text-xs text-gray-500">{(lessons as any[]).length} lessons completed</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#00D9A3]"
                                                    style={{ width: `${Math.min(((lessons as any[]).length / 20) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black uppercase italic">Preferences</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div>
                                            <p className="font-bold">Dark Mode</p>
                                            <p className="text-xs text-gray-500">Currently enabled (default)</p>
                                        </div>
                                        <div className="w-12 h-6 bg-[#00D9A3] rounded-full flex items-center px-1">
                                            <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div>
                                            <p className="font-bold">Sound Effects</p>
                                            <p className="text-xs text-gray-500">Play sounds on success</p>
                                        </div>
                                        <div className="w-12 h-6 bg-white/10 rounded-full flex items-center px-1">
                                            <div className="w-4 h-4 bg-white rounded-full" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div>
                                            <p className="font-bold">Auto-save Code</p>
                                            <p className="text-xs text-gray-500">Automatically save your code</p>
                                        </div>
                                        <div className="w-12 h-6 bg-[#00D9A3] rounded-full flex items-center px-1">
                                            <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'data' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black uppercase italic">Data & Privacy</h2>

                                <div className="space-y-4">
                                    {/* Export Data */}
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex items-start gap-3 mb-3">
                                            <Download size={20} className="text-[#00D9A3] mt-1" />
                                            <div className="flex-1">
                                                <p className="font-bold mb-1">Export Your Data</p>
                                                <p className="text-xs text-gray-500 mb-3">
                                                    Download all your progress, stats, and achievements as a JSON file
                                                </p>
                                                <button
                                                    onClick={handleExportData}
                                                    className="px-4 py-2 bg-[#00D9A3]/10 border border-[#00D9A3]/20 text-[#00D9A3] rounded-lg text-sm font-bold hover:bg-[#00D9A3]/20 transition-all"
                                                >
                                                    Export Data
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reset Progress */}
                                    <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                                        <div className="flex items-start gap-3 mb-3">
                                            <Trash2 size={20} className="text-red-500 mt-1" />
                                            <div className="flex-1">
                                                <p className="font-bold mb-1 text-red-500">Reset All Progress</p>
                                                <p className="text-xs text-gray-500 mb-3">
                                                    This will permanently delete all your progress, coins, gems, and badges. This action cannot be undone.
                                                </p>
                                                <button
                                                    onClick={handleResetProgress}
                                                    className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-bold hover:bg-red-500/20 transition-all"
                                                >
                                                    Reset Progress
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Privacy Info */}
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex items-start gap-3">
                                            <Shield size={20} className="text-[#8B5CF6] mt-1" />
                                            <div>
                                                <p className="font-bold mb-1">Privacy</p>
                                                <p className="text-xs text-gray-500">
                                                    All your data is stored locally in your browser. We don't collect or store any personal information on our servers.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
