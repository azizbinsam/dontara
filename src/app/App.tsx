import React, { useState } from "react";
import dontaraLogo from "../assets/logo-dontara.png";
import untirtaLogo from "../assets/logo-untirta.svg";
import {
  Home, Heart, Target, Shield, Clock, Users, Trophy, User, Bell,
  Search, QrCode, Award, Menu, X, Copy, CheckCircle2, ArrowUpRight,
  ArrowDownLeft, Wallet, Building2, Smartphone, Flame, Star, ChevronRight,
  Eye, TrendingUp, Globe, BarChart2, Check, ExternalLink, ThumbsUp,
  AlertCircle, BookOpen, Vote, Settings, LogOut, ChevronDown, Filter,
  Download, Upload, Hash, Lock, FileText, Layers, Gift, Zap, ChevronLeft,
  CreditCard, RefreshCw, Info, MapPin, Calendar, Camera,
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend,
} from "recharts";

// ─── Color constants ──────────────────────────────────────────────────────────
const C = {
  maroon: "#82000c",
  green: "#134224",
  cream: "#F7F3EB",
  white: "#FFFFFF",
  lightGreen: "#E8F0E9",
  lightGray: "#F3F4F2",
  gold: "#D8B45A",
  border: "rgba(19,66,36,0.12)",
};

// ─── SVG Logo Components ──────────────────────────────────────────────────────
const DontaraLogo = ({ size = 40 }: { size?: number }) => (
  <span className="inline-flex items-center justify-center rounded-lg bg-white p-1 flex-shrink-0">
    <img
      src={dontaraLogo}
      alt="Logo DONTARA"
      style={{ height: size, width: "auto", objectFit: "contain" }}
    />
  </span>
);

const UntirtalLogo = ({ size = 36 }: { size?: number }) => (
  <img
    src={untirtaLogo}
    width={size}
    height={size}
    alt="Logo Untirta"
    style={{ objectFit: "contain" }}
  />
);

// ─── Types ────────────────────────────────────────────────────────────────────
type Page =
  | "beranda" | "donasi" | "kampanye" | "transparansi" | "riwayat"
  | "akad" | "komunitas" | "gamifikasi" | "profil" | "admin" | "detail-kampanye";

// ─── Data ─────────────────────────────────────────────────────────────────────
const campaigns = [
  {
    id: 1, title: "Bantuan Pendidikan Anak Yatim", category: "Pendidikan",
    target: 300000000, collected: 245000000,
    donors: 1250, daysLeft: 12, urgent: true,
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop&auto=format",
    desc: "Membantu anak-anak yatim di sekitar kampus Untirta mendapatkan akses pendidikan yang layak.",
    org: "BEM FEB Untirta",
  },
  {
    id: 2, title: "Tanggap Bencana Alam", category: "Kemanusiaan",
    target: 200000000, collected: 128450000,
    donors: 892, daysLeft: 7, urgent: true,
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop&auto=format",
    desc: "Bantuan untuk korban bencana alam di berbagai daerah — makanan, obat, dan kebutuhan logistik.",
    org: "UKM Mapala Untirta",
  },
  {
    id: 3, title: "Beasiswa Mahasiswa Untirta", category: "Pendidikan",
    target: 150000000, collected: 75000000,
    donors: 543, daysLeft: 20, urgent: false,
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&auto=format",
    desc: "Program beasiswa untuk mahasiswa berprestasi yang membutuhkan dukungan finansial.",
    org: "Yayasan Untirta Peduli",
  },
  {
    id: 4, title: "Program Sosial Kampus", category: "Sosial",
    target: 100000000, collected: 60000000,
    donors: 321, daysLeft: 30, urgent: false,
    img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop&auto=format",
    desc: "Berbagai kegiatan sosial untuk memperkuat kepedulian sivitas akademika Untirta.",
    org: "Dewan Mahasiswa Untirta",
  },
  {
    id: 5, title: "Kesehatan Masyarakat Kampus", category: "Kesehatan",
    target: 80000000, collected: 42000000,
    donors: 210, daysLeft: 45, urgent: false,
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
    desc: "Layanan kesehatan gratis dan penyuluhan gizi untuk masyarakat sekitar kampus.",
    org: "BEM FK Untirta",
  },
];

const txData = [
  { id: "TXN-2025-0581", date: "10 Mei 2025", campaign: "Bantuan Pendidikan Anak Yatim", type: "Donasi Masuk", amount: 50000, status: "Berhasil", hash: "0x4a7f...c3d2" },
  { id: "TXN-2025-0580", date: "07 Mei 2025", campaign: "Tanggap Bencana Alam", type: "Penyaluran Dana", amount: -100000, status: "Berhasil", hash: "0x8b2e...f1a9" },
  { id: "TXN-2025-0579", date: "05 Mei 2025", campaign: "Beasiswa Mahasiswa Untirta", type: "Donasi Masuk", amount: 75000, status: "Berhasil", hash: "0x3c5d...7e4b" },
  { id: "TXN-2025-0578", date: "03 Mei 2025", campaign: "Program Sosial Kampus", type: "Donasi Masuk", amount: 25000, status: "Berhasil", hash: "0x9f1a...2c8e" },
  { id: "TXN-2025-0577", date: "01 Mei 2025", campaign: "Bantuan Pendidikan Anak Yatim", type: "Penyaluran Dana", amount: -150000, status: "Berhasil", hash: "0x6d4c...b3f7" },
  { id: "TXN-2025-0576", date: "28 Apr 2025", campaign: "Tanggap Bencana Alam", type: "Donasi Masuk", amount: 100000, status: "Sedang Diproses", hash: "0x2e9b...4a1c" },
];

const chartDataArea = [
  { bulan: "Jan", masuk: 42, keluar: 28 },
  { bulan: "Feb", masuk: 58, keluar: 35 },
  { bulan: "Mar", masuk: 75, keluar: 50 },
  { bulan: "Apr", masuk: 95, keluar: 65 },
  { bulan: "Mei", masuk: 120, keluar: 85 },
  { bulan: "Jun", masuk: 110, keluar: 90 },
];

const pieData = [
  { name: "Pendidikan", value: 45 },
  { name: "Kemanusiaan", value: 30 },
  { name: "Sosial", value: 15 },
  { name: "Kesehatan", value: 10 },
];

const PIE_COLORS = [C.green, C.maroon, C.gold, "#94a3b8"];

const badges = [
  { name: "Sahabat Ta'awun", icon: "🤝", earned: true, desc: "Donasi pertama berhasil" },
  { name: "Donatur Istiqamah", icon: "🔥", earned: true, desc: "5 donasi berturut-turut" },
  { name: "Pejuang Kebaikan", icon: "⚔️", earned: true, desc: "Total donasi > Rp 500.000" },
  { name: "Penggerak Kepedulian", icon: "💚", earned: false, desc: "Ajak 5 teman bergabung" },
  { name: "Duta Solidaritas", icon: "🏅", earned: false, desc: "Level 10 Ta'awun" },
  { name: "Pahlawan Pendidikan", icon: "📚", earned: false, desc: "Donasi 3 kampanye pendidikan" },
];

const leaderboard = [
  { rank: 1, name: "Andi Pratama", faculty: "Teknik", points: 5250, badge: "🏆", anon: false },
  { rank: 2, name: "Siti Aisyah", faculty: "Ekonomi", points: 4800, badge: "🥈", anon: false },
  { rank: 3, name: "Budi Santoso", faculty: "Hukum", points: 4500, badge: "🥉", anon: false },
  { rank: 4, name: "***Anonim***", faculty: "—", points: 3900, badge: "4️⃣", anon: true },
  { rank: 5, name: "Dewi Rahayu", faculty: "FKIP", points: 3600, badge: "5️⃣", anon: false },
  { rank: 12, name: "Sahabat Amal (Anda)", faculty: "Ekonomi", points: 1250, badge: "👤", anon: false, isMe: true },
];

