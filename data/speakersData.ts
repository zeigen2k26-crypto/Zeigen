export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  image: string;
  tag: string;
  bio: string;
}

export const SPEAKERS_DATA: Speaker[] = [
  {
    id: "sp-1",
    name: "Dr. Ananya Roy",
    role: "Chief AI Architect",
    company: "Neural Mind Systems",
    topic: "Neuromorphic Computing & Brain-Computer Interfaces",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    tag: "Neuromorphic AI",
    bio: "Pioneer in spiking neural network hardware architectures with over 15 US patents."
  },
  {
    id: "sp-2",
    name: "Vikramaditya Sharma",
    role: "Head of Quantum Systems",
    company: "Vercel Labs / HyperGrid",
    topic: "Real-Time Neural Edge Infrastructure & WebGL Engines",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    tag: "Next-Gen Web Infrastructure",
    bio: "Specialist in zero-latency edge compute pipelines and interactive 3D WebGL rendering."
  },
  {
    id: "sp-3",
    name: "Dr. Marcus Vance",
    role: "Lead Neuro-AI Researcher",
    company: "Cortex Cognitive Lab",
    topic: "Synthetic Synapses: Merging Deep Learning with Biological Neural Signals",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    tag: "Cognitive AI",
    bio: "Leading interdisciplinary studies on bio-hybrid computing and automated neural decoding."
  }
];
