import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: number; // O el tipo adecuado para tu `userId`
  }
}
