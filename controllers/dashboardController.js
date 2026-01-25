// Dashboard Controller
// Professional customer dashboard with single website model

// Demo user data - single website per customer
const testUser = {
  id: 'usr_demo_12345',
  email: 'demo@partkon.com',
  password: 'demo123',
  name: 'John Doe',
  company: 'AutoParts Pro',
  phone: '+1 (555) 123-4567',
  plan: 'Pro Plan',
  createdAt: new Date('2025-06-15')
};

// Single website for the customer
const userWebsite = {
  id: 'site_001',
  name: 'AutoParts Pro Shop',
  url: 'https://autopartspro.partkon.com',
  customDomain: 'www.autopartspro.com',
  status: 'online',
  template: 'modern-automotive',
  createdAt: new Date('2025-06-20'),
  lastModified: new Date('2026-01-15'),
  settings: {
    layout: 'full-width',
    primaryColor: '#6366F1',
    secondaryColor: '#8B5CF6',
    fontFamily: 'Inter',
    headerStyle: 'transparent',
    footerStyle: 'modern'
  }
};

// Demo orders data
const userOrders = [
  { id: 'ORD-2026-001', customer: 'Mike Johnson', email: 'mike@example.com', date: 'Jan 17, 2026', time: '10:30 AM', items: 3, amount: 1250.00, status: 'pending' },
  { id: 'ORD-2026-002', customer: 'Sarah Williams', email: 'sarah@example.com', date: 'Jan 16, 2026', time: '03:45 PM', items: 2, amount: 890.50, status: 'processing' },
  { id: 'ORD-2026-003', customer: 'David Chen', email: 'david@example.com', date: 'Jan 16, 2026', time: '09:15 AM', items: 5, amount: 2340.00, status: 'shipped' },
  { id: 'ORD-2026-004', customer: 'Emily Brown', email: 'emily@example.com', date: 'Jan 15, 2026', time: '02:00 PM', items: 1, amount: 450.00, status: 'delivered' },
  { id: 'ORD-2026-005', customer: 'James Wilson', email: 'james@example.com', date: 'Jan 15, 2026', time: '11:20 AM', items: 4, amount: 1875.00, status: 'delivered' },
  { id: 'ORD-2026-006', customer: 'Lisa Garcia', email: 'lisa@example.com', date: 'Jan 14, 2026', time: '04:30 PM', items: 2, amount: 620.00, status: 'delivered' },
  { id: 'ORD-2026-007', customer: 'Robert Taylor', email: 'robert@example.com', date: 'Jan 14, 2026', time: '01:15 PM', items: 3, amount: 1100.00, status: 'shipped' },
  { id: 'ORD-2026-008', customer: 'Amanda Lee', email: 'amanda@example.com', date: 'Jan 13, 2026', time: '05:45 PM', items: 1, amount: 275.00, status: 'pending' },
  { id: 'ORD-2026-009', customer: 'Chris Martinez', email: 'chris@example.com', date: 'Jan 13, 2026', time: '10:00 AM', items: 6, amount: 3200.00, status: 'processing' },
  { id: 'ORD-2026-010', customer: 'Jennifer White', email: 'jennifer@example.com', date: 'Jan 12, 2026', time: '02:30 PM', items: 2, amount: 780.00, status: 'delivered' }
];

// Demo notifications
const userNotifications = [
  { id: 1, type: 'success', message: 'New order received: #ORD-2026-001', time: '2 hours ago', read: false },
  { id: 2, type: 'info', message: 'Your website had 234 visitors today', time: '5 hours ago', read: false },
  { id: 3, type: 'warning', message: 'Low stock alert: Brake Pads running low', time: '1 day ago', read: true }
];

// Demo activities
const userActivities = [
  { type: 'order', message: 'New order <strong>#ORD-2026-001</strong> from Mike Johnson', time: '2 hours ago' },
  { type: 'visitor', message: '<strong>15 new visitors</strong> in the last hour', time: '3 hours ago' },
  { type: 'sale', message: 'Payment received for order <strong>#ORD-2026-003</strong>', time: '5 hours ago' },
  { type: 'order', message: 'Order <strong>#ORD-2026-004</strong> was delivered', time: '1 day ago' },
  { type: 'visitor', message: '<strong>Sarah Williams</strong> viewed Brake Pads', time: '1 day ago' }
];

// Dashboard stats
const getDashboardStats = () => {
  const pending = userOrders.filter(o => o.status === 'pending').length;
  const processing = userOrders.filter(o => o.status === 'processing').length;
  const shipped = userOrders.filter(o => o.status === 'shipped').length;
  const delivered = userOrders.filter(o => o.status === 'delivered').length;
  const totalRevenue = userOrders.reduce((sum, o) => sum + o.amount, 0);

  return {
    totalOrders: userOrders.length,
    pendingOrders: pending,
    totalRevenue: totalRevenue,
    totalVisitors: 12450,
    totalProducts: 156,
    conversionRate: 3.2,
    ordersGrowth: 12.5,
    revenueGrowth: 8.2,
    visitorsGrowth: 15.3,
    conversionGrowth: -1.2
  };
};

