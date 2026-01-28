// Customer Controller
// Professional customer dashboard with single website model - Website Builder Style

// Demo user data - single website per customer
const testUser = {
  id: 'usr_demo_12345',
  email: 'demo@partkon.com',
  password: 'demo123',
  name: 'John Doe',
  company: 'AutoParts Pro',
  phone: '+1 (555) 123-4567',
  avatar: null, // Will show initials
  plan: 'Pro Plan',
  planType: 'trial', // 'trial', 'free', 'pro', 'enterprise'
  trialEndsAt: new Date('2026-02-08'), // 14 days from now
  trialStartedAt: new Date('2026-01-25'),
  billingCycle: 'monthly',
  planPrice: 29,
  planFeatures: ['Unlimited Products', 'Custom Domain', 'Priority Support', 'Analytics Dashboard', 'SEO Tools', 'Email Marketing'],
  planLimits: {
    products: { used: 156, limit: -1 }, // -1 means unlimited
    storage: { used: 2.4, limit: 10 }, // in GB
    bandwidth: { used: 45.2, limit: 100 }, // in GB
    emailsPerMonth: { used: 850, limit: 5000 },
    teamMembers: { used: 3, limit: 5 }
  },
  createdAt: new Date('2025-06-15'),
  lastLoginAt: new Date('2026-01-28')
};

// Single website for the customer with enhanced details
const userWebsite = {
  id: 'site_001',
  name: 'AutoParts Pro Shop',
  url: 'https://autopartspro.partkon.com',
  customDomain: 'www.autopartspro.com',
  domainStatus: 'connected', // 'connected', 'pending', 'not-configured'
  sslStatus: 'active', // 'active', 'pending', 'expired', 'none'
  sslExpiresAt: new Date('2026-07-15'),
  status: 'online', // 'online', 'offline', 'maintenance'
  uptime: 99.98,
  lastDowntime: null,
  template: 'modern-automotive',
  templateVersion: '2.1.0',
  createdAt: new Date('2025-06-20'),
  lastModified: new Date('2026-01-27'),
  lastPublished: new Date('2026-01-27'),
  publishStatus: 'published', // 'published', 'draft', 'scheduled'
  performance: {
    score: 92,
    loadTime: 1.2, // seconds
    mobileScore: 88,
    seoScore: 85,
    accessibilityScore: 94
  },
  pages: {
    total: 12,
    published: 10,
    draft: 2
  },
  settings: {
    layout: 'full-width',
    primaryColor: '#6366F1',
    secondaryColor: '#8B5CF6',
    fontFamily: 'Inter',
    headerStyle: 'transparent',
    footerStyle: 'modern',
    favicon: '/images/favicon.ico',
    socialLinks: {
      facebook: 'https://facebook.com/autopartspro',
      instagram: 'https://instagram.com/autopartspro',
      twitter: 'https://twitter.com/autopartspro'
    }
  },
  integrations: {
    googleAnalytics: true,
    facebookPixel: true,
    mailchimp: false,
    stripe: true,
    paypal: true
  }
};

