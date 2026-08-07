export interface ScheduleSlot {
  id: string;
  time: string;
  title: string;
  description: string;
  category: "Keynote" | "Technical" | "Non-Technical" | "General";
  speaker?: string;
  isHighlight?: boolean;
}

export const SCHEDULE_DATA: ScheduleSlot[] = [
  {
    id: "slot-1",
    time: "08:30 AM - 09:30 AM",
    title: "Registration & Morning Refreshments",
    description: "Welcome kit distribution, badge generation, and morning tea.",
    category: "General",
    isHighlight: false
  },
  {
    id: "slot-2",
    time: "09:30 AM - 10:30 AM",
    title: "Grand Inaugural Ceremony & ZEIGEN '26 Launch",
    description: "Inauguration by Chief Guests, Principal Address, and unveiling of ZEIGEN '26 theme.",
    category: "Keynote",
    isHighlight: true
  },
  {
    id: "slot-3",
    time: "10:30 AM - 01:00 PM",
    title: "Technical Events (Simultaneous Track)",
    description: "Paper Wands (Paper Presentation) & Breaking Bid (Code Debugging). Participants choose 1 Technical event.",
    category: "Technical",
    isHighlight: true
  },
  {
    id: "slot-4",
    time: "01:00 PM - 02:15 PM",
    title: "Grand Lunch Break & Networking",
    description: "Complimentary lunch break, interactive networking, and ambient music stream.",
    category: "General",
    isHighlight: false
  },
  {
    id: "slot-5",
    time: "02:30 PM - 04:00 PM",
    title: "Non-Technical Events (Simultaneous Track)",
    description: "Shutter Island (Photography) & Lights & Laughs (Fun Event). Participants choose 1 Non-Technical event.",
    category: "Non-Technical",
    isHighlight: true
  },
  {
    id: "slot-6",
    time: "04:00 PM - 04:45 PM",
    title: "Valedictory & Prize Distribution Ceremony",
    description: "Announcement of overall championship trophy, prize cash distribution, and vote of thanks.",
    category: "Keynote",
    isHighlight: true
  }
];