// Chart data for dashboard
const getChartData = () => ({
  revenue: [1200, 1900, 1500, 2100, 2400, 1800, 2200],
  orderStatus: [
    userOrders.filter(o => o.status === 'pending').length,
    userOrders.filter(o => o.status === 'processing').length,
    userOrders.filter(o => o.status === 'shipped').length,
    userOrders.filter(o => o.status === 'delivered').length
  ],
  topProducts: {
    labels: ['Brake Pads', 'Oil Filters', 'Spark Plugs', 'Air Filters', 'Batteries'],
    data: [45, 38, 32, 28, 24]
  }
});

/**
 * Check if user is authenticated
 */
const isAuthenticated = (req) => {
  return req.cookies && req.cookies.demo_session === 'authenticated';
};

/**
 * Authentication middleware
 */
const requireAuth = (req, res, next) => {
  if (isAuthenticated(req)) {
    req.user = testUser;
    next();
  } else {
    res.redirect('/login');
  }
};

/**
 * Get login page
 */
const getLoginPage = async (req, res) => {
  try {
    if (isAuthenticated(req)) {
      return res.redirect('/dashboard');
    }
    
    res.render('Dashboard/login', {
      title: 'Login | PartKon Dashboard',
      error: null
    });
  } catch (error) {
    console.error('Error in getLoginPage:', error);
    res.status(500).render('error', { title: 'Error', error: 'Failed to load page' });
  }
};

/**
 * Handle login
 */
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isAjax = req.headers['content-type'] === 'application/json';
    
    if (email === testUser.email && password === testUser.password) {
      res.cookie('demo_session', 'authenticated', {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });
      
      if (isAjax) {
        return res.json({ success: true, redirect: '/dashboard' });
      }
      return res.redirect('/dashboard');
    }
    
    if (isAjax) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password. Try demo@partkon.com / demo123' 
      });
    }
    
    res.render('Dashboard/login', {
      title: 'Login | PartKon Dashboard',
      error: 'Invalid email or password. Try demo@partkon.com / demo123'
    });
  } catch (error) {
    console.error('Error in handleLogin:', error);
    if (req.headers['content-type'] === 'application/json') {
      return res.status(500).json({ success: false, message: 'Login failed' });
    }
    res.status(500).render('error', { title: 'Error', error: 'Login failed' });
  }
};

/**
 * Handle logout
 */
const handleLogout = async (req, res) => {
  try {
    res.clearCookie('demo_session');
    res.redirect('/login');
  } catch (error) {
    console.error('Error in handleLogout:', error);
    res.redirect('/');
  }
};

/**
 * Get main dashboard
 */
const getDashboard = async (req, res) => {
  try {
    res.render('Dashboard/index', {
      title: 'Dashboard | PartKon',
      user: testUser,
      website: userWebsite,
      orders: userOrders,
      notifications: userNotifications,
      activities: userActivities,
      stats: getDashboardStats(),
      chartData: getChartData()
    });
  } catch (error) {
    console.error('Error in getDashboard:', error);
    res.status(500).render('error', { title: 'Error', error: 'Failed to load dashboard' });
  }
};

/**
 * Get orders page
 */
const getOrders = async (req, res) => {
  try {
    const orderStats = {
      pending: userOrders.filter(o => o.status === 'pending').length,
      processing: userOrders.filter(o => o.status === 'processing').length,
      shipped: userOrders.filter(o => o.status === 'shipped').length,
      delivered: userOrders.filter(o => o.status === 'delivered').length
    };

    res.render('Dashboard/orders', {
      title: 'Orders | PartKon Dashboard',
      user: testUser,
      website: userWebsite,
      orders: userOrders,
      orderStats: orderStats,
      notifications: userNotifications,
      stats: getDashboardStats()
    });
  } catch (error) {
    console.error('Error in getOrders:', error);
    res.status(500).render('error', { title: 'Error', error: 'Failed to load orders' });
  }
};

/**
 * Get analytics page
 */
const getAnalytics = async (req, res) => {
  try {
    res.render('Dashboard/analytics', {
      title: 'Analytics | PartKon Dashboard',
      user: testUser,
      website: userWebsite,
      notifications: userNotifications,
      stats: getDashboardStats(),
      chartData: getChartData()
    });
  } catch (error) {
    console.error('Error in getAnalytics:', error);
    res.status(500).render('error', { title: 'Error', error: 'Failed to load analytics' });
  }
};

/**
 * Get settings page
 */
const getSettings = async (req, res) => {
  try {
    res.render('Dashboard/settings', {
      title: 'Settings | PartKon Dashboard',
      user: testUser,
      website: userWebsite,
      notifications: userNotifications,
      stats: getDashboardStats()
    });
  } catch (error) {
    console.error('Error in getSettings:', error);
    res.status(500).render('error', { title: 'Error', error: 'Failed to load settings' });
  }
};

/**
 * Get appearance page
 */
const getAppearance = async (req, res) => {
  try {
    res.render('Dashboard/appearance', {
      title: 'Appearance | PartKon Dashboard',
      user: testUser,
      website: userWebsite,
      notifications: userNotifications,
      stats: getDashboardStats()
    });
  } catch (error) {
    console.error('Error in getAppearance:', error);
    res.status(500).render('error', { title: 'Error', error: 'Failed to load appearance' });
  }
};

module.exports = {
  requireAuth,
  getLoginPage,
  handleLogin,
  handleLogout,
  getDashboard,
  getOrders,
  getAnalytics,
  getSettings,
  getAppearance
};
