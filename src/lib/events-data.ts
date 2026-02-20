export interface EventData {
    title: string;
    date: string;
    time?: string;
    category: string;
    description: string;
    image: string;
    status?: string;
    color?: string;
    registrationLink?: string;
    venue?: string;
    chiefGuest?: string;
    coordinators?: string;
}

export const events: EventData[] = [
    {
        title: "Robotics Workshops Series 2026",
        date: "21st February 2026",
        time: "12:30 PM onwards",
        category: "Workshop",
        description: "The LIFE ROBO – Robotics Club proudly announces the launch of the Robotics Workshops Series 2026 – a power-packed journey into innovation, automation, and intelligent systems. This workshop series is designed to ignite creativity, enhance technical skills, and provide hands-on experience in Robotics, AI-based systems, and real-time project development.",
        image: "/images/events/RoboticsWorkshop2026.png",
        status: "Registration Open",
        color: "cyber-cyan",
        registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdYXa6kYe8c2n8EyQNZxvyfpRyY8Vii6fdarZKNZtvsL6x_Cg/viewform?usp=header",
        venue: "Vishwakarma Auditorium, FoET, University of Lucknow",
        chiefGuest: "Mr. Abhishek Singh (Scientist at URSC & Program Manager – Chandrayaan-3, ISRO)",
        coordinators: "Amit Chauhan (Head), Ahmad Tarique (Co-Head)"
    },
    {
        title: "RoboEminence",
        date: "Upcoming",
        category: "Competition",
        description: "\"RoboEminence,\" a dynamic event featuring a range of robot demonstrations, including Robo Fire, Optical Avoiding, and Voice Control models. The event was inaugurated by DRDO scientist Dr. Vidya Shankar Pandey.",
        image: "/images/events/Roboeminence.jpg",
        status: "Registration Open",
        color: "cyber-green"
    },
    {
        title: "Lecture Series",
        date: "Completed",
        category: "Education",
        description: "The 8-day robotics and animation lecture series was transformative for students, covering foundational principles to advanced applications. The program offered a holistic understanding of both theory and practice.",
        image: "/images/events/LectureSeries.jpg",
        status: "Archived",
        color: "cyber-cyan"
    },
    {
        title: "Introductory Workshop",
        date: "Completed",
        category: "Workshop",
        description: "The introductory workshop on robotics and animation was a transformative experience for students, guided by skilled instructors. It seamlessly blended theoretical concepts with hands-on exposure.",
        image: "/images/events/Workshop.jpg",
        status: "Archived",
        color: "cyber-yellow"
    }
];

export function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
