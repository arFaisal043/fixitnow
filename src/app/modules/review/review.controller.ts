import { Request, Response, NextFunction } from 'express';
import { ReviewService } from './review.service';

const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ReviewService.createReview(req.body);
    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ReviewController = {
  createReview,
};