// ─── Reusable Components ──────────────────────────────────────────────────────
const ProgressBar = ({ value, max, color = C.maroon }: { value: number; max: number; color?: string }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, sub }: { label: string; value: string; icon: React.FC<any>; color: string; sub?: string }) => (
  <div className="bg-card rounded-xl p-4 shadow-sm border border-border flex items-start gap-3">
    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
      <Icon size={20} style={{ color }} />
    </div>
    <div className="min-w-0">
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
      <div className="text-lg font-bold text-foreground leading-tight">{value}</div>
      {sub && <div className="text-xs text-green-600 font-medium">{sub}</div>}
    </div>
  </div>
);

const CampaignCard = ({ camp, onSelect }: { camp: typeof campaigns[0]; onSelect: () => void }) => {
  const pct = Math.round((camp.collected / camp.target) * 100);
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={onSelect}>
      <div className="relative h-36 bg-gray-100">
        <img src={camp.img} alt={camp.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: C.green }}>{camp.category}</span>
        </div>
        {camp.urgent && (
          <div className="absolute top-2 right-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-600 text-white">Mendesak</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="font-semibold text-sm text-foreground mb-1 line-clamp-2">{camp.title}</div>
        <div className="text-xs text-muted-foreground mb-2">{camp.org}</div>
        <ProgressBar value={camp.collected} max={camp.target} />
        <div className="flex justify-between text-xs mt-1 mb-2">
          <span className="font-semibold" style={{ color: C.maroon }}>Rp {(camp.collected / 1000000).toFixed(1)}jt</span>
          <span className="text-muted-foreground">{pct}% dari Rp {(camp.target / 1000000).toFixed(0)}jt</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mb-3">
          <span><Users size={11} className="inline mr-1" />{camp.donors.toLocaleString()} donatur</span>
          <span><Clock size={11} className="inline mr-1" />{camp.daysLeft} hari lagi</span>
        </div>
        <button
          className="w-full py-1.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: C.maroon }}
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
        >
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
};

const BadgeChip = ({ badge }: { badge: typeof badges[0] }) => (
  <div className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${badge.earned ? "border-amber-300 bg-amber-50" : "border-border bg-muted opacity-50"}`}>
    <div className="text-2xl">{badge.icon}</div>
    <div className="text-xs font-semibold text-center leading-tight">{badge.name}</div>
    <div className="text-xs text-muted-foreground text-center">{badge.desc}</div>
    {badge.earned && <div className="text-xs text-green-600 font-semibold">Diraih ✓</div>}
  </div>
);

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const navItems: { id: Page; label: string; Icon: React.FC<any> }[] = [
  { id: "beranda", label: "Beranda", Icon: Home },
  { id: "donasi", label: "Donasi", Icon: Heart },
  { id: "kampanye", label: "Kampanye", Icon: Target },
  { id: "transparansi", label: "Transparansi Dana", Icon: Shield },
  { id: "riwayat", label: "Riwayat Donasi", Icon: Clock },
  { id: "akad", label: "Akad & Prinsip Syariah", Icon: BookOpen },
  { id: "komunitas", label: "Komunitas", Icon: Users },
  { id: "gamifikasi", label: "Gamifikasi", Icon: Trophy },
  { id: "profil", label: "Profil & Verifikasi", Icon: User },
];

const bottomNavItems = [
  { id: "beranda" as Page, label: "Beranda", Icon: Home },
  { id: "kampanye" as Page, label: "Kampanye", Icon: Target },
  { id: "donasi" as Page, label: "Donasi", Icon: Heart },
  { id: "riwayat" as Page, label: "Riwayat", Icon: Clock },
  { id: "profil" as Page, label: "Profil", Icon: User },
];

// ─── PAGES ────────────────────────────────────────────────────────────────────

// ─── Page: BERANDA ────────────────────────────────────────────────────────────
const PageBeranda = ({ setPage, setSelectedCampaign }: { setPage: (p: Page) => void; setSelectedCampaign: (c: typeof campaigns[0]) => void }) => {
  const main = campaigns[0];
  const mainPct = Math.round((main.collected / main.target) * 100);
  const [voted, setVoted] = useState<number | null>(null);

  const nextCauses = [
    { id: 1, title: "Beasiswa Mahasiswa Kurang Mampu", votes: 342, icon: "📚" },
    { id: 2, title: "Rumah Singgah Korban Bencana", votes: 289, icon: "🏠" },
    { id: 3, title: "Klinik Kesehatan Gratis Kampus", votes: 215, icon: "🏥" },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Hero Welcome */}
      <div
        className="relative rounded-2xl overflow-hidden p-6 lg:p-8"
        style={{ background: `linear-gradient(135deg, ${C.green} 0%, #1e6b3a 100%)` }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-4 border-white" />
          <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-2 border-white" />
        </div>
        <div className="relative z-10">
          <div className="text-white/80 text-sm mb-1">Assalamu'alaikum,</div>
          <h1 className="text-white text-xl lg:text-2xl font-bold mb-2">Sahabat Ta'awun! 👋</h1>
          <p className="text-white/80 text-sm lg:text-base mb-4 max-w-lg">
            Mari bersama sivitas akademika Untirta wujudkan kebaikan melalui infak dan sedekah yang amanah, transparan, dan berdampak nyata.
          </p>
          <button
            className="px-5 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: C.maroon, color: "white" }}
            onClick={() => setPage("donasi")}
          >
            <Heart size={16} /> Mulai Berdonasi
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Dana Terkumpul" value="Rp 745jt" icon={Wallet} color={C.maroon} sub="↑ 12,5% dari bulan lalu" />
        <StatCard label="Jumlah Donatur" value="5.342" icon={Users} color={C.green} sub="↑ 8,2% dari bulan lalu" />
        <StatCard label="Kampanye Aktif" value="4" icon={Target} color="#d97706" sub="One Month One Cause" />
        <StatCard label="Dana Tersalurkan" value="Rp 612jt" icon={CheckCircle2} color="#16a34a" sub="1.250+ penerima manfaat" />
      </div>

      {/* ONE MONTH ONE CAUSE — Featured Campaign */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: C.maroon }}>
            ⭐ ONE MONTH ONE CAUSE — MEI 2025
          </div>
        </div>
        <div
          className="rounded-2xl overflow-hidden shadow-lg border-2 cursor-pointer hover:shadow-xl transition-shadow"
          style={{ borderColor: C.maroon }}
          onClick={() => { setSelectedCampaign(main); setPage("detail-kampanye"); }}
        >
          <div className="relative h-48 lg:h-64 bg-gray-100">
            <img src={main.img} alt={main.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xs text-white/80 mb-1">{main.category}</div>
              <h2 className="text-white text-lg font-bold">{main.title}</h2>
            </div>
          </div>
          <div className="p-4 bg-card">
            <p className="text-sm text-muted-foreground mb-3">{main.desc}</p>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold" style={{ color: C.maroon }}>Terkumpul: Rp {(main.collected / 1000000).toFixed(0)}jt</span>
              <span className="font-semibold text-foreground">Target: Rp {(main.target / 1000000).toFixed(0)}jt</span>
            </div>
            <ProgressBar value={main.collected} max={main.target} />
            <div className="flex justify-between text-xs text-muted-foreground mt-1 mb-4">
              <span>{mainPct}% tercapai</span>
              <span><Users size={11} className="inline mr-1" />{main.donors.toLocaleString()} donatur · {main.daysLeft} hari lagi</span>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: C.maroon }}
                onClick={(e) => { e.stopPropagation(); setPage("donasi"); }}
              >
                Donasi Sekarang →
              </button>
              <button
                className="px-4 py-2.5 rounded-xl font-semibold text-sm border border-border hover:bg-muted transition-colors"
                style={{ color: C.green }}
                onClick={(e) => { e.stopPropagation(); setSelectedCampaign(main); setPage("detail-kampanye"); }}
              >
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Voting Next Cause */}
      <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Vote size={18} style={{ color: C.green }} />
          <h3 className="font-bold text-foreground">Pilih Kepedulian Bulan Berikutnya</h3>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: C.lightGreen, color: C.green }}>Voting Aktif</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Suarakan kepedulianmu! Kampanye terbanyak suara akan menjadi fokus Juni 2025.</p>
        <div className="space-y-2">
          {nextCauses.map((nc) => (
            <button
              key={nc.id}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${voted === nc.id ? "border-green-500 bg-green-50" : "border-border hover:border-green-300 hover:bg-muted"}`}
              onClick={() => setVoted(nc.id)}
            >
              <span className="text-xl">{nc.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{nc.title}</div>
                <div className="text-xs text-muted-foreground">{nc.votes + (voted === nc.id ? 1 : 0)} suara</div>
              </div>
              {voted === nc.id && <Check size={16} className="text-green-600 flex-shrink-0" />}
            </button>
          ))}
        </div>
        {voted && <div className="mt-3 text-xs text-green-600 font-medium text-center">✓ Suaramu telah tercatat. Terima kasih telah berpartisipasi!</div>}
      </div>

      {/* Blockchain Transparency Summary */}
      <div className="rounded-2xl p-4 lg:p-5 shadow-sm" style={{ backgroundColor: C.green }}>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-white" />
          <h3 className="font-bold text-white">Transparansi Dana Blockchain</h3>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-white/20 text-white">Live</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Dana Masuk", value: "Rp 745jt", icon: ArrowDownLeft },
            { label: "Dana Keluar", value: "Rp 612jt", icon: ArrowUpRight },
            { label: "Saldo", value: "Rp 132jt", icon: Wallet },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
              <Icon size={16} className="text-white/80 mx-auto mb-1" />
              <div className="text-white font-bold text-sm">{value}</div>
              <div className="text-white/70 text-xs">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between bg-white/10 rounded-xl px-3 py-2 mb-3">
          <div className="text-white/80 text-xs">Transaksi tercatat: <span className="font-bold text-white">1.847</span></div>
          <div className="text-white/80 text-xs">Laporan: <span className="font-bold text-green-300">Diperbarui</span></div>
        </div>
        <button
          className="w-full py-2 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: "white", color: C.green }}
          onClick={() => setPage("transparansi")}
        >
          Lihat Transparansi Dana →
        </button>
      </div>

      {/* Gamifikasi Ta'awun Panel */}
      <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy size={18} style={{ color: C.gold }} />
            <h3 className="font-bold text-foreground">Gamifikasi Ta'awun</h3>
          </div>
          <button className="text-xs font-semibold" style={{ color: C.maroon }} onClick={() => setPage("gamifikasi")}>Lihat Semua →</button>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">🧕</div>
          <div className="flex-1">
            <div className="font-bold text-foreground">Sahabat Amal</div>
            <div className="text-xs text-muted-foreground mb-1">Level 5 — Sahabat Kebaikan</div>
            <div className="text-xs text-muted-foreground mb-1">1.250 / 2.000 XP</div>
            <ProgressBar value={1250} max={2000} color={C.gold} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 rounded-xl" style={{ backgroundColor: C.lightGreen }}>
            <div className="font-bold text-lg" style={{ color: C.green }}>1.250</div>
            <div className="text-xs text-muted-foreground">Poin Ta'awun</div>
          </div>
          <div className="text-center p-2 rounded-xl" style={{ backgroundColor: "#fff7ed" }}>
            <div className="font-bold text-lg" style={{ color: "#d97706" }}>5</div>
            <div className="text-xs text-muted-foreground">Badge Diraih</div>
          </div>
          <div className="text-center p-2 rounded-xl" style={{ backgroundColor: "#fef2f2" }}>
            <div className="font-bold text-lg flex items-center justify-center gap-1" style={{ color: C.maroon }}><Flame size={16} />7</div>
            <div className="text-xs text-muted-foreground">Hari Streak</div>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {badges.filter(b => b.earned).map(b => (
            <div key={b.name} title={b.name} className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-lg">{b.icon}</div>
          ))}
        </div>
      </div>

      {/* Other Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-foreground">Kampanye Lainnya</h3>
          <button className="text-xs font-semibold" style={{ color: C.maroon }} onClick={() => setPage("kampanye")}>Lihat Semua →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.slice(1, 4).map(camp => (
            <CampaignCard key={camp.id} camp={camp} onSelect={() => { setSelectedCampaign(camp); setPage("detail-kampanye"); }} />
          ))}
        </div>
      </div>

      {/* Community Activity */}
      <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-foreground">Aktivitas Komunitas</h3>
          <button className="text-xs font-semibold" style={{ color: C.maroon }} onClick={() => setPage("komunitas")}>Lihat Semua →</button>
        </div>
        <div className="space-y-3">
          {[
            { text: "Mahasiswa Teknik berhasil kumpulkan Rp 15jt untuk beasiswa.", time: "2 jam lalu", icon: "🎓" },
            { text: "UKM Mapala salurkan bantuan ke 120 KK korban bencana.", time: "5 jam lalu", icon: "❤️" },
            { text: "Komunitas dosen donasi rutin bulan Mei tercapai 95%.", time: "1 hari lalu", icon: "👨‍🏫" },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-base flex-shrink-0">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground">{item.text}</div>
                <div className="text-xs text-muted-foreground">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data demo notice */}
      <div className="text-center text-xs text-muted-foreground py-2 border-t border-border">
        ⚠️ Seluruh data merupakan <strong>Data Demo / Simulasi</strong> untuk keperluan prototipe
      </div>
    </div>
  );
};

// ─── Page: DONASI ─────────────────────────────────────────────────────────────
const PageDonasi = () => {
  const [step, setStep] = useState(1);
  const [selectedCamp, setSelectedCamp] = useState(campaigns[0]);
  const [donasiType, setDonasiType] = useState<"infak" | "sedekah">("infak");
  const [nominal, setNominal] = useState<number | null>(50000);
  const [customNominal, setCustomNominal] = useState("");
  const [payMethod, setPayMethod] = useState("qris");
  const [anonymous, setAnonymous] = useState(false);
  const [payStatus, setPayStatus] = useState<"idle" | "processing" | "success">("idle");

  const nominals = [10000, 25000, 50000, 100000];
  const effectiveNominal = nominal ?? (parseInt(customNominal.replace(/\D/g, "")) || 0);

  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");
  
  const handlePay = () => {
    setPayStatus("processing");
    setTimeout(() => setPayStatus("success"), 2000);
  };

  if (payStatus === "success") {
    return (
      <div className="max-w-md mx-auto py-10 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Donasi Berhasil! 🎉</h2>
        <p className="text-sm text-muted-foreground">Jazakallah khayran atas kebaikanmu. Donasi {donasiType} sebesar {fmt(effectiveNominal)} untuk <strong>{selectedCamp.title}</strong> telah kami terima.</p>
        <div className="bg-card rounded-xl p-4 border border-border text-left space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">ID Transaksi</span><span className="font-mono font-semibold text-xs">TXN-2025-0592</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Kampanye</span><span className="font-semibold text-right text-xs max-w-[60%]">{selectedCamp.title}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Nominal</span><span className="font-bold" style={{ color: C.maroon }}>{fmt(effectiveNominal)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Jenis</span><span className="capitalize">{donasiType}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-green-600 font-semibold">Berhasil</span></div>
        </div>
        <div className="text-xs text-muted-foreground p-3 rounded-xl" style={{ backgroundColor: C.lightGreen }}>
          Poin Ta'awun +50 XP telah ditambahkan ke akun Anda!
        </div>
        <button className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: C.maroon }} onClick={() => { setStep(1); setPayStatus("idle"); }}>
          Donasi Lagi
        </button>
        <button className="w-full py-3 rounded-xl font-semibold border border-border" onClick={() => {}}>
          Unduh Bukti Donasi
        </button>
      </div>
    );
  }

  if (payStatus === "processing") {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-green-200 border-t-green-600 animate-spin mx-auto" />
        <p className="font-semibold text-foreground">Memproses pembayaran...</p>
        <p className="text-sm text-muted-foreground">Mohon tunggu sebentar</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 lg:pb-6">
      <h2 className="text-xl font-bold mb-1">Donasi Sekarang</h2>
      <p className="text-sm text-muted-foreground mb-5">Pilih program dan nominal donasi yang ingin Anda dukung.</p>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4].map(s => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${step >= s ? "text-white" : "bg-gray-100 text-gray-400"}`}
              style={step >= s ? { backgroundColor: C.maroon } : {}}>
              {step > s ? <Check size={14} /> : s}
            </div>
            {s < 4 && <div className={`flex-1 h-1 rounded-full transition-all ${step > s ? "" : "bg-gray-100"}`} style={step > s ? { backgroundColor: C.maroon } : {}} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="font-semibold text-foreground">Pilih Program Donasi</div>
          {campaigns.map(c => (
            <button
              key={c.id}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${selectedCamp.id === c.id ? "border-red-400 bg-red-50" : "border-border bg-card hover:bg-muted"}`}
              onClick={() => setSelectedCamp(c)}
            >
              <img src={c.img} alt={c.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.category}</div>
                <ProgressBar value={c.collected} max={c.target} />
                <div className="text-xs mt-1" style={{ color: C.maroon }}>{Math.round((c.collected / c.target) * 100)}% tercapai</div>
              </div>
              {selectedCamp.id === c.id && <Check size={16} className="flex-shrink-0" style={{ color: C.maroon }} />}
            </button>
          ))}
          <button className="w-full py-3 rounded-xl font-bold text-white mt-2" style={{ backgroundColor: C.maroon }} onClick={() => setStep(2)}>
            Lanjutkan →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <div className="font-semibold mb-2">Jenis Donasi</div>
            <div className="grid grid-cols-2 gap-3">
              {(["infak", "sedekah"] as const).map(t => (
                <button key={t}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${donasiType === t ? "border-green-500 bg-green-50" : "border-border bg-card"}`}
                  onClick={() => setDonasiType(t)}>
                  <div className="font-bold capitalize text-foreground">{t}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {t === "infak" ? "Harta yang dikeluarkan untuk kepentingan bersama" : "Pemberian sukarela tanpa syarat tertentu"}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Pilih Nominal</div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {nominals.map(n => (
                <button key={n}
                  className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${nominal === n ? "border-red-500 bg-red-50 text-red-700" : "border-border bg-card"}`}
                  onClick={() => { setNominal(n); setCustomNominal(""); }}>
                  {fmt(n)}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Nominal lain (min. Rp 5.000)"
              className="w-full p-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-red-300"
              value={customNominal}
              onChange={e => { setCustomNominal(e.target.value); setNominal(null); }}
            />
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
            <input type="checkbox" id="anon" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} className="w-4 h-4" />
            <label htmlFor="anon" className="text-sm cursor-pointer">Sembunyikan nama saya (Donasi anonim)</label>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 rounded-xl border border-border font-semibold text-sm" onClick={() => setStep(1)}>← Kembali</button>
            <button className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ backgroundColor: C.maroon }} onClick={() => setStep(3)}>Lanjutkan →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <div className="font-semibold mb-2">Metode Pembayaran</div>
            {[
              { id: "qris", label: "QRIS (Semua Bank)", icon: QrCode },
              { id: "transfer", label: "Transfer Bank Syariah", icon: Building2 },
              { id: "ewallet", label: "E-Wallet (OVO, GoPay, Dana, ShopeePay)", icon: Smartphone },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id}
                className={`w-full flex items-center gap-3 p-3 mb-2 rounded-xl border-2 text-left transition-all ${payMethod === id ? "border-green-500 bg-green-50" : "border-border bg-card"}`}
                onClick={() => setPayMethod(id)}>
                <Icon size={20} style={{ color: payMethod === id ? C.green : "#6b7280" }} />
                <span className="font-medium text-sm">{label}</span>
                {payMethod === id && <Check size={16} className="ml-auto text-green-600" />}
              </button>
            ))}
          </div>
          <div className="bg-card rounded-xl border border-border p-4 space-y-2 text-sm">
            <div className="font-bold text-foreground mb-2">Pernyataan Akad</div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Dengan melanjutkan donasi ini, saya menyatakan bahwa dana yang saya berikan adalah {donasiType} yang diberikan secara ikhlas lillahi ta'ala, tanpa paksaan, untuk mendukung program <strong>{selectedCamp.title}</strong>, dan akan dikelola sesuai prinsip syariah oleh tim DONTARA Untirta.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 rounded-xl border border-border font-semibold text-sm" onClick={() => setStep(2)}>← Kembali</button>
            <button className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ backgroundColor: C.maroon }} onClick={() => setStep(4)}>Lanjutkan →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <div className="font-semibold">Ringkasan Donasi</div>
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <div className="flex gap-3 items-center pb-3 border-b border-border">
              <img src={selectedCamp.img} alt={selectedCamp.title} className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <div className="font-semibold text-sm">{selectedCamp.title}</div>
                <div className="text-xs text-muted-foreground">{selectedCamp.category}</div>
              </div>
            </div>
            {[
              ["Jenis Donasi", donasiType.charAt(0).toUpperCase() + donasiType.slice(1)],
              ["Nominal", fmt(effectiveNominal)],
              ["Metode Bayar", payMethod === "qris" ? "QRIS" : payMethod === "transfer" ? "Transfer Bank" : "E-Wallet"],
              ["Nama", anonymous ? "Anonim" : "Sahabat Amal"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-border flex justify-between font-bold">
              <span>Total</span>
              <span style={{ color: C.maroon }}>{fmt(effectiveNominal)}</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-xs text-green-700 flex items-start gap-2">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            <span>Data Demo — Pembayaran ini adalah simulasi prototipe. Tidak ada transaksi nyata yang terjadi.</span>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 rounded-xl border border-border font-semibold text-sm" onClick={() => setStep(3)}>← Kembali</button>
            <button className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ backgroundColor: C.maroon }} onClick={handlePay}>
              Lanjutkan Pembayaran →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Page: KAMPANYE ───────────────────────────────────────────────────────────
const PageKampanye = ({ setPage, setSelectedCampaign }: { setPage: (p: Page) => void; setSelectedCampaign: (c: typeof campaigns[0]) => void }) => {
  const cats = ["Semua", "Pendidikan", "Kemanusiaan", "Sosial", "Kesehatan", "Bencana"];
  const [cat, setCat] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = campaigns.filter(c =>
    (cat === "Semua" || c.category === cat) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-20 lg:pb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Kampanye</h2>
          <p className="text-sm text-muted-foreground">Jelajahi program donasi aktif</p>
        </div>
        <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
          <Filter size={14} /> Filter
        </button>
      </div>
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-red-200 text-sm"
          placeholder="Cari kampanye..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
        {cats.map(c => (
          <button key={c}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={cat === c ? { backgroundColor: C.maroon, color: "white", borderColor: C.maroon } : { borderColor: C.border, color: "#6b7280" }}
            onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">Tidak ada kampanye ditemukan.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(camp => (
            <CampaignCard key={camp.id} camp={camp} onSelect={() => { setSelectedCampaign(camp); setPage("detail-kampanye"); }} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Page: DETAIL KAMPANYE ────────────────────────────────────────────────────
const PageDetailKampanye = ({ camp, setPage }: { camp: typeof campaigns[0]; setPage: (p: Page) => void }) => {
  const [tab, setTab] = useState<"tentang" | "update" | "laporan">("tentang");
  const pct = Math.round((camp.collected / camp.target) * 100);
  return (
    <div className="max-w-2xl mx-auto pb-20 lg:pb-6">
      <button className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground" onClick={() => setPage("kampanye")}>
        <ChevronLeft size={16} /> Kembali ke Kampanye
      </button>
      <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm mb-4">
        <div className="relative h-52 bg-gray-100">
          <img src={camp.img} alt={camp.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
          <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: C.green }}>{camp.category}</span>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-1">{camp.title}</h2>
          <div className="text-xs text-muted-foreground mb-3">oleh <span className="font-semibold">{camp.org}</span></div>
          <div className="grid grid-cols-3 gap-3 mb-3 text-center text-sm">
            <div className="bg-muted rounded-xl p-2">
              <div className="font-bold" style={{ color: C.maroon }}>Rp {(camp.collected / 1000000).toFixed(1)}jt</div>
              <div className="text-xs text-muted-foreground">Terkumpul</div>
            </div>
            <div className="bg-muted rounded-xl p-2">
              <div className="font-bold" style={{ color: C.green }}>Rp {(camp.target / 1000000).toFixed(0)}jt</div>
              <div className="text-xs text-muted-foreground">Target</div>
            </div>
            <div className="bg-muted rounded-xl p-2">
              <div className="font-bold">{camp.donors.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Donatur</div>
            </div>
          </div>
          <ProgressBar value={camp.collected} max={camp.target} />
          <div className="flex justify-between text-xs mt-1 mb-4">
            <span style={{ color: C.maroon }} className="font-semibold">{pct}% tercapai</span>
            <span className="text-muted-foreground"><Clock size={11} className="inline mr-1" />{camp.daysLeft} hari lagi</span>
          </div>
          <button className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: C.maroon }} onClick={() => setPage("donasi")}>
            Donasi Sekarang →
          </button>
        </div>
      </div>

      <div className="flex border-b border-border mb-4">
        {(["tentang", "update", "laporan"] as const).map(t => (
          <button key={t} className={`flex-1 py-2.5 text-sm font-semibold border-b-2 transition-colors capitalize ${tab === t ? "border-red-600 text-red-700" : "border-transparent text-muted-foreground"}`}
            onClick={() => setTab(t)}>
            {t === "tentang" ? "Tentang" : t === "update" ? "Update" : "Laporan"}
          </button>
        ))}
      </div>

      {tab === "tentang" && (
        <div className="bg-card rounded-xl p-4 border border-border space-y-4">
          <div>
            <div className="font-semibold mb-1">Deskripsi Program</div>
            <p className="text-sm text-muted-foreground">{camp.desc} Program ini dijalankan sesuai prinsip syariah dan dipantau secara transparan oleh tim DONTARA Untirta.</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Rencana Penggunaan Dana</div>
            {[["Logistik & Sembako", "40%"], ["Kesehatan", "30%"], ["Tenda Darurat", "20%"], ["Lainnya", "10%"]].map(([label, pct]) => (
              <div key={label} className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold">{pct}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "update" && (
        <div className="space-y-3">
          {[
            { date: "10 Mei 2025", title: "Penyaluran Tahap 2 Berhasil", desc: "Dana sebesar Rp 50.000.000 telah disalurkan kepada 120 penerima manfaat." },
            { date: "1 Mei 2025", title: "Kampanye Mulai Berjalan", desc: "Program telah resmi dimulai dan dana pertama telah diterima." },
          ].map((u, i) => (
            <div key={i} className="bg-card rounded-xl p-4 border border-border">
              <div className="text-xs text-muted-foreground mb-1">{u.date}</div>
              <div className="font-semibold text-sm mb-1">{u.title}</div>
              <div className="text-xs text-muted-foreground">{u.desc}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "laporan" && (
        <div className="space-y-3">
          {[
            { title: "Laporan Penyaluran Mei 2025", amount: "Rp 50.000.000", date: "10 Mei 2025", verified: true },
            { title: "Laporan Penyaluran April 2025", amount: "Rp 75.000.000", date: "5 Apr 2025", verified: true },
          ].map((l, i) => (
            <div key={i} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm">{l.title}</div>
                <div className="text-xs text-muted-foreground">{l.date} · {l.amount}</div>
                {l.verified && <div className="text-xs text-green-600 font-semibold mt-1">✓ Terverifikasi</div>}
              </div>
              <button className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg border border-border hover:bg-muted">
                <Download size={12} /> Unduh
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Page: TRANSPARANSI ───────────────────────────────────────────────────────
const PageTransparansi = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const filtered = txData.filter(tx =>
    (filterStatus === "Semua" || tx.status === filterStatus) &&
    (tx.id.includes(search) || tx.campaign.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pb-20 lg:pb-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold">Transparansi Dana</h2>
        <p className="text-sm text-muted-foreground">Pantau alur dana secara real-time — dari penghimpunan hingga laporan akhir.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Dana Masuk" value="Rp 745jt" icon={ArrowDownLeft} color={C.green} />
        <StatCard label="Dana Disalurkan" value="Rp 612jt" icon={ArrowUpRight} color={C.maroon} />
        <StatCard label="Saldo Tersedia" value="Rp 132jt" icon={Wallet} color="#d97706" />
        <StatCard label="Total Transaksi" value="1.847" icon={Hash} color="#7c3aed" />
      </div>

      {/* Alur Dana */}
      <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
        <div className="font-semibold mb-3">Alur Pengelolaan Dana</div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {[
            { label: "Donasi Diterima", icon: ArrowDownLeft },
            { label: "Pembayaran Diverifikasi", icon: CheckCircle2 },
            { label: "Transaksi Dicatat", icon: Hash },
            { label: "Dana Disalurkan", icon: ArrowUpRight },
            { label: "Laporan Dipublikasikan", icon: FileText },
          ].map(({ label, icon: Icon }, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.green }}>
                  <Icon size={14} className="text-white" />
                </div>
                <div className="text-xs text-center font-medium leading-tight max-w-16">{label}</div>
              </div>
              {i < 4 && <div className="flex-shrink-0 w-4 h-0.5 bg-green-200 mt-[-10px]" />}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-3 text-xs text-muted-foreground p-3 bg-muted rounded-xl">
          <Info size={12} className="inline mr-1" />
          Blockchain digunakan untuk mendukung keterlacakan catatan transaksi. Rekonsiliasi keuangan, verifikasi penyaluran, dan audit tetap diperlukan.
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="font-semibold text-sm mb-3">Dana Masuk vs Keluar (juta Rp)</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartDataArea} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `Rp ${v}jt`} />
              <Area type="monotone" dataKey="masuk" stroke={C.green} fill={`${C.green}22`} strokeWidth={2} name="Masuk" />
              <Area type="monotone" dataKey="keluar" stroke={C.maroon} fill={`${C.maroon}22`} strokeWidth={2} name="Keluar" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="font-semibold text-sm mb-3">Distribusi Kategori</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false} fontSize={10}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="font-semibold mb-3">Riwayat Transaksi</div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[160px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input className="w-full pl-8 pr-3 py-2 rounded-lg border border-border text-xs focus:outline-none" placeholder="Cari ID atau kampanye..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {["Semua", "Berhasil", "Sedang Diproses"].map(s => (
              <button key={s} className="px-3 py-2 rounded-lg text-xs font-semibold border transition-all flex-shrink-0"
                style={filterStatus === s ? { backgroundColor: C.maroon, color: "white", borderColor: C.maroon } : { borderColor: C.border }}
                onClick={() => setFilterStatus(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                {["ID", "Tanggal", "Kampanye", "Jenis", "Nominal", "Status", "Hash"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold">{tx.id}</td>
                  <td className="px-3 py-2.5 text-xs whitespace-nowrap">{tx.date}</td>
                  <td className="px-3 py-2.5 text-xs max-w-32 truncate">{tx.campaign}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tx.amount > 0 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`px-3 py-2.5 font-semibold text-xs whitespace-nowrap ${tx.amount > 0 ? "text-green-700" : "text-orange-700"}`}>
                    {tx.amount > 0 ? "+" : ""}Rp {Math.abs(tx.amount).toLocaleString("id-ID")}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tx.status === "Berhasil" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">{tx.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 text-center text-xs text-muted-foreground border-t border-border">
          ⚠️ Data Demo — Seluruh data merupakan simulasi prototipe
        </div>
      </div>
    </div>
  );
};

// ─── Page: RIWAYAT ────────────────────────────────────────────────────────────
const PageRiwayat = () => {
  const riwayat = [
    { id: "TXN-2025-0581", date: "10 Mei 2025", campaign: "Bantuan Pendidikan Anak Yatim", type: "Infak", amount: 50000, status: "Berhasil" },
    { id: "TXN-2025-0562", date: "7 Mei 2025", campaign: "Tanggap Bencana Alam", type: "Sedekah", amount: 100000, status: "Berhasil" },
    { id: "TXN-2025-0544", date: "3 Mei 2025", campaign: "Beasiswa Mahasiswa Untirta", type: "Infak", amount: 75000, status: "Berhasil" },
    { id: "TXN-2025-0521", date: "25 Apr 2025", campaign: "Program Sosial Kampus", type: "Sedekah", amount: 25000, status: "Berhasil" },
  ];
  const [filter, setFilter] = useState("Semua");

  return (
    <div className="pb-20 lg:pb-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold">Riwayat Donasi</h2>
        <p className="text-sm text-muted-foreground">Lihat dan unduh laporan donasi yang telah Anda lakukan.</p>
      </div>
      <div className="bg-card rounded-2xl p-4 border border-border flex justify-between items-center">
        <div>
          <div className="text-xs text-muted-foreground">Total Donasi Saya</div>
          <div className="text-xl font-bold" style={{ color: C.maroon }}>Rp 245.000</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Donasi Aktif</div>
          <div className="text-xl font-bold" style={{ color: C.green }}>2 Program</div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Semua", "Berhasil", "Sedang Diproses", "Gagal"].map(f => (
          <button key={f} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={filter === f ? { backgroundColor: C.maroon, color: "white", borderColor: C.maroon } : { borderColor: C.border, color: "#6b7280" }}
            onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="space-y-3">
        {riwayat.filter(r => filter === "Semua" || r.status === filter).map(r => (
          <div key={r.id} className="bg-card rounded-xl p-4 border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: C.lightGreen }}>
              <Heart size={18} style={{ color: C.green }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{r.campaign}</div>
              <div className="text-xs text-muted-foreground">{r.date} · {r.type}</div>
              <div className="text-xs font-mono text-muted-foreground">{r.id}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm" style={{ color: C.maroon }}>Rp {r.amount.toLocaleString("id-ID")}</div>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">{r.status}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-3 rounded-xl font-semibold border border-border flex items-center justify-center gap-2 hover:bg-muted transition-colors">
        <Download size={16} /> Unduh Laporan Donasi
      </button>
    </div>
  );
};

// ─── Page: AKAD ───────────────────────────────────────────────────────────────
const PageAkad = () => {
  const [tab, setTab] = useState<"infak" | "sedekah" | "kampanye">("infak");
  return (
    <div className="max-w-2xl mx-auto pb-20 lg:pb-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold">Akad & Prinsip Syariah</h2>
        <p className="text-sm text-muted-foreground">Pelajari prinsip syariah yang mendasari DONTARA.</p>
      </div>

      <div className="flex border-b border-border">
        {(["infak", "sedekah", "kampanye"] as const).map(t => (
          <button key={t} className={`flex-1 py-2.5 text-sm font-semibold border-b-2 transition-colors capitalize ${tab === t ? "border-red-600 text-red-700" : "border-transparent text-muted-foreground"}`}
            onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "infak" && (
        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-lg mb-2">Apa itu Infak?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Infak adalah harta yang dikeluarkan untuk kepentingan yang diperintahkan dalam Islam, baik untuk diri sendiri, keluarga, maupun masyarakat. Infak bersifat wajib maupun sunnah, tergantung konteksnya.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="font-bold mb-3">Tujuan Penggunaan Dana</h3>
            {["Sesuai dengan tujuan program", "Dikelola secara amanah", "Dilaporkan secara berkala", "Diawasi oleh tim verifikator"].map(item => (
              <div key={item} className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "sedekah" && (
        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="font-bold text-lg mb-2">Apa itu Sedekah?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sedekah adalah pemberian sukarela yang dilakukan oleh seseorang kepada orang lain, terutama kepada yang membutuhkan, tanpa syarat tertentu. Sedekah merupakan bentuk ekspresi kepedulian sosial dalam Islam.
            </p>
          </div>
        </div>
      )}

      {tab === "kampanye" && (
        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2">Prinsip Kampanye</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Setiap kampanye di DONTARA diverifikasi tim dan harus memenuhi prinsip: transparan, amanah, dan berdampak nyata untuk kepentingan umum.
            </p>
            <div className="space-y-2">
              {[
                { icon: "🔍", label: "Verifikasi Pengelola", desc: "Identitas pengelola kampanye diverifikasi" },
                { icon: "📄", label: "Dokumentasi Program", desc: "Dokumen lengkap harus tersedia" },
                { icon: "📊", label: "Laporan Berkala", desc: "Laporan penggunaan dana dipublikasikan" },
                { icon: "✅", label: "Audit Internal", desc: "Rekonsiliasi dan audit dilakukan rutin" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-muted">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="font-bold mb-3">Makna Ta'awun</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ta'awun berarti tolong-menolong dan saling mendukung dalam kebaikan. DONTARA hadir sebagai wujud nyata ta'awun sivitas akademika Untirta — saling membantu, saling memperkuat, dan bersama membangun kampus yang peduli.
        </p>
      </div>

      <button className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: C.green }}>
        Baca Detail Akad Syariah →
      </button>
    </div>
  );
};

// ─── Page: KOMUNITAS ──────────────────────────────────────────────────────────
const PageKomunitas = () => {
  const komunitas = [
    { name: "Mahasiswa Peduli Bencana", members: 1200, programs: 12, icon: "🆘" },
    { name: "Dosen Berbagi Ilmu", members: 556, programs: 8, icon: "👨‍🏫" },
    { name: "Karyawan Untirta Berbagi", members: 642, programs: 6, icon: "💼" },
    { name: "Alumni Untirta Peduli", members: 890, programs: 10, icon: "🎓" },
  ];

  return (
    <div className="pb-20 lg:pb-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold">Komunitas & Kolaborasi</h2>
        <p className="text-sm text-muted-foreground">Bergabung dengan komunitas, ajak teman, dan perluas dampak kebaikan.</p>
      </div>

      <div className="rounded-2xl p-5 text-center" style={{ background: `linear-gradient(135deg, ${C.green}, #1e6b3a)` }}>
        <div className="text-4xl mb-2">"</div>
        <p className="text-white font-semibold text-lg italic mb-2">Dari Untirta, untuk Sesama</p>
        <p className="text-white/80 text-sm">Bersama DONTARA, langkah kecilmu berarti besar bagi mereka yang membutuhkan.</p>
        <button className="mt-4 px-5 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "white", color: C.green }}>
          Gabung Komunitas →
        </button>
      </div>

      <div>
        <div className="font-bold mb-3">Komunitas Aktif</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {komunitas.map(k => (
            <div key={k.name} className="bg-card rounded-xl p-4 border border-border flex items-start gap-3">
              <div className="text-2xl">{k.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{k.name}</div>
                <div className="text-xs text-muted-foreground">{k.members.toLocaleString()} anggota · {k.programs} program</div>
              </div>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-border hover:bg-muted">Ikuti</button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="font-bold mb-3">Kegiatan Mendatang</div>
        <div className="space-y-3">
          {[
            { title: "Bakti Sosial Kampus", date: "15 Jun 2025", location: "Kampus Untirta Cilegon", icon: "🏫" },
            { title: "Donor Darah Bersama", date: "22 Jun 2025", location: "Aula Rektorat Untirta", icon: "🩸" },
            { title: "Seminar Ta'awun Digital", date: "1 Jul 2025", location: "Online (Zoom)", icon: "💻" },
          ].map((kegiatan, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted">
              <div className="text-xl">{kegiatan.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{kegiatan.title}</div>
                <div className="text-xs text-muted-foreground"><Calendar size={11} className="inline mr-1" />{kegiatan.date}</div>
                <div className="text-xs text-muted-foreground"><MapPin size={11} className="inline mr-1" />{kegiatan.location}</div>
              </div>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white flex-shrink-0" style={{ backgroundColor: C.maroon }}>Daftar</button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Heart, label: "Donasi Mudah", desc: "Satu platform" },
          { icon: Shield, label: "Transparan & Terpercaya", desc: "Berbasis blockchain" },
          { icon: BookOpen, label: "Berbasis Syariah", desc: "Nilai ta'awun" },
          { icon: Trophy, label: "Gamifikasi & Komunitas", desc: "Untuk sivitas Untirta" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-card rounded-xl p-3 border border-border text-center">
            <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2" style={{ backgroundColor: C.lightGreen }}>
              <Icon size={18} style={{ color: C.green }} />
            </div>
            <div className="font-semibold text-xs">{label}</div>
            <div className="text-xs text-muted-foreground">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Page: GAMIFIKASI ─────────────────────────────────────────────────────────
const PageGamifikasi = () => {
  const [tab, setTab] = useState<"saya" | "papan">("saya");
  const [showAnon, setShowAnon] = useState(false);

  return (
    <div className="pb-20 lg:pb-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold">Gamifikasi Ta'awun</h2>
        <p className="text-sm text-muted-foreground">Kumpulkan poin, raih badge, dan dapatkan penghargaan atas kontribusi kebaikanmu.</p>
      </div>

      {/* Level Card */}
      <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.green} 0%, #1a5c30 100%)` }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full border-4 border-white/10 translate-x-8 -translate-y-8" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">🧕</div>
          <div className="flex-1">
            <div className="font-bold text-lg">Sahabat Amal</div>
            <div className="text-white/80 text-sm">Level 5 — Sahabat Kebaikan</div>
            <div className="text-white/70 text-xs">1.250 / 2.000 XP menuju Level 6</div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="h-full rounded-full bg-yellow-300" style={{ width: "62.5%" }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[["1.250", "Poin Ta'awun"], ["5", "Badge Diraih"], ["7🔥", "Hari Streak"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-bold text-lg">{v}</div>
              <div className="text-white/70 text-xs">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex border-b border-border">
        {[["saya", "Pencapaian Saya"], ["papan", "Papan Peringkat"]].map(([id, label]) => (
          <button key={id} className={`flex-1 py-2.5 text-sm font-semibold border-b-2 transition-colors ${tab === id ? "border-red-600 text-red-700" : "border-transparent text-muted-foreground"}`}
            onClick={() => setTab(id as "saya" | "papan")}>{label}</button>
        ))}
      </div>

      {tab === "saya" && (
        <div className="space-y-5">
          {/* Badges */}
          <div>
            <div className="font-bold mb-3">Koleksi Badge</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {badges.map(b => <BadgeChip key={b.name} badge={b} />)}
            </div>
          </div>

          {/* Monthly challenge */}
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="font-bold mb-3 flex items-center gap-2"><Zap size={16} style={{ color: C.gold }} /> Tantangan Bulan Ini</div>
            <div className="space-y-3">
              {[
                { label: "Donasi 3x bulan ini", progress: 2, max: 3 },
                { label: "Ikuti 1 kegiatan sosial", progress: 0, max: 1 },
                { label: "Ajak 2 teman bergabung", progress: 1, max: 2 },
              ].map(ch => (
                <div key={ch.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{ch.label}</span>
                    <span className="text-muted-foreground">{ch.progress}/{ch.max}</span>
                  </div>
                  <ProgressBar value={ch.progress} max={ch.max} color={ch.progress === ch.max ? "#16a34a" : C.gold} />
                </div>
              ))}
            </div>
          </div>

          {/* Points breakdown */}
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="font-bold mb-3">Cara Mendapat Poin</div>
            <div className="space-y-2">
              {[
                { act: "Donasi yang terverifikasi", pts: "+50 XP" },
                { act: "Partisipasi kegiatan sosial", pts: "+30 XP" },
                { act: "Kegiatan relawan", pts: "+40 XP" },
                { act: "Voting kampanye", pts: "+10 XP" },
                { act: "Aktivitas komunitas", pts: "+20 XP" },
              ].map(row => (
                <div key={row.act} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
                  <span className="text-sm">{row.act}</span>
                  <span className="font-bold text-sm" style={{ color: C.gold }}>{row.pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "papan" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-bold">Papan Peringkat</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={showAnon} onChange={e => setShowAnon(e.target.checked)} id="anonToggle" className="w-3 h-3" />
              <label htmlFor="anonToggle">Sembunyikan identitas saya</label>
            </div>
          </div>
          <div className="space-y-2">
            {leaderboard.map(entry => (
              <div
                key={entry.rank}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${entry.isMe ? "border-amber-300 bg-amber-50" : "border-border bg-card"}`}
              >
                <div className="text-xl w-8 text-center">{entry.badge}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{entry.anon || showAnon ? "***Anonim***" : entry.name}{entry.isMe && " (Anda)"}</div>
                  <div className="text-xs text-muted-foreground">{entry.faculty}</div>
                </div>
                <div className="font-bold text-sm" style={{ color: entry.isMe ? C.gold : C.green }}>{entry.points.toLocaleString()} XP</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground text-center p-3 bg-muted rounded-xl">
            Peringkat mempertimbangkan kontribusi beragam: donasi, relawan, dan partisipasi sosial — bukan hanya nominal donasi.
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Page: PROFIL ─────────────────────────────────────────────────────────────
const PageProfil = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="max-w-2xl mx-auto pb-20 lg:pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Profil & Verifikasi</h2>
        <button onClick={() => setEditMode(e => !e)} className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-border hover:bg-muted">
          {editMode ? "Simpan" : "Edit Profil"}
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">🧕</div>
            {editMode && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center">
                <Camera size={12} />
              </button>
            )}
          </div>
          <div className="flex-1">
            {editMode ? (
              <input defaultValue="Sahabat Amal" className="w-full font-bold text-lg border-b border-border focus:outline-none bg-transparent mb-1" />
            ) : (
              <div className="font-bold text-lg">Sahabat Amal</div>
            )}
            <div className="text-xs text-muted-foreground">sahabatamal@untirta.ac.id</div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold text-white" style={{ backgroundColor: C.green }}>Mahasiswa</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 bg-amber-100 text-amber-700">
                <CheckCircle2 size={10} /> Akun Terverifikasi
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-purple-100 text-purple-700">Level 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification status */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="font-bold mb-3 flex items-center gap-2">
          <Shield size={16} style={{ color: C.green }} /> Status Verifikasi
        </div>
        <div className="space-y-2">
          {[
            { label: "Data Diri", status: "Terverifikasi" },
            { label: "Email Kampus (@untirta.ac.id)", status: "Terverifikasi" },
            { label: "NIM/Identitas Mahasiswa", status: "Terverifikasi" },
            { label: "Nomor Rekening (opsional)", status: "Belum Diverifikasi" },
          ].map(({ label, status }) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <span className="text-sm">{label}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status === "Terverifikasi" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 py-2.5 rounded-xl font-semibold text-sm border border-border hover:bg-muted transition-colors">
          Lihat Detail Verifikasi →
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-3 border border-border text-center">
          <div className="font-bold text-lg" style={{ color: C.maroon }}>Rp 245rb</div>
          <div className="text-xs text-muted-foreground">Total Donasi</div>
        </div>
        <div className="bg-card rounded-xl p-3 border border-border text-center">
          <div className="font-bold text-lg" style={{ color: C.green }}>1.250</div>
          <div className="text-xs text-muted-foreground">Poin Ta'awun</div>
        </div>
        <div className="bg-card rounded-xl p-3 border border-border text-center">
          <div className="font-bold text-lg" style={{ color: C.gold }}>5</div>
          <div className="text-xs text-muted-foreground">Badge</div>
        </div>
      </div>

      {/* Menu items */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {[
          { icon: Clock, label: "Riwayat Donasi", onClick: () => setPage("riwayat") },
          { icon: Bell, label: "Notifikasi", onClick: () => {} },
          { icon: Lock, label: "Pengaturan Keamanan", onClick: () => {} },
          { icon: Eye, label: "Pengaturan Privasi", onClick: () => {} },
          { icon: Settings, label: "Pengaturan Akun", onClick: () => {} },
        ].map(({ icon: Icon, label, onClick }) => (
          <button key={label} onClick={onClick}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-0 hover:bg-muted transition-colors text-left">
            <Icon size={18} className="text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">{label}</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
        <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 transition-colors text-left">
          <LogOut size={18} className="text-red-500" />
          <span className="flex-1 text-sm font-medium text-red-500">Keluar dari Akun</span>
        </button>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border text-sm text-muted-foreground">
        <div className="font-semibold mb-2 text-foreground">Mengapa DONTARA?</div>
        <div className="space-y-2">
          {[
            { icon: "✅", label: "Mudah", desc: "Donasi dalam satu platform" },
            { icon: "🛡️", label: "Amanah", desc: "Dikelola tim resmi Untirta" },
            { icon: "📊", label: "Bersparasi", desc: "Laporan real-time dan bukti penyaluran" },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-2">
              <span>{item.icon}</span>
              <div><span className="font-medium text-foreground">{item.label}</span> — {item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Page: ADMIN ──────────────────────────────────────────────────────────────
const PageAdmin = () => {
  const submissions = [
    { id: "CAMP-2025-012", title: "Beasiswa Coding Bootcamp", org: "Himpunan Mahasiswa TI", amount: 50000000, status: "Menunggu Review", date: "12 Mei 2025" },
    { id: "CAMP-2025-011", title: "Bedah Rumah Warga Sekitar Kampus", org: "KKN Untirta", amount: 120000000, status: "Perlu Revisi", date: "8 Mei 2025" },
    { id: "CAMP-2025-010", title: "Pengobatan Gratis Masyarakat", org: "BEM FK Untirta", amount: 80000000, status: "Disetujui", date: "1 Mei 2025" },
  ];

  return (
    <div className="pb-20 lg:pb-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.maroon }}>
          <Layers size={16} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Panel Admin</h2>
          <p className="text-xs text-muted-foreground">Manajemen & Verifikasi Kampanye</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Menunggu Review" value="3" icon={AlertCircle} color="#d97706" />
        <StatCard label="Kampanye Aktif" value="8" icon={Target} color={C.green} />
        <StatCard label="Total Diverifikasi" value="24" icon={CheckCircle2} color={C.maroon} />
        <StatCard label="Perlu Tindakan" value="2" icon={RefreshCw} color="#7c3aed" />
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 font-bold border-b border-border">Pengajuan Kampanye</div>
        <div className="space-y-0">
          {submissions.map(s => (
            <div key={s.id} className="p-4 border-b border-border last:border-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.org} · {s.date}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: C.maroon }}>Rp {(s.amount / 1000000).toFixed(0)}jt</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0 ${
                  s.status === "Disetujui" ? "bg-green-100 text-green-700"
                  : s.status === "Perlu Revisi" ? "bg-orange-100 text-orange-700"
                  : "bg-yellow-100 text-yellow-700"
                }`}>{s.status}</span>
              </div>
              {s.status === "Menunggu Review" && (
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: C.green }}>Setujui</button>
                  <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-orange-400 text-orange-600">Minta Revisi</button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-border hover:bg-muted">Detail</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="font-bold mb-3">Rekonsiliasi Transaksi</div>
        <div className="text-sm text-muted-foreground mb-3">Periode: Mei 2025</div>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="p-3 rounded-xl bg-green-50 border border-green-200">
            <div className="font-bold text-green-700">Rp 120jt</div>
            <div className="text-xs text-green-600">Dana Masuk</div>
          </div>
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
            <div className="font-bold text-orange-700">Rp 98jt</div>
            <div className="text-xs text-orange-600">Dana Keluar</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <div className="font-bold text-blue-700">Rp 22jt</div>
            <div className="text-xs text-blue-600">Saldo</div>
          </div>
        </div>
        <button className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted">
          Unduh Laporan Rekonsiliasi
        </button>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("beranda");
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "beranda": return <PageBeranda setPage={setPage} setSelectedCampaign={setSelectedCampaign} />;
      case "donasi": return <PageDonasi />;
      case "kampanye": return <PageKampanye setPage={setPage} setSelectedCampaign={setSelectedCampaign} />;
      case "detail-kampanye": return <PageDetailKampanye camp={selectedCampaign} setPage={setPage} />;
      case "transparansi": return <PageTransparansi />;
      case "riwayat": return <PageRiwayat />;
      case "akad": return <PageAkad />;
      case "komunitas": return <PageKomunitas />;
      case "gamifikasi": return <PageGamifikasi />;
      case "profil": return <PageProfil setPage={setPage} />;
      case "admin": return <PageAdmin />;
      default: return <PageBeranda setPage={setPage} setSelectedCampaign={setSelectedCampaign} />;
    }
  };

  const currentLabel = navItems.find(n => n.id === page)?.label ?? (page === "detail-kampanye" ? "Detail Kampanye" : "Admin");

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: C.cream }}>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 h-full overflow-y-auto" style={{ backgroundColor: C.green }}>
        {/* Brand */}
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <DontaraLogo size={36} />
          <div>
            <div className="font-bold text-white text-base leading-tight">DONTARA</div>
            <div className="text-white/60 text-xs">Donasi Ta'awun Untirta</div>
          </div>
        </div>

        {/* Untirta identity */}
        <div className="px-4 py-2 flex items-center gap-2 border-b border-white/10">
          <UntirtalLogo size={22} />
          <div className="text-white/60 text-xs leading-tight">Universitas Sultan Ageng Tirtayasa</div>
        </div>

        {/* User mini-profile */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">🧕</div>
            <div className="min-w-0">
              <div className="text-white text-xs font-semibold truncate">Sahabat Amal</div>
              <div className="text-white/60 text-xs">Level 5 · 1.250 XP</div>
            </div>
            <div className="ml-auto w-4 h-4 bg-green-400 rounded-full flex-shrink-0" title="Terverifikasi" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={page === id || (page === "detail-kampanye" && id === "kampanye")
                ? { backgroundColor: C.maroon, color: "white" }
                : { color: "rgba(255,255,255,0.75)" }}
              onClick={() => setPage(id)}
              onMouseEnter={e => {
                if (page !== id) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={e => {
                if (page !== id) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={page === "admin" ? { backgroundColor: C.maroon, color: "white" } : { color: "rgba(255,255,255,0.75)" }}
            onClick={() => setPage("admin")}
            onMouseEnter={e => { if (page !== "admin") (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={e => { if (page !== "admin") (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            <Layers size={18} />
            <span>Admin</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="text-white/40 text-xs text-center">Platform Donasi Sivitas Akademika</div>
          <div className="text-white/40 text-xs text-center">Universitas Sultan Ageng Tirtayasa</div>
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full flex flex-col overflow-y-auto z-10" style={{ backgroundColor: C.green }}>
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <DontaraLogo size={32} />
                <div className="font-bold text-white">DONTARA</div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {[...navItems, { id: "admin" as Page, label: "Admin", Icon: Layers }].map(({ id, label, Icon }) => (
                <button key={id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 transition-all"
                  style={page === id ? { backgroundColor: C.maroon, color: "white" } : {}}
                  onClick={() => { setPage(id); setSidebarOpen(false); }}>
                  <Icon size={18} /><span>{label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top header */}
        <header className="flex-shrink-0 px-4 py-3 flex items-center gap-3 bg-card border-b border-border shadow-sm">
          <button className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <DontaraLogo size={28} />
            <span className="font-bold text-sm" style={{ color: C.maroon }}>DONTARA</span>
          </div>
          <div className="hidden lg:block font-bold text-foreground">{currentLabel}</div>
          <div className="flex-1" />
          <div className="relative hidden sm:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className="pl-8 pr-4 py-2 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-red-200 w-48" placeholder="Cari..." />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell size={18} />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: C.maroon }} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-base">🧕</div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold leading-tight">Sahabat Amal</div>
              <div className="text-xs text-muted-foreground">Mahasiswa</div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <UntirtalLogo size={24} />
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-5">
          {renderPage()}
        </main>

        {/* ── Mobile Bottom Nav ── */}
        <nav className="lg:hidden flex-shrink-0 flex border-t border-border bg-card" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          {bottomNavItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors"
              style={{ color: page === id ? C.maroon : "#9ca3af" }}
              onClick={() => setPage(id)}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
