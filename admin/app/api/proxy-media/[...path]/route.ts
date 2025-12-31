import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Chemin vers le dossier media du frontend
// process.cwd() dans Next.js pointe vers le répertoire de l'application (admin)
// On remonte d'un niveau pour aller à la racine, puis dans frontend/public/media
function getMediaDir() {
    const adminDir = process.cwd(); // /home/yupi/Projet Yupi/Yupi/yupi-global/admin
    const projectRoot = path.resolve(adminDir, '..'); // /home/yupi/Projet Yupi/Yupi/yupi-global
    return path.join(projectRoot, 'frontend', 'public', 'media');
}

const MEDIA_DIR = getMediaDir();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const resolvedParams = await params;
        const filePath = resolvedParams.path.join('/');
        const fullPath = path.join(MEDIA_DIR, filePath);
        
        // Sécurité : vérifier que le chemin est dans MEDIA_DIR
        const normalizedPath = path.normalize(fullPath);
        const normalizedMediaDir = path.normalize(MEDIA_DIR);
        
        if (!normalizedPath.startsWith(normalizedMediaDir)) {
            console.error('Invalid path:', normalizedPath, 'not in', normalizedMediaDir);
            return new NextResponse('Invalid path', { status: 403 });
        }
        
        // Vérifier que le fichier existe
        if (!fs.existsSync(normalizedPath)) {
            console.error('File not found:', normalizedPath);
            return new NextResponse('File not found', { status: 404 });
        }
        
        // Lire le fichier
        const fileBuffer = fs.readFileSync(normalizedPath);
        
        // Déterminer le type MIME
        const ext = path.extname(normalizedPath).toLowerCase();
        const mimeTypes: Record<string, string> = {
            '.webp': 'image/webp',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.mp4': 'video/mp4',
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        // Retourner l'image avec les bons headers
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error: any) {
        console.error('Error proxying media:', error);
        return new NextResponse(`Error loading image: ${error.message}`, { status: 500 });
    }
}

