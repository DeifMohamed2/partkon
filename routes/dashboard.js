const express = require('express');
const router = express.Router();
const {
  requireAuth,
  getLoginPage,
  handleLogin,
  handleLogout,
  getDashboard,
  getOrders,
  getAnalytics,
  getSettings,
  getAppearance
} = require('../controllers/dashboardController');

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Login page
router.get('/login', getLoginPage);
router.post('/login', handleLogin);

// Logout
router.get('/logout', handleLogout);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Main Dashboard
router.get('/dashboard', requireAuth, getDashboard);

// Orders
router.get('/dashboard/orders', requireAuth, getOrders);

// Analytics
router.get('/dashboard/analytics', requireAuth, getAnalytics);

// Website Management
router.get('/dashboard/appearance', requireAuth, getAppearance);

// Settings
router.get('/dashboard/settings', requireAuth, getSettings);

// Placeholder routes for other pages
router.get('/dashboard/products', requireAuth, (req, res) => {
  res.render('Dashboard/coming-soon', { 
    title: 'Products | PartKon Dashboard',
    pageName: 'Products Management',
    user: req.user
  });
});

router.get('/dashboard/customers', requireAuth, (req, res) => {
  res.render('Dashboard/coming-soon', { 
    title: 'Customers | PartKon Dashboard',
    pageName: 'Customer Management',
    user: req.user
  });
});

router.get('/dashboard/pages', requireAuth, (req, res) => {
  res.render('Dashboard/coming-soon', { 
    title: 'Pages | PartKon Dashboard',
    pageName: 'Pages Management',
    user: req.user
  });
});

router.get('/dashboard/domain', requireAuth, (req, res) => {
  res.render('Dashboard/coming-soon', { 
    title: 'Domain | PartKon Dashboard',
    pageName: 'Domain Settings',
    user: req.user
  });
});

router.get('/dashboard/billing', requireAuth, (req, res) => {
  res.render('Dashboard/coming-soon', { 
    title: 'Billing | PartKon Dashboard',
    pageName: 'Billing & Subscriptions',
    user: req.user
  });
});

router.get('/dashboard/support', requireAuth, (req, res) => {
  res.render('Dashboard/coming-soon', { 
    title: 'Support | PartKon Dashboard',
    pageName: 'Help & Support',
    user: req.user
  });
});

router.get('/dashboard/account', requireAuth, (req, res) => {
  res.render('Dashboard/coming-soon', { 
    title: 'Account | PartKon Dashboard',
    pageName: 'Account Settings',
    user: req.user
  });
});

module.exports = router;
