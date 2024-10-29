import "express-session";
import { User } from "../../user/user.entity";

declare module "express-session" {
  interface SessionData {
    user: User | null;
  }
}
