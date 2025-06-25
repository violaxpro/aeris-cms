import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: 'Home',
  },
  // label end
  {
    name: 'E-Commerce',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Support',
  },
  {
    name: 'Logistics',
  },
  {
    name: 'Analytics',
  },
  {
    name: 'File Manager',
  },
  {
    name: 'Appointment',
  },
  {
    name: 'Executive',
  },
  {
    name: 'Job Board',
  },
  {
    name: 'Financial',
  },
  // label start
  {
    name: 'Apps',
  },
  // label end
  {
    name: 'Products',
    href: routes.eCommerce.products,
  },
  {
    name: 'Product Details',
    href: routes.eCommerce.productDetails(DUMMY_ID),
  },
  {
    name: 'Create Product',
    href: routes.eCommerce.createProduct,
  },
  {
    name: 'Edit Product',
    href: routes.eCommerce.ediProduct(DUMMY_ID),
  },
  {
    name: 'Categories',
    href: routes.eCommerce.categories,
  },
  {
    name: 'Create Category',
    href: routes.eCommerce.createCategory,
  },
  {
    name: 'Edit Category',
    href: routes.eCommerce.editCategory(DUMMY_ID),
  },
  {
    name: 'Orders',
    href: routes.eCommerce.options,
  },
  {
    name: 'Order Details',
  },
  {
    name: 'Create Order',
    href: routes.eCommerce.createBrands,
  },
  {
    name: 'Edit Order',
    href: routes.eCommerce.ediProduct(DUMMY_ID),
  },
  {
    name: 'Reviews',
    href: routes.eCommerce.reviews,
  },
  {
    name: 'Shop',
    href: routes.eCommerce.options,
  },
  {
    name: 'Cart',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Checkout & Payment',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Support Inbox',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Support Snippets',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Support Templates',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Invoice List',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Invoice Details',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Create Invoice',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Edit Invoice',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Shipment List',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Shipment Details',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'Tracking',
    href: routes.eCommerce.attributes,
  },
  {
    name: 'File Manager',
  },
  // label start
  {
    name: 'Widgets',
  },
  // label end
  {
    name: 'Cards',
  },
  {
    name: 'Icons',
  },
  {
    name: 'Charts',
  },
  // {
  //   name: 'Banners',
  //   href: routes.widgets.banners,
  // },
  {
    name: 'Maps',
  },
  // label start
  {
    name: 'Forms',
  },
  // label end
  {
    name: 'Profile Settings',
  },
  {
    name: 'Notification Preference',
  },
  {
    name: 'Personal Information',
  },
  {
    name: 'Newsletter',
  },
  // {
  //   name: 'Multi Step',
  //   href: routes.forms.multiStep,
  // },
  {
    name: 'Payment checkout',
  },
  // label start
  {
    name: 'Tables',
  },
  // label end
  {
    name: 'Basic',
  },
  {
    name: 'Collapsible',
  },
  {
    name: 'Enhanced',
  },
  {
    name: 'Sticky Header',
  },
  {
    name: 'Pagination',
  },
  {
    name: 'Search',
  },
  // label start
  {
    name: 'Pages',
  },
  // label end
  {
    name: 'Profile',
    href: routes.profile,
  },
  {
    name: 'Welcome',
    href: routes.welcome,
  },
  {
    name: 'Coming soon',
    href: routes.comingSoon,
  },
  {
    name: 'Access Denied',
    href: routes.accessDenied,
  },
  {
    name: 'Not Found',
    href: routes.notFound,
  },
  {
    name: 'Maintenance',
    href: routes.maintenance,
  },
  {
    name: 'Blank',
    href: routes.blank,
  },
  // label start
  {
    name: 'Authentication',
  },
  // label end
  {
    name: 'Modern Sign Up',
    href: routes.auth.signUp1,
  },
  {
    name: 'Vintage Sign Up',
    href: routes.auth.signUp2,
  },
  {
    name: 'Trendy Sign Up',
    href: routes.auth.signUp3,
  },
  {
    name: 'Elegant Sign Up',
    href: routes.auth.signUp4,
  },
  {
    name: 'Classic Sign Up',
    href: routes.auth.signUp5,
  },
  {
    name: 'Modern Sign In',
    href: routes.auth.signIn1,
  },
  {
    name: 'Vintage Sign In',
    href: routes.auth.signIn2,
  },
  {
    name: 'Trendy Sign In',
    href: routes.auth.signIn3,
  },
  {
    name: 'Elegant Sign In',
    href: routes.auth.signIn4,
  },
  {
    name: 'Classic Sign In',
    href: routes.auth.signIn5,
  },
  {
    name: 'Modern Forgot Password',
    href: routes.auth.forgotPassword1,
  },
  {
    name: 'Vintage Forgot Password',
    href: routes.auth.forgotPassword2,
  },
  {
    name: 'Trendy Forgot Password',
    href: routes.auth.forgotPassword3,
  },
  {
    name: 'Elegant Forgot Password',
    href: routes.auth.forgotPassword4,
  },
  {
    name: 'Classic Forgot Password',
    href: routes.auth.forgotPassword5,
  },
  {
    name: 'Modern OTP Page',
    href: routes.auth.otp1,
  },
  {
    name: 'Vintage OTP Page',
    href: routes.auth.otp2,
  },
  {
    name: 'Trendy OTP Page',
    href: routes.auth.otp3,
  },
  {
    name: 'Elegant OTP Page',
    href: routes.auth.otp4,
  },
  {
    name: 'Classic OTP Page',
    href: routes.auth.otp5,
  },
];
