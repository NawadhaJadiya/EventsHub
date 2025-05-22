export function getDirectDriveImageUrl(driveUrl: string): string | null {
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = driveUrl.match(regex);

  if (!match || match.length < 2) return null;

  const fileId = match[1];
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}