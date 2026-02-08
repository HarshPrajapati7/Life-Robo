/**
 * LIFE ROBO DATABASE - PERSONNEL MANIFEST
 * PROTOCOL: V2.0 (CYBER-INDUSTRIAL)
 * ACCESS LEVEL: PUBLIC
 */

export type TeamMember = {
    name: string;
    role: string;
    year?: string;
    branch?: string;
    image?: string;
    quote?: string;
};

export type TeamSection = {
    title: string;
    members: TeamMember[];
};

export const teamData: TeamSection[] = [
    {
        title: "Robotics Club Leads",
        members: [
            { name: "Amit Chauhan", role: "Head", branch: "CSE-AI", year: "3rd" },
            { name: "Ahmad Tarique", role: "Co-head", branch: "CSE-AI", year: "3rd" },
        ],
    },
    {
        title: "Software Team",
        members: [
            { name: "Harsh Prajapati", role: "Lead", branch: "CSE-AI", year: "3rd" },
            { name: "Jatin Pandey", role: "Co-lead", branch: "CSE-AI", year: "3rd" },
            { name: "Ayushman Rai", role: "Member", branch: "ME", year: "2nd" },
            { name: "Krishan Kant Pathak", role: "Member", branch: "ME", year: "2nd" },
            { name: "Jeevanand Maurya", role: "Member", branch: "CSE-AI", year: "2nd" },
            { name: "Anurag", role: "Member", branch: "CSE-AI", year: "2nd" },
            { name: "Vipin Vishwakarma", role: "Member", branch: "CSE-AI", year: "1st" },
        ],
    },
    {
        title: "Circuit Designing Team",
        members: [
            { name: "Vineeta", role: "Lead", branch: "ECE", year: "3rd" },
            { name: "Lakshya Soni", role: "Co-lead", branch: "CSE", year: "2nd" },
            { name: "Priyanshu Mishra", role: "Member", branch: "ECE", year: "3rd" },
            { name: "Kanishka Singh", role: "Member", branch: "CSE", year: "2nd" },
            { name: "Brajendra Verma", role: "Member", branch: "ME", year: "2nd" },
            { name: "Lokesh Patel", role: "Member", branch: "CSE", year: "2nd" },
            { name: "Navdeep Maurya", role: "Member", branch: "EE", year: "2nd" },
            { name: "Jeeya Kumari", role: "Member", branch: "CSE", year: "2nd" },
            { name: "Renu", role: "Member", branch: "ECE", year: "2nd" },
        ],
    },
    {
        title: "Hardware Designing Team",
        members: [
            { name: "Priyanshu Shukla", role: "Lead", branch: "ME", year: "3rd" },
            { name: "Sweksha Chaudhary", role: "Co-lead", branch: "ME", year: "3rd" },
            { name: "Kunal Anand", role: "Member", branch: "ME", year: "2nd" },
            { name: "Sahil Arya", role: "Member", branch: "CSE-AI", year: "2nd" },
            { name: "Abhishek Gupta", role: "Member", branch: "ME", year: "2nd" },
            { name: "Sanskar Singh", role: "Member", branch: "CSE-AI", year: "2nd" },
            { name: "Adesh Srivastava", role: "Member", branch: "CSE", year: "2nd" },
            { name: "Ashutosh Rao", role: "Member", branch: "CSE-AI", year: "1st" },
        ],
    },
    {
        title: "Management Team",
        members: [
            { name: "Kumar Kartikeya Sharma", role: "Lead", branch: "ME", year: "3rd" },
            { name: "Amretesh Mishra", role: "Co-lead", branch: "CSE-AI", year: "3rd" },
            { name: "Poorvi Bajpai", role: "Member", branch: "CSE-AI", year: "3rd" },
            { name: "Anubhav Tiwari", role: "Member", branch: "ME", year: "2nd" },
            { name: "Khushi Prajapati", role: "Member", branch: "EE", year: "2nd" },
            { name: "Gaurav Chandra Rao", role: "Member", branch: "ME", year: "2nd" },
            { name: "Piyush Mishra", role: "Member", branch: "ME", year: "1st" },
            { name: "Ujjwal Dixit", role: "Member", branch: "ECE", year: "1st" },
            { name: "Gaurangi Bhatia", role: "Member", branch: "CSE", year: "1st" },
            { name: "Radhika Vaish", role: "Member", branch: "CSE", year: "1st" },
            { name: "Sarthak Shukla", role: "Member", branch: "CSE", year: "1st" },
            { name: "Arpita Gupta", role: "Member", branch: "CSE-AI", year: "1st" },
        ],
    },
    {
        title: "IT and Media Team",
        members: [
            { name: "Ankit Gupta", role: "Lead", branch: "CSE", year: "3rd" },
            { name: "Siddharth Verma", role: "Co-lead", branch: "ME", year: "2nd" },
            { name: "Ishika Singh", role: "Member", branch: "CSE-AI", year: "2nd" },
            { name: "Maithili Chaurasiya", role: "Member", branch: "CSE-AI", year: "2nd" },
            { name: "Ashmita Mishra", role: "Member", branch: "ME", year: "2nd" },
            { name: "Kartikey Jaiswal", role: "Member", branch: "CSE-AI", year: "1st" },
            { name: "Priyanka Arya", role: "Member", branch: "BCA", year: "1st" },
        ],
    },
];
