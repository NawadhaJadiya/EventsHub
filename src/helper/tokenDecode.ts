import jwt from 'jsonwebtoken';

// This function is used in API routes and server components
export function decodeToken(token: string) {
  try {
    console.log('Attempting to decode token...');
    const decoded = jwt.verify(token, 'thisisNawadha');
    console.log('Token successfully decoded:', decoded);
    return decoded;
  } catch (err) {
    console.error('Error decoding token:', err);
    throw err;
  }
}

// This function is used in middleware (Edge Runtime)
export function verifyTokenInMiddleware(token: string) {
  try {
    // Simple token verification for middleware
    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error('Token expired');
    }

    return payload;
  } catch (err) {
    console.error('Error verifying token in middleware:', err);
    throw err;
  }
}