// Simple authentication helper
// In production, use proper authentication with database

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'DevMan@admin01'; // Set ADMIN_PASSWORD in .env.local for production

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateSessionToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
}

