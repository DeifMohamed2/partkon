// Landing Controller
// This file contains all landing page-related controller functions

/**
 * Get landing page
 */
const getLandingPage = async (req, res) => {
  try {
    res.render('Landing/index', {
      title: 'PartKon - Build Your Automotive Parts Website',
    });
  } catch (error) {
    console.error('Error in getLandingPage:', error);
    res.status(500).render('error', {
      title: 'Error | PartKon',
      error: 'Failed to load page',
    });
  }
};

/**
 * Get register page
 */
const getRegisterPage = async (req, res) => {
  try {
    res.render('Auth/register', {
      title: 'Create Account | PartKon',
    });
  } catch (error) {
    console.error('Error in getRegisterPage:', error);
    res.status(500).render('error', {
      title: 'Error | PartKon',
      error: 'Failed to load page',
    });
  }
};

module.exports = {
  getLandingPage,
  getRegisterPage,
};
