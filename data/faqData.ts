export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Registration" | "Events" | "Travel & Accommodation";
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "Who is eligible to participate in ZEIGEN '26?",
    answer: "Students from any recognized Engineering College, Arts & Science College, or Technical Institute holding a valid student ID card are welcome to participate.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "How do I register for events?",
    answer: "Simply click on any 'Register Now' button across the website to open our official Google Registration Form. Select your desired events, fill in team details, and submit.",
    category: "Registration"
  },
  {
    id: "faq-3",
    question: "Can I participate in multiple technical and non-technical events?",
    answer: "A participant can join in 1 Technical event and 1 Non-Technical event. Both Technical events run simultaneously from 10:30 AM to 01:00 PM. Following lunch (1:00 PM - 2:15 PM), both Non-Technical events start simultaneously at 02:30 PM.",
    category: "Events"
  },
  {
    id: "faq-4",
    question: "Will participation and winner certificates be provided?",
    answer: "Yes, official certificates signed by the Head of Department, ACE Convenor, and Principal will be awarded to all registered participants and winners.",
    category: "General"
  },
  {
    id: "faq-5",
    question: "Is transport facility available to KLN College of Engineering?",
    answer: "Yes! Free college bus transportation is available across key pick-up points in Madurai city, Mattuthavani Bus Stand, Periyar Bus Stand, and Railway Station directly to the campus.",
    category: "Travel & Accommodation"
  },
  {
    id: "faq-6",
    question: "What is the registration fee structure?",
    answer: "Registration details and nominal entry fees (if applicable for specific premium events/workshops) are mentioned in the Google Registration Form.",
    category: "Registration"
  }
];
