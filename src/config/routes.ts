export const routes = {
  eCommerce: {
    dashboard: '/',
    products: '/ecommerce/products',
    createProduct: '/ecommerce/products/create',
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    editProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    detailProduct: (slug: string) => `/ecommerce/products/${slug}/detail`,

    priceLevel: '/ecommerce/price-level',
    createPriceLevel: '/ecommerce/price-level/create',
    editPriceLevel: (slug: string) => `/ecommerce/price-level/${slug}/edit`,
    detailPriceLevel: (slug: string) => `/ecommerce/price-level/${slug}/detail`,

    categories: '/ecommerce/categories',
    createCategory: '/ecommerce/categories/create',
    editCategory: (slug: string) => `/ecommerce/categories/${slug}/edit`,

    brands: '/ecommerce/brands',
    createBrands: '/ecommerce/brands/create',
    editBrands: (slug: string) => `/ecommerce/brands/${slug}/edit`,
    detailBrands: (slug: string) => `/ecommerce/brands/${slug}/detail`,

    attributes: '/ecommerce/attributes',
    createAttributes: '/ecommerce/attributes/create',
    editAttributes: (slug: string) => `/ecommerce/attributes/${slug}/edit`,
    detailAttributes: (slug: string) => `/ecommerce/attributes/${slug}/detail`,

    options: '/ecommerce/options',
    createOptions: '/ecommerce/options/create',
    editOptions: (slug: string) => `/ecommerce/options/${slug}/edit`,

    tags: '/ecommerce/tags',
    createTags: '/ecommerce/tags/create',
    editTags: (slug: string) => `/ecommerce/tags/${slug}/edit`,

    reviews: '/ecommerce/reviews',

    supplierList: '/ecommerce/suppliers',
    createSupplierList: '/ecommerce/suppliers/create',
    editSupplierList: (slug: string) => `/ecommerce/suppliers/${slug}/edit`,

    creditSupplierList: '/ecommerce/credit-suppliers',
    // createCreditSupplierList: '/ecommerce/credit-suppliers/create',
    // editCreditSupplierList: (slug: string) => `/ecommerce/credit-suppliers/${slug}/edit`,

    returnSupplier: '/ecommerce/return-suppliers',
    createReturnSupplier: '/ecommerce/return-suppliers/create',
    editReturnSupplier: (slug: string) => `/ecommerce/return-suppliers/${slug}/edit`,

    order: '/ecommerce/order',
    createOrder: '/ecommerce/order/create',
    editOrder: (slug: string) => `/ecommerce/order/${slug}/edit`,

    purchases: '/ecommerce/purchases',
    createPurchases: '/ecommerce/purchases/create',
    editPurchases: (slug: string) => `/ecommerce/purchases/${slug}/edit`,
    createSerialNumber: (slug: string) => `/ecommerce/purchases/${slug}/serial-number`,
    sendEmail: (slug: string) => `/ecommerce/purchases/${slug}/send-email`,
    print: (slug: string) => `/ecommerce/purchases/${slug}/print`,

    inventoryList: '/ecommerce/inventory-list',
    warehouses: (slug: string) => `'/ecommerce/warehouse/${slug}/edit`,
  },
  profile: '/profile',
  welcome: '/welcome',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',
  auth: {
    signUp1: '/auth/sign-up-1',
    signUp2: '/auth/sign-up-2',
    signUp3: '/auth/sign-up-3',
    signUp4: '/auth/sign-up-4',
    signUp5: '/auth/sign-up-5',
    // sign in
    signIn1: '/auth/sign-in-1',
    signIn2: '/auth/sign-in-2',
    signIn3: '/auth/sign-in-3',
    signIn4: '/auth/sign-in-4',
    signIn5: '/auth/sign-in-5',
    // forgot password
    forgotPassword1: '/auth/forgot-password-1',
    forgotPassword2: '/auth/forgot-password-2',
    forgotPassword3: '/auth/forgot-password-3',
    forgotPassword4: '/auth/forgot-password-4',
    forgotPassword5: '/auth/forgot-password-5',
    // OTP
    otp1: '/auth/otp-1',
    otp2: '/auth/otp-2',
    otp3: '/auth/otp-3',
    otp4: '/auth/otp-4',
    otp5: '/auth/otp-5',
  },
  signIn: '/signin',
};
