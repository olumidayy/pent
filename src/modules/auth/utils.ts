import { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { VerifyOptions, verify } from 'jsonwebtoken';
import Logger from '../../common/logger';
import { ApiError } from '../../common';

async function validateToken(token: string): Promise<any> {
  const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.pem'));

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256'],
  };

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    verify(token, publicKey, verifyOptions, (error, decoded) => {
      if (error) return reject(error);

      resolve(decoded);
    });
  });
}

function getTokenFromHeader(req: Request) {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
    || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

// eslint-disable-next-line consistent-return
export default async function attachUserData(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req);
  if (token) {
    try {
      const data = await validateToken(token);
      Logger.info(JSON.stringify(data));
      req.body.userId = Number(data.id);
    } catch (error) {
      return next(error);
    }
  } else {
    return next(new ApiError({ message: 'Unauthorized.', code: 401 }));
  }
  next();
}
