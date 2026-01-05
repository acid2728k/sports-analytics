import { Router, Request, Response } from 'express';
import { sports } from '../services/mockData';
import { ApiResponse, Sport } from '../types';

const router = Router();

/**
 * GET /api/sports
 * Returns list of all available sports
 */
router.get('/', (_req: Request, res: Response) => {
  const response: ApiResponse<Sport[]> = {
    success: true,
    data: sports,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

/**
 * GET /api/sports/:slug
 * Returns specific sport by slug
 */
router.get('/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const sport = sports.find(s => s.slug === slug);
  
  if (!sport) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Sport not found',
      timestamp: new Date().toISOString(),
    });
    return;
  }
  
  const response: ApiResponse<Sport> = {
    success: true,
    data: sport,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

export default router;




