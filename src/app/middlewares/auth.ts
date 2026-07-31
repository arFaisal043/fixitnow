import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import config from '../config';

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error('You are not authorized!');
      }

      // We are not using Bearer prefix as requested
      const verifiedUser = verifyToken(token, config.jwt_access_secret as string);

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new Error('You are not authorized to access this route');
      }

      req.user = verifiedUser as any;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
