import { Request, Response } from 'express';
import * as _ from 'lodash';
import * as HTTPStatus from 'http-status';
import User from '../User/service';
import Handlers from '../../api/responses/handlers';

class TokenRoutes {

  noauth(req: Request, res: Response) {
    return res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }

  auth(req: Request, res: Response) {
    const credentials = {
      email: req.body.email,
      password: req.body.password
    };

    if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
      User
        .getByEmail(credentials.email)
        .then(_.partial(Handlers.authSuccess, res, credentials))
        .catch(_.partial(Handlers.authFail, req, res));
    }
  }
}

export default new TokenRoutes();
