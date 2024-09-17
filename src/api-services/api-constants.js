const apiUrl = {
  BASEURL: 'https://eventbox.nakshatranamahacreations.in/api',
  IMAGEURL: 'https://eventbox.nakshatranamahacreations.in/',

  // VENDOR
  VENDOR_REGISTER: '/vendor/register',
  VENDOR_LOGIN: '/vendor/login',
  LOGIN_WITH_MOBILE: '/vendor/loginwithmobilenumber',
  UPDATE_VENDOR_PROFILE: '/vendor/add-shop-details/',
  GET_VENDOR_PROFILE: '/vendor/getprofile/',
  FILTEROUT_VENDOR: '/vendor/filterout-vendors/',
  ADD_SHIPPING_ADDRESS: '/vendor/add-address/',
  VENDOR_LOGOUT: '/vendor/delete-vendor-profile/',
  GET_ALL_VENDOR: '/vendor/getallvendor',

  // PRODUCT
  ADD_PRODUCT: '/product/addproduct',
  GET_RENTAL_PRODUCTS: '/product/getrentalproduct',
  GET_SELLING_PRODUCTS: '/product/getsellproduct',
  GET_PRODUCT_BY_ID: '/product/getproduct/',
  FILTEROUT_PRODUCTS: '/product/getfilteroutproducts/',
  WRITE_A_REVIEW: '/product/review/',
  GET_REVIEW: '/product/getreview/',
  GET_VENDOR_PRODUCT: '/product/getvendorproduct/',

  // ORDER
  CREATE_ORDER: '/order/create-order',
  GET_ORDER_BY_VENDOR_ID: '/order/get-vendor-order/',
  RETURN_ORDER: '/order/return-order/',
};

export {apiUrl};
