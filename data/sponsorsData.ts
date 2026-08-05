export interface Sponsor {
  id: string;
  name: string;
  category: "Title Sponsor" | "Co-Sponsor" | "Tech Partner" | "Gaming Partner";
  logoText: string;
  gradient: string;
}

export const SPONSORS_DATA: Sponsor[] = [
  { id: "sp-1", name: "NEURALINK LABS", category: "Title Sponsor", logoText: "NEURALINK", gradient: "from-blue-500 to-purple-500" },
  { id: "sp-2", name: "VERCEL", category: "Tech Partner", logoText: "▲ VERCEL", gradient: "from-white to-slate-400" },
  { id: "sp-3", name: "LINEAR ARCHITECT", category: "Tech Partner", logoText: "LINEAR", gradient: "from-purple-400 to-pink-500" },
  { id: "sp-4", name: "NVIDIA AI", category: "Co-Sponsor", logoText: "NVIDIA", gradient: "from-emerald-400 to-cyan-500" },
  { id: "sp-5", name: "OPENAI SYNERGY", category: "Title Sponsor", logoText: "OPENAI", gradient: "from-cyan-400 to-blue-600" },
  { id: "sp-6", name: "TESLA UI CYBER", category: "Co-Sponsor", logoText: "TESLA CYBER", gradient: "from-red-500 to-purple-600" },
  { id: "sp-7", name: "RED BULL GAMING", category: "Gaming Partner", logoText: "RED BULL", gradient: "from-yellow-400 to-red-500" },
  { id: "sp-8", name: "GITHUB EDUCATION", category: "Tech Partner", logoText: "GITHUB", gradient: "from-slate-200 to-purple-400" }
];
