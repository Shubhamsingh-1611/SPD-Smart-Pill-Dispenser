import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import Patient from '../models/patientModel.js';

 const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the JWT in cookies
  if (req.cookies.jwt_token) {
    try {
      // Verify the token
      token = req.cookies.jwt_token;
      if(token === 'undefined') {
        res.status(401);
        return res.json({ message: 'Unauthorized' });
      }
      console.log('Token:', token);


      // if (!token) {
      //   res.status(401);
      //   throw new Error('Not authorized, no token');
      // }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach patient info to request
      req.patient = await Patient.findById(decoded.id).select('-password');

      next(); // Pass control to the next middleware/route
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export default protect;