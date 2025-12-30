import { Router } from 'express';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Routes will be added here
// router.use('/pages', pagesRoutes);
// router.use('/posts', postsRoutes);
// router.use('/members', membersRoutes);
// router.use('/admin', adminRoutes);

export default router;

