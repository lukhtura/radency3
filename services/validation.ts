// DO NOT WORK. TODO: FIX ME. ASKS REQUIRED FIELDS WHEN THEY ARE.

import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { Schema, ValidationError } from 'yup';

const schema = yup.object({
  body: yup.object({
    id: yup.string().required(),
    date: yup.string().required(),
    title: yup.string().min(3).max(15).required(),
    category: yup.string().required(),
    content: yup.string().min(8).max(100).required(),
    isArchived: yup.boolean().required(),
  }),
});

const validate =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
      });
      return next();
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(500).json({ type: err.name, message: err.message });
      }
      return res
        .status(500)
        .json({ type: 'ValidationError', message: 'Validation error' });
    }
  };

export { schema, validate };
