import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Shared file path - matching the one used in Admin
// Frontend is in /frontend, Admin in /admin. Parent is /yupi-global.
// process.cwd() in frontend is /.../yupi-global/frontend
const CONFIG_FILE_PATH = path.join(process.cwd(), '../banner-config.json');

const DEFAULT_IMAGES = [
    { src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bd3544ad1671344f161ab4_Futuristic%20VR%20Portrait%206.png", alt: "Futuristic VR Portrait 6", width: 1172, height: 800 },
    { src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bc4b77d8c4f0f2597507c9_Contemplative%20Portrait%20with%20Neon%20Rim%20Lighting%203.png", alt: "Contemplative Portrait", width: 1168, height: 800 },
    { src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bd3315bdad68f1ceeb4aeb_Futuristic%20VR%20Portrait%205.png", alt: "Futuristic VR Portrait", width: 1171, height: 800 },
    { src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bd33b360564ecc008182c9_Contemplative%20Man%20Silhouette%205.png", alt: "Contemplative Man Silhouette", width: 1171, height: 800 },
    { src: "https://cdn.prod.website-files.com/6893be5fa7ae6a8ad74cf406/68bd35cbb70c6bf9ec2ffe54_Contemplative%20Man%20Silhouette%206.png", alt: "Contemplative Man Silhouette 6", width: 1172, height: 800 }
];

export async function GET() {
    try {
        if (fs.existsSync(CONFIG_FILE_PATH)) {
            const data = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
            return NextResponse.json(JSON.parse(data));
        }
    } catch (error) {
        console.error("Error reading banner config:", error);
    }
    return NextResponse.json(DEFAULT_IMAGES);
}