// Demo orders data with more details
const userOrders = [
  { id: 'ORD-2026-001', customer: 'Mike Johnson', email: 'mike@example.com', date: 'Jan 17, 2026', time: '10:30 AM', items: 3, amount: 1250.00, status: 'pending', paymentMethod: 'Credit Card' },
  { id: 'ORD-2026-002', customer: 'Sarah Williams', email: 'sarah@example.com', date: 'Jan 16, 2026', time: '03:45 PM', items: 2, amount: 890.50, status: 'processing', paymentMethod: 'PayPal' },
  { id: 'ORD-2026-003', customer: 'David Chen', email: 'david@example.com', date: 'Jan 16, 2026', time: '09:15 AM', items: 5, amount: 2340.00, status: 'shipped', paymentMethod: 'Credit Card' },
  { id: 'ORD-2026-004', customer: 'Emily Brown', email: 'emily@example.com', date: 'Jan 15, 2026', time: '02:00 PM', items: 1, amount: 450.00, status: 'delivered', paymentMethod: 'Stripe' },
  { id: 'ORD-2026-005', customer: 'James Wilson', email: 'james@example.com', date: 'Jan 15, 2026', time: '11:20 AM', items: 4, amount: 1875.00, status: 'delivered', paymentMethod: 'Credit Card' },
  { id: 'ORD-2026-006', customer: 'Lisa Garcia', email: 'lisa@example.com', date: 'Jan 14, 2026', time: '04:30 PM', items: 2, amount: 620.00, status: 'delivered', paymentMethod: 'PayPal' },
  { id: 'ORD-2026-007', customer: 'Robert Taylor', email: 'robert@example.com', date: 'Jan 14, 2026', time: '01:15 PM', items: 3, amount: 1100.00, status: 'shipped', paymentMethod: 'Credit Card' },
  { id: 'ORD-2026-008', customer: 'Amanda Lee', email: 'amanda@example.com', date: 'Jan 13, 2026', time: '05:45 PM', items: 1, amount: 275.00, status: 'pending', paymentMethod: 'Stripe' },
  { id: 'ORD-2026-009', customer: 'Chris Martinez', email: 'chris@example.com', date: 'Jan 13, 2026', time: '10:00 AM', items: 6, amount: 3200.00, status: 'processing', paymentMethod: 'Credit Card' },
  { id: 'ORD-2026-010', customer: 'Jennifer White', email: 'jennifer@example.com', date: 'Jan 12, 2026', time: '02:30 PM', items: 2, amount: 780.00, status: 'delivered', paymentMethod: 'PayPal' }
];

// Demo notifications with more variety
const userNotifications = [
  { id: 1, type: 'success', icon: 'shopping-cart', message: 'New order received: #ORD-2026-001', time: '2 hours ago', read: false },
  { id: 2, type: 'info', icon: 'users', message: 'Your website had 234 visitors today', time: '5 hours ago', read: false },
  { id: 3, type: 'warning', icon: 'package', message: 'Low stock alert: Brake Pads running low', time: '1 day ago', read: true },
  { id: 4, type: 'success', icon: 'check-circle', message: 'SSL certificate renewed successfully', time: '2 days ago', read: true },
  { id: 5, type: 'info', icon: 'trending-up', message: 'Weekly performance report is ready', time: '3 days ago', read: true }
];

// Demo activities with richer data
const userActivities = [
  { type: 'order', icon: 'shopping-cart', message: 'New order <strong>#ORD-2026-001</strong> from Mike Johnson', time: '2 hours ago', amount: '$1,250.00' },
  { type: 'visitor', icon: 'users', message: '<strong>15 new visitors</strong> in the last hour', time: '3 hours ago' },
  { type: 'sale', icon: 'credit-card', message: 'Payment received for order <strong>#ORD-2026-003</strong>', time: '5 hours ago', amount: '$2,340.00' },
  { type: 'order', icon: 'package', message: 'Order <strong>#ORD-2026-004</strong> was delivered', time: '1 day ago' },
  { type: 'visitor', icon: 'eye', message: '<strong>Sarah Williams</strong> viewed Brake Pads', time: '1 day ago' },
  { type: 'system', icon: 'shield', message: 'Security scan completed - no issues found', time: '2 days ago' },
  { type: 'publish', icon: 'globe', message: 'Website changes <strong>published</strong> successfully', time: '2 days ago' }
];

// Dashboard stats with enhanced metrics
const getDashboardStats = () => {
  const pending = userOrders.filter(o => o.status === 'pending').length;
  const processing = userOrders.filter(o => o.status === 'processing').length;
  const shipped = userOrders.filter(o => o.status === 'shipped').length;
  const delivered = userOrders.filter(o => o.status === 'delivered').length;
  const totalRevenue = userOrders.reduce((sum, o) => sum + o.amount, 0);

  return {
    totalOrders: userOrders.length,
    pendingOrders: pending,
    processingOrders: processing,
    shippedOrders: shipped,
    deliveredOrders: delivered,
    totalRevenue: totalRevenue,
    totalVisitors: 12450,
    uniqueVisitors: 8920,
    totalProducts: 156,
    activeProducts: 142,
    outOfStock: 8,
    lowStock: 6,
    totalCustomers: 1847,
    newCustomers: 156,
    returningCustomers: 1691,
    conversionRate: 3.2,
    cartAbandonmentRate: 68.5,
    avgOrderValue: totalRevenue / userOrders.length,
    ordersGrowth: 12.5,
    revenueGrowth: 8.2,
    visitorsGrowth: 15.3,
    conversionGrowth: -1.2,
    customersGrowth: 9.8
  };
};

