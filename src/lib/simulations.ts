export type SimulationType = 'mars' | 'moon' | 'earth' | 'humanoid';

export interface MissionObjective {
    id: string;
    task: string;
    completed: boolean;
}

export interface Simulation {
    id: SimulationType;
    name: string;
    missionName: string;
    description: string;
    difficulty: 'Moderate' | 'Critical';
    environment: 'sunset' | 'night' | 'park' | 'studio';
    color: string;
    accent: string;
    payload: string[];
    missions: MissionObjective[];
    startPos: { x: number; z: number };
    targetPos: { x: number; z: number };
}

export const SIMULATIONS: Simulation[] = [
    {
        id: 'earth',
        name: 'Earth',
        missionName: 'DRIVE TEST 00',
        description: 'Standard gravity test on grass fields. Easiest terrain for driving practice.',
        difficulty: 'Moderate',
        environment: 'park',
        color: '#4ade80',
        accent: 'green',
        payload: ['Main Camera', 'GPS', 'Wi-Fi'],
        startPos: { x: -30, z: -30 },
        targetPos: { x: 20, z: 20 },
        missions: [
            { id: 'e1', task: 'Reach the end point', completed: false },
            { id: 'e2', task: 'Check motor balance', completed: false },
        ]
    },
    {
        id: 'mars',
        name: 'Mars',
        missionName: 'DRIVE TEST 01',
        description: 'Practice driving on red ground. Reach the target while avoiding deep pits.',
        difficulty: 'Moderate',
        environment: 'sunset',
        color: '#ff4d00',
        accent: 'orange',
        payload: ['Main Camera', 'Distance Sensor', 'Tool Arm'],
        startPos: { x: -40, z: -40 },
        targetPos: { x: 30, z: 25 },
        missions: [
            { id: 'm1', task: 'Drive to the target area', completed: false },
            { id: 'm2', task: 'Keep the robot safe', completed: false },
        ]
    },
    {
        id: 'moon',
        name: 'Moon',
        missionName: 'DRIVE TEST 02',
        description: 'Practice driving in low light. Reach the end point safely.',
        difficulty: 'Critical',
        environment: 'night',
        color: '#00f3ff',
        accent: 'cyan',
        payload: ['Night Vision', 'Temp Sensor', 'Probe'],
        startPos: { x: 0, z: 45 },
        targetPos: { x: -35, z: -35 },
        missions: [
            { id: 'l1', task: 'Reach the target area', completed: false },
            { id: 'l2', task: 'Avoid the deep holes', completed: false },
        ]
    },
    {
        id: 'humanoid',
        name: 'Android Lab',
        missionName: 'HUMANOID CALIBRATION',
        description: 'Bipedal locomotion testing with real-time inverse kinematics and joint calibration.',
        difficulty: 'Critical',
        environment: 'studio',
        color: '#00ff9d',
        accent: 'green',
        payload: ['Gyroscope', 'Servo Motors', 'Neural Net'],
        startPos: { x: 0, z: 0 },
        targetPos: { x: 0, z: 0 },
        missions: [
            { id: 'h1', task: 'Calibrate joint motors', completed: false },
            { id: 'h2', task: 'Perform stress test', completed: false },
        ]
    }
];
