import { Router } from 'express';

export const router = Router();

// Render the client app
router.get('*', (_req, res) => {
  res.render('index');
});

export default router;