// Chart data for dashboard - with comprehensive website builder data
const getChartData = () => ({
  // Revenue with smooth curve data (7 days)
  revenue: [1450, 1680, 1520, 2100, 2350, 2180, 2580],
  // Revenue for 30 days (4 weeks)
  revenue30d: [8200, 9450, 10200, 11800],
  // Revenue for 90 days (3 months)
  revenue90d: [28500, 32400, 38200],
  // Order status distribution
  orderStatus: [
    userOrders.filter(o => o.status === 'pending').length,
    userOrders.filter(o => o.status === 'processing').length,
    userOrders.filter(o => o.status === 'shipped').length,
    userOrders.filter(o => o.status === 'delivered').length
  ],
  // Top selling products
  topProducts: {
    labels: ['Brake Pads Pro', 'Premium Oil Filters', 'Spark Plugs Set', 'Air Filters HD', 'Car Batteries'],
    data: [145, 128, 96, 84, 72]
  },
  // Visitors analytics (last 7 days with hourly breakdown feel)
  visitors: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [1820, 2150, 1960, 2480, 2890, 3200, 2950]
  },
  // Traffic sources for pie chart
  trafficSources: {
    labels: ['Direct', 'Organic Search', 'Social Media', 'Referrals', 'Email'],
    data: [35, 28, 18, 12, 7],
    colors: ['#6366F1', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']
  },
  // Page views trend
  pageViews: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [4250, 5100, 4680, 5820, 6450, 7200, 6850]
  },
  // Bounce rate trend
  bounceRate: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [42, 38, 45, 35, 32, 28, 31]
  },
  // Average session duration (in seconds, displayed as minutes)
  avgSessionDuration: 185,
  // Conversion funnel
  conversionFunnel: {
    labels: ['Visitors', 'Product Views', 'Add to Cart', 'Checkout', 'Purchase'],
    data: [12450, 6820, 2150, 890, 398]
  },
  // Hourly visitors heatmap data (24 hours x 7 days)
  hourlyVisitors: {
    hours: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [
      [12, 8, 15, 85, 120, 145, 98, 45],
      [10, 6, 18, 92, 135, 160, 105, 52],
      [8, 5, 12, 78, 115, 138, 92, 48],
      [14, 9, 20, 105, 155, 180, 125, 68],
      [18, 12, 25, 125, 185, 210, 155, 85],
      [22, 15, 35, 145, 198, 235, 175, 95],
      [20, 14, 30, 130, 175, 205, 145, 78]
    ]
  },
  // Device breakdown
  devices: {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    data: [52, 38, 10],
    colors: ['#6366F1', '#10B981', '#F59E0B']
  },
  // Geographic distribution
  geoData: {
    labels: ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia'],
    data: [45, 18, 12, 8, 6],
    visitors: [5602, 2241, 1494, 996, 747]
  },
  // Sales by category
  salesByCategory: {
    labels: ['Brake Parts', 'Filters', 'Engine Parts', 'Electrical', 'Accessories'],
    data: [4850, 3200, 2800, 1950, 1580],
    colors: ['#6366F1', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']
  },
  // Weekly comparison
  weeklyComparison: {
    thisWeek: [1450, 1680, 1520, 2100, 2350, 2180, 2580],
    lastWeek: [1280, 1520, 1380, 1850, 2100, 1980, 2250]
  },
  // Real-time visitors (simulated)
  realTimeVisitors: 47,
  // Page performance
  pagePerformance: [
    { page: 'Home', views: 3420, avgTime: '2:15', bounceRate: 28 },
    { page: 'Products', views: 2850, avgTime: '3:45', bounceRate: 22 },
    { page: 'Brake Pads', views: 1680, avgTime: '4:20', bounceRate: 18 },
    { page: 'Cart', views: 890, avgTime: '2:50', bounceRate: 35 },
    { page: 'Checkout', views: 520, avgTime: '5:15', bounceRate: 15 }
  ]
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

    res.render('Customer/login', {
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

    res.render('Customer/login', {
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
    res.render('Customer/dashboard', {
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

    res.render('Customer/orders', {
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
    res.render('Customer/analytics', {
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
    res.render('Customer/settings', {
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
    res.render('Customer/appearance', {
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
