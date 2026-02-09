"use client"

import React from "react"
import { Header } from "@/components/Header"
import { StatusCard } from "@/components/StatusCard"
import { useStore } from "@/lib/store"
import { motion } from "framer-motion"
import {
  Trophy,
  Flame,
  Target,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Clock,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const { progress, coins, streak, badges } = useStore()

  // Calculate analytics
  const totalTopics = 22 // Module 1-3: 12, Module 4: 5, Module 5: 4, Module 6: 1
  const completedTopics = Object.values(progress).filter(p => p === 100).length
  const avgProgress = Math.round(
    Object.values(progress).reduce((acc, curr) => acc + curr, 0) / totalTopics
  )

  const recentActivity = [
    { id: 1, type: 'completion', title: 'Combinational Logic', time: '2h ago', status: 'Mastered' },
    { id: 2, type: 'quiz', title: 'Dataflow Modeling', time: '5h ago', status: '80% Score' },
    { id: 3, type: 'achievement', title: 'Streak Warrior', time: 'Yesterday', status: 'Badge Earned' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header title="Student Status" />

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Profile Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00D9A3] animate-pulse" />
              <p className="text-[10px] font-black text-[#00D9A3] uppercase tracking-[0.3em]">System Online</p>
            </div>
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Engineering<br />Performance
              <span className="ml-4 text-sm bg-[#00D9A3] text-black px-2 py-1 rounded align-top not-italic tracking-normal">v1.1</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Ranking</p>
              <p className="text-xl font-black text-white italic uppercase tracking-tighter">Top 5%</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D9A3] to-[#00A37B] flex items-center justify-center rotate-3 shadow-[0_10px_30px_rgba(0,217,163,0.3)]">
              <Trophy className="text-black" size={32} />
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard
            label="Knowledge Mastery"
            value={`${avgProgress}%`}
            subValue={`${completedTopics}/${totalTopics} Modules`}
            icon={BookOpen}
            color="#00D9A3"
            progress={avgProgress}
          />
          <StatusCard
            label="Learning Streak"
            value={streak}
            subValue="Days Active"
            icon={Flame}
            color="#FF6B9D"
          />
          <StatusCard
            label="Total Badges"
            value={badges.length}
            subValue="Achievements"
            icon={Target}
            color="#8B5CF6"
          />
          <StatusCard
            label="Lab Credits"
            value={coins.toLocaleString()}
            subValue="Tokens Earned"
            icon={GraduationCap}
            color="#FFD700"
          />
        </div>

        {/* Activity & Curriculum Path */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Recent Activity */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] px-2 flex items-center justify-between">
              <span>Recent Activity</span>
              <Clock size={14} />
            </h3>
            <div className="space-y-3">
              {recentActivity.map((act) => (
                <div key={act.id} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#00D9A3]/10 transition-colors">
                    <CheckCircle2 size={18} className="text-gray-500 group-hover:text-[#00D9A3]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white uppercase italic tracking-tight">{act.title}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">{act.time} • {act.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-2xl border border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all">
              View All History
            </button>
          </div>

          {/* Curriculum Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Curriculum Overview</h3>
              <Link href="/curriculum" className="text-[10px] font-black text-[#00D9A3] uppercase flex items-center gap-1 hover:gap-2 transition-all">
                Explore All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 space-y-8 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-[#00D9A3] opacity-5 blur-[100px]" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black bg-[#00D9A3] text-black px-2 py-0.5 rounded italic">Next Up</span>
                  <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">SystemVerilog Interfaces</h4>
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-lg">
                  Master the professional way of grouping signals and defining protocols using interfaces, modports, and clocking blocks.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Topic Count', val: '4 Lessons' },
                  { label: 'Time Est.', val: '45 Mins' },
                  { label: 'Complexity', val: 'Level 2' },
                  { label: 'Reward', val: '500 XP' },
                ].map(stat => (
                  <div key={stat.label} className="space-y-1">
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xs font-black text-white italic uppercase tracking-tight">{stat.val}</p>
                  </div>
                ))}
              </div>

              <Link href="/simulator?track=sv&module=sv-1">
                <button className="w-full h-14 bg-white text-black font-black uppercase tracking-widest italic rounded-2xl shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all hover:bg-gray-100 flex items-center justify-center gap-2">
                  Start Learning Now <ChevronRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
