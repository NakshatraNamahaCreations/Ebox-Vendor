const apiUrl = {
  // BASEURL: 'http://192.168.1.103:9000/api',
  BASEURL: 'http://192.168.1.103:9000/api',
  IMAGEURL: 'http://192.168.1.103:9000/',
  LOCALURL: 'https://eventbox.nakshatranamahacreations.in/api',

  // VENDOR
  VENDOR_REGISTER: '/vendor/register',
  VENDOR_LOGIN: '/vendor/login',
  LOGIN_WITH_MOBILE: '/vendor/loginwithmobilenumber',
  ADD_VENDOR_BUSINESS_DETAILS: '/vendor/add-vendor-business-details/',
  ADD_SERVICE_USER_BUSINESS_DETAILS:
    '/vendor/add-service-user-business-details/',
  // SERVICE_USER_BUSINESS: '/vendor/save-vendor-details',
  ADD_SERVICE_ADDITIONAL_DETAILS: '/vendor/add-additional-services/',
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

  // SERVICE
  GET_ALL_SERVICE: '/service/get-all-service',
  GET_SERVICE_BY_SERVICENAME: '/service/get-service-by-servicename',
  GET_ALL_SUB_SERVICE: '/sub-service/get-all-sub-service',
};

export {apiUrl};
