export interface EventItem {
  id: string;
  title: string;
  category: "Technical" | "Non-Technical";
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  teamSize: string;
  time: string;
  rules: string[];
  coordinators: {
    name: string;
    phone: string;
  }[];
}

export const EVENTS_DATA: EventItem[] = [
  // Technical Events
  {
    id: "paperwands",
    title: "Paper Wands",
    category: "Technical",
    shortDesc: "National Level Research & Technical Paper Presentation on Next-Gen Cyber & AI Systems.",
    fullDesc: "Put your ideas on paper and bring them to life! Participants will be given 4–5 technical topics, from which they can choose any one topic and prepare a presentation. Showcase your understanding, research, creativity, and presentation skills before the judging panel.",
    iconName: "FileText",
    teamSize: "2 Members (Mandatory)",
    time: "10:30 AM - 01:00 PM",
    rules: [
      "Abstract submission deadline: August 18, 2026.",
      "IEEE standard format strictly enforced.",
      "7 minutes presentation + 3 minutes Q&A with jury panel.",
      "Bring 2 hard copies of the full research paper on symposium day."
    ],
    coordinators: [
      { name: "Inbasekaran C (Student President)", phone: "+91 7604996450" },
      { name: "Dr.D.Pravin kumar (Event Coordinator)", phone: "+91 97894 12345" }
    ]
  },
  {
    id: "breaking-bid",
    title: "Breaking Bid",
    category: "Technical",
    shortDesc: "High-octane competitive Code Debugging combined with strategic bidding mechanics.",
    fullDesc: "Think fast, bid smart, and code better! Breaking Bid is a unique technical auction where participants compete to acquire coding-related challenges, resources, or opportunities through strategic bidding. Put your coding knowledge, decision-making, and strategy to the test and emerge as the ultimate coding champion.",
    iconName: "Code2",
    teamSize: "2 Members (Mandatory)",
    time: "10:30 AM - 01:00 PM",
    rules: [
      "Round 1: Preliminary bidding on buggy code snippets.",
      "Round 2: Rapid live debugging & execution challenge.",
      "Languages allowed: C++, Java, Python.",
      "Use of external AI assistants or search engines is strictly forbidden."
    ],
    coordinators: [
      { name: "Shahana R (Secretary)", phone: "+91 97865 12345" },
      { name: "Mrs. A. Nazmunisa (Faculty Coordinator)", phone: "+91 94435 01234" }
    ]
  },

  // Non-Technical Events
  {
    id: "shutter-island",
    title: "Shutter Island",
    category: "Non-Technical",
    shortDesc: "On-spot creative photography competition showcasing visual storytelling & composition.",
    fullDesc: "See the world through your lens! Shutter Island challenges participants to capture moments, stories, and perspectives through photography. Whether it’s a striking composition, a hidden detail, or an unforgettable moment, let your creativity speak through a single frame.",
    iconName: "Film",
    teamSize: "2 Members (Mandatory)",
    time: "02:30 PM - 04:00 PM",
    rules: [
      "Photos must be captured within the KLNCE campus boundaries on event day.",
      "Basic color grading allowed; heavy manipulation or AI generation is prohibited.",
      "Submit raw + edited files before 04:00 PM deadline."
    ],
    coordinators: [
      { name: "Priyadharshini SH (Treasurer)", phone: "+91 96554 87654" },
      { name: "Mr. A. Alagar (Faculty Coordinator)", phone: "+91 94420 99881" }
    ]
  },
  {
    id: "lights-and-laughs",
    title: "Lights & Laughs - A Fun Event",
    category: "Non-Technical",
    shortDesc: "An energetic non-technical fun event filled with entertainment, games, and laughter.",
    fullDesc: "Leave the serious stuff behind and get ready to laugh, compete, and have a blast! Lights & Laughs is a fun-filled event packed with entertaining challenges designed to bring out your quick thinking, spontaneity, teamwork, and sense of humor.",
    iconName: "Sparkles",
    teamSize: "2 Members (Mandatory)",
    time: "02:30 PM - 04:00 PM",
    rules: [
      "Open to all registered symposium participants.",
      "Fair play and sportsmanship must be maintained throughout all fun rounds.",
      "Judges' decisions for spot games and performance rounds are final."
    ],
    coordinators: [
      { name: "Shahana R (Secretary)", phone: "+91 97865 12345" },
      { name: "Ms.R.Nivethitha (Faculty Coordinator)", phone: "+91 98421 88990" }
    ]
  }
];
