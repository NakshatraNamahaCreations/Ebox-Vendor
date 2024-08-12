const productList = [
  {
    _id: '65ec4d5f3f362eb6d1b32866',
    productName: '4 feets Brass Lamp For Rent Near You',
    categoryId: '65d09bff61ad81ac9aa653c4',
    categoryName: 'Light',
    vendorName: 'Vinayaka',
    shopName: 'Shri Vinayaka Rents',
    productDescription:
      '4 feets Pure Brass With Decoration (Optional) Peacock Or Cross Symbol(Optional) Free Delivery',
    productPrice: 1000,
    units: 'Hour',
    productImage:
      'https://img.freepik.com/free-photo/standing-microphone-white-background_140725-7740.jpg?t=st=1717763240~exp=1717766840~hmac=0eb997f5dbec359f6d3735cf24995df1de813b5e32cfdd5e892efd2781ab36d6&w=360',
  },
  {
    _id: '65ec4d8e3f362eb6d1b32871',
    productName: 'Led parcan light on hire ',
    categoryId: '65d09bff61ad81ac9aa653c4',
    categoryName: 'Speaker',
    vendorName: 'Nayakan',
    shopName: 'Nayak Digitals',
    productDescription: 'Led light on hire',
    productPrice: 2500,
    units: 'Day',
    productImage:
      'https://m.media-amazon.com/images/I/91zCZLVUg8L._AC_UY218_.jpg',
  },
  {
    _id: '65ec53403f362eb6d1b32983',
    productName: 'LED Par Light Rental Service',
    categoryId: '65d09bff61ad81ac9aa653c4',
    categoryName: 'Camera',
    vendorName: 'Mani Thiruvenkadam',
    shopName: 'Mani Enterprises',
    productDescription:
      'To meet the various requirements of the customers, we are involved in providing LED Par Light Rental Service.',
    productPrice: 1000,
    units: 'Hour',
    productImage:
      'https://img.freepik.com/free-photo/camera-equipment-capturing-single-macro-object-generative-ai_188544-12096.jpg?t=st=1717763616~exp=1717767216~hmac=0401f060731bed95c2248510431c7536059f73bbbab84a580e40ea830590a84c&w=740',
  },
  {
    _id: '65ec53673f362eb6d1b32994',
    productName: 'Bluetooth Speaker On Rent',
    categoryId: '65cdf550f8445ef008d0ed02',
    categoryName: 'Sound',
    shopName: 'Mani Enterprises',
    vendorName: 'Mani Thiruvenkadam',
    productDescription:
      'Consider renting a Bluetooth speaker for your small event. Rental services offer a variety of speakers, so you can find the perfect one for your needs. Compare rates, features, and delivery options from different rental companies before making a decision.',
    productPrice: 1500,
    units: 'Day',
    productImage:
      'https://5.imimg.com/data5/ANDROID/Default/2023/5/312502760/NT/NI/BE/44485227/product-jpeg-1000x1000.jpg',
  },
  {
    _id: '66362914711365d704e20a91',
    productName: 'Jbl Speaker On Rental',
    categoryId: '65cdf550f8445ef008d0ed02',
    categoryName: 'Sound',
    shopName: 'Nayak Digitals',
    vendorName: 'Nayakan',
    productDescription:
      'We are professional in Sound hardware Related Services, Speakers , Amplifiers , Mixers , Consoles for Birthday Parties, Confrences , and Events.Contact For More Deatail.',
    productPrice: 6800,
    units: 'Hour',
    productImage:
      'https://5.imimg.com/data5/SELLER/Default/2023/6/313927078/UU/DN/QX/190852559/paket-sound-system-meeting-a-e7b-3037-881-t598-26-1000x1000.jpg',
  },

  {
    _id: '66362914711365d704e20a91',
    productName: 'Stage Lighting 3d element',
    categoryId: '65cdf550f8445ef008d0ed02',
    categoryName: 'Light',
    shopName: 'Mani Enterprises',
    vendorName: 'Mani Thiruvenkadam',
    productDescription:
      'We are professional in Sound hardware Related Services, Speakers , Amplifiers , Mixers , Consoles for Birthday Parties, Confrences , and Events.Contact For More Deatail.',
    productPrice: 600,
    units: 'Hour',
    productImage:
      'https://img.freepik.com/premium-psd/stage-lighting-3d-element-composition_738996-444.jpg?w=740',
  },
  {
    _id: '66362914711365d704e20a91',
    productName: 'Ligting Lamp',
    categoryId: '65cdf550f8445ef008d0ed02',
    categoryName: 'Light',
    shopName: 'Nayak Digitals',
    vendorName: 'Nayakan',
    productDescription:
      'We are professional in Sound hardware Related Services, Speakers , Amplifiers , Mixers , Consoles for Birthday Parties, Confrences , and Events.Contact For More Deatail.',
    productPrice: 400,
    units: 'Hour',
    productImage:
      'https://img.freepik.com/premium-photo/close-up-illuminated-electric-lamp-against-wall_1048944-22081001.jpg?w=740',
  },
  {
    _id: '66362914711365d704e20a91',
    productName: 'Spotlight with yellow light',
    categoryId: '65cdf550f8445ef008d0ed02',
    categoryName: 'Light',
    shopName: 'Shri Vinayaka Rents',
    vendorName: 'Vinayaka',
    productDescription:
      'We are professional in Sound hardware Related Services, Speakers , Amplifiers , Mixers , Consoles for Birthday Parties, Confrences , and Events.Contact For More Deatail.',
    productPrice: 5600,
    units: 'Hour',
    productImage:
      'https://img.freepik.com/premium-photo/spotlight-with-yellow-light-with-dark-background_747552-17433.jpg?w=740',
  },
];

const addsOnProducts = [
  {
    productImage:
      'https://playeventrentals.com/wp-content/uploads/2021/03/play-rental-item-xlr-cable-247x247.jpg',
    id: '652745',
    productName: 'XLR Cable',
    productPrice: 150,
  },
  {
    productImage:
      'https://playeventrentals.com/wp-content/uploads/2022/03/play-rental-item-power-extension-cord-247x247.jpg',
    id: '652745',
    productName: 'Power Extension Cord',
    productPrice: 130,
  },
  {
    productImage:
      'https://playeventrentals.com/wp-content/uploads/2022/03/play-rental-item-ultimate-support-ts90b-speaker-stand-247x247.jpg',
    id: '652745',
    productName: 'Ultimate Support Speaker Stand',
    productPrice: 120,
  },
  {
    productImage:
      'https://playeventrentals.com/wp-content/uploads/2022/03/play-rental-item-35-mm-male-to-male-stereo-audio-cable-247x247.jpg',
    id: '652745',
    productName: '3.5mm Male to Male Stereo Audio Cable',
    productPrice: 550,
  },
  {
    productImage:
      'https://playeventrentals.com/wp-content/uploads/2021/04/play-rental-item-355mm-xlr-adapter-cable-247x247.jpg',
    id: '652745',
    productName: '3.5mm to XLR Adapter Cable',
    productPrice: 200,
  },
];

const vendor = [
  {
    shopName: 'Mani Enterprises',
    vendorName: 'Mani Thiruvenkadam',
    location: 'Majestic',
    verifiedBadge: true,
    companyLogo:
      'https://img.freepik.com/free-vector/golden-elegant-corporative-logo-template_23-2148214854.jpg?t=st=1717825298~exp=1717828898~hmac=71a0c68ffb0e52af3115cc54d2a1da6d48443f3f354c6f3112b6a4a5bc748a6b&w=740',
    vendorProductImage: [
      {
        imageUrl:
          'https://lh3.googleusercontent.com/p/AF1QipPXLvQb1Va5haLR42be6Jnz35WemPmaJDjmJX6W=s680-w680-h510',
      },
      {
        imageUrl:
          'https://content.jdmagicbox.com/comp/nalgonda/m3/9999p8682.8682.201203170035.l9m3/catalogue/-8t9w2ohcqk.jpg',
      },
      {
        imageUrl:
          'https://www.daytonlocal.com/images/profiles/covers/special-occasions-party-supply.jpg',
      },
    ],
  },
  {
    shopName: 'Shri Vinayaka Rents',
    vendorName: 'Vinayaka',
    location: 'Channasandra',
    verifiedBadge: true,
    companyLogo:
      'https://img.freepik.com/free-vector/bull-logo-template-design_23-2150454457.jpg?t=st=1717825508~exp=1717829108~hmac=dee30784ec026bf7cf8e7fc0e575752aad846e7fc3c392e9bf7259b2789be7db&w=740',
    vendorBannerImage: [
      {
        imageUrl:
          'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg',
      },
      {
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwaA8j3JXCUJK6s0E139bWxzBDGcLkBaAaZBUycCpQo-9_9JZf99E2r7QQrTKS7qyNNmk&usqp=CAU',
      },
      {
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-qEOjAIUbs_tt9F5PFoFXzTsCvcTCr-xEpJsbaaEyp2mXkCZzv-yjkn1MzV5TEUr1rw&usqp=CAU',
      },
    ],
  },
  {
    shopName: 'Nayak Digitals',
    vendorName: 'Nayakan',
    location: 'Banashankari',
    verifiedBadge: false,
    companyLogo:
      'https://img.freepik.com/free-vector/red-logo-black-background_1195-52.jpg?t=st=1717825243~exp=1717828843~hmac=8f302992e741f66cfaabfdc548b4918fc16dabb2c7d7ea7ad76d41486da1e1b2&w=740',
    vendorProductImage: [
      {
        imageUrl:
          'https://lh3.googleusercontent.com/p/AF1QipOV6toil7D3V_8hdR04NcbKC3tpOaG6BQKrwNR-=s680-w680-h510',
      },
      {
        imageUrl:
          'https://lh3.googleusercontent.com/p/AF1QipN5gR_rQob6ywAzN6KgTasz7-NEU6seZjtHs6Q6=s680-w680-h510',
      },
      {
        imageUrl:
          'https://lh3.googleusercontent.com/p/AF1QipOvmutDqf12OuCsy-f_NRf6B03W46ZRqhPe7bch=s680-w680-h510',
      },
    ],
  },
];

const priceFilter = [
  {
    price: 'All Price',
    id: '652745',
  },
  {
    price: 'Under ₹300',
    id: '978956',
  },
  {
    price: '₹300 - ₹500',
    id: '576586',
  },
  {
    price: '₹500 - ₹1000',
    id: '326524',
  },
  {
    price: '₹1000 - ₹1500',
    id: '547364',
  },
  {
    price: 'Over ₹1500',
    id: '4245374',
  },
];

const sliderImage = [
  {
    imageUrl: require('../../assets/Kiru3_5.png'),
  },
  {
    imageUrl: require('../../assets/Kiru3_4.png'),
  },
  {
    imageUrl: require('../../assets/Kiru3_3.png'),
  },
];

const allProducts = [
  {
    _id: 1,
    productName: 'Camera Multi Setup',
    productDescription: 'Camera Multi Setup',
    shopName: 'CP PLUS',
    productPrice: 25000,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3196/64be6227f3d98.jpeg',
  },
  {
    _id: 2,
    productName: 'Drone with Operator Phantom 4 Pro with Live',
    productDescription: 'Drone with Operator Phantom 4 Pro with Live.',
    shopName: 'Hill Star',
    productPrice: 5000,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3198/64be62282081e.jpeg',
  },
  {
    _id: 3,
    productName: 'JBL GO 3 ECO',
    productDescription:
      'New innovative, eco-friendly design - same rich JBL Original Pro Sound performance. Created using up to 90% PCR (post-consumer recycled) plastic with 100% recycled fabric on the speaker grille, the design of the JBL Go 3 Eco significantly reduces the amount of virgin plastic being used while reducing the overall carbon footprint of the product. It also comes in sustainable packaging made from FSC - certified paper printed with soy ink.',
    shopName: 'JBL Store',
    productPrice: 5000,
    imageUrl:
      'https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7bc6c838/JBL_PARTYBOX_STAGE_320_HERO_2_47988_x3.png?sw=535&sh=535',
  },
  {
    _id: 4,
    productName: 'RODE Wireless Go II',
    productDescription: 'RODE Wireless Go II',
    shopName: 'RODE Wireless',
    productPrice: 1020,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3298/64c9efa8b811c.jpeg',
  },
  {
    _id: 5,
    productName: 'JBL CLIP 4 ECO',
    productDescription:
      'New innovative, eco-friendly design—same big audio performance. Help make the world a little greener with a must-have accessory for your next outing, made from up to 90% post-consumer recycled plastic and wrapped in 100% recycled fabric on the speaker grille. The vibrant fresh looking JBL Clip 4 Eco delivers surprisingly rich JBL Original Pro Sound in a compact package. The unique oval shape fits easy in your hand. The fully integrated carabiner hooks instantly to bags, belts, or buckles, to bring your favorite tunes anywhere. Waterproof, dustproof, and up to 10 hours of playtime, it’s rugged enough to tag along wherever you explore.',
    shopName: 'JBL Store',
    productPrice: 4599,
    imageUrl:
      'https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw36d9e6db/JBL_FlipEssential_Hero_005_x1.png?sw=320&sh=320',
  },
  {
    _id: 6,
    productName: 'Aputure LS 300X BI - Color LED Moonlight',
    productDescription: 'Aputure LS 300X BI - Color LED Moonlight',
    shopName: 'Zeb home appliances',
    productPrice: 97000,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3296/64c9efa88ed19.jpeg',
  },
  {
    _id: 7,
    productName: 'JBL FLIP ESSENTIAL 2',
    productDescription:
      'Take your tunes on the go with the powerful JBL Flip Essential 2. Our lightweight Bluetooth speaker goes anywhere. Bad weather? Not to worry. With its waterproof design, you can rock out to our JBL Original Pro Sound rain or shine. Enjoy up to 10 hours of playtime for your favorite music.',
    shopName: 'JBL Store',
    productPrice: 6599,
    imageUrl:
      'https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwddea8c6c/1_JBL_FLIP6_HERO_BLACK_29391_x2.png?sw=320&sh=320',
  },
  {
    _id: 8,
    productName:
      'Sound with Cordless Mic Power & Battery Backup for Video Song Shoot',
    productDescription:
      'Sound with Cordless Mic Power & Battery Backup for Video Song Shoot',
    shopName: 'RODE Wireless',
    productPrice: 5600,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3194/64be6227d2f0e.jpeg',
  },
  {
    _id: 9,
    productName: 'RODE Wireless Go II',
    productDescription: 'RODE Wireless Go II',
    shopName: 'RODE Wireless',
    productPrice: 1020,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3298/64c9efa8b811c.jpeg',
  },
  {
    _id: 10,
    productName: 'JBL CLIP 4 ECO',
    productDescription:
      'New innovative, eco-friendly design—same big audio performance. Help make the world a little greener with a must-have accessory for your next outing, made from up to 90% post-consumer recycled plastic and wrapped in 100% recycled fabric on the speaker grille. The vibrant fresh looking JBL Clip 4 Eco delivers surprisingly rich JBL Original Pro Sound in a compact package. The unique oval shape fits easy in your hand. The fully integrated carabiner hooks instantly to bags, belts, or buckles, to bring your favorite tunes anywhere. Waterproof, dustproof, and up to 10 hours of playtime, it’s rugged enough to tag along wherever you explore.',
    shopName: 'JBL Store',
    productPrice: 4599,
    imageUrl:
      'https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw36d9e6db/JBL_FlipEssential_Hero_005_x1.png?sw=320&sh=320',
  },
  {
    _id: 11,
    productName: 'Aputure LS 300X BI - Color LED Moonlight',
    productDescription: 'Aputure LS 300X BI - Color LED Moonlight',
    shopName: 'Hiffin',
    productPrice: 97000,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3296/64c9efa88ed19.jpeg',
  },
  {
    _id: 12,
    productName: 'Camera Multi Setup',
    productDescription: 'Camera Multi Setup',
    shopName: 'Generic',
    productPrice: 25000,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3196/64be6227f3d98.jpeg',
  },
  {
    _id: 13,
    productName: 'Drone with Operator Phantom 4 Pro with Live',
    productDescription: 'Drone with Operator Phantom 4 Pro with Live.',
    productPrice: 5000,
    shopName: 'TP Plus',
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3198/64be62282081e.jpeg',
  },
];

const bookingHistory = [
  {
    _id: 1,
    productName: 'Camera Multi Setup',
    productDescription: 'Camera Multi Setup',
    shopName: 'CP PLUS ',
    productPrice: 25000,
    quantity: 3,
    orderDate: '15-06-2024, 11:00 am',
    orderStatus: 'Delivered today',
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3196/64be6227f3d98.jpeg',
  },
  {
    _id: 2,
    productName: 'Drone with Operator Phantom 4 Pro with Live',
    productDescription: 'Drone with Operator Phantom 4 Pro with Live.',
    shopName: 'Hill Star',
    productPrice: 5000,
    orderDate: '15-06-2024, 11:00 am',
    quantity: 1,
    orderStatus: 'Delivered 29 june',
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3198/64be62282081e.jpeg',
  },
  {
    _id: 3,
    productName: 'JBL GO 3 ECO',
    productDescription:
      'New innovative, eco-friendly design - same rich JBL Original Pro Sound performance. Created using up to 90% PCR (post-consumer recycled) plastic with 100% recycled fabric on the speaker grille, the design of the JBL Go 3 Eco significantly reduces the amount of virgin plastic being used while reducing the overall carbon footprint of the product. It also comes in sustainable packaging made from FSC - certified paper printed with soy ink.',
    shopName: 'JBL Store',
    productPrice: 5000,
    orderDate: '15-06-2024, 11:00 am',
    quantity: 6,
    orderStatus: 'Delivered 29 June',
    imageUrl:
      'https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7bc6c838/JBL_PARTYBOX_STAGE_320_HERO_2_47988_x3.png?sw=535&sh=535',
  },
  {
    _id: 4,
    productName: 'RODE Wireless Go II',
    productDescription: 'RODE Wireless Go II',
    shopName: 'RODE Wireless',
    quantity: 1,
    orderDate: '15-06-2024, 11:00 am',
    orderStatus: 'Delivered 28 June',
    productPrice: 1020,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3298/64c9efa8b811c.jpeg',
  },
  {
    _id: 5,
    productName: 'JBL CLIP 4 ECO',
    productDescription:
      'New innovative, eco-friendly design—same big audio performance. Help make the world a little greener with a must-have accessory for your next outing, made from up to 90% post-consumer recycled plastic and wrapped in 100% recycled fabric on the speaker grille. The vibrant fresh looking JBL Clip 4 Eco delivers surprisingly rich JBL Original Pro Sound in a compact package. The unique oval shape fits easy in your hand. The fully integrated carabiner hooks instantly to bags, belts, or buckles, to bring your favorite tunes anywhere. Waterproof, dustproof, and up to 10 hours of playtime, it’s rugged enough to tag along wherever you explore.',
    shopName: 'JBL Store',
    productPrice: 4599,
    orderDate: '15-06-2024, 11:00 am',
    quantity: 1,
    orderStatus: 'Delivered 14 June',
    imageUrl:
      'https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw36d9e6db/JBL_FlipEssential_Hero_005_x1.png?sw=320&sh=320',
  },
  {
    _id: 6,
    productName: 'Aputure LS 300X BI - Color LED Moonlight',
    productDescription: 'Aputure LS 300X BI - Color LED Moonlight',
    shopName: 'Zeb home appliances',
    quantity: 6,
    orderStatus: 'Ready to delivery',
    productPrice: 97000,
    orderDate: '15-06-2024, 11:00 am',
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3296/64c9efa88ed19.jpeg',
  },
  {
    _id: 7,
    productName: 'JBL FLIP ESSENTIAL 2',
    productDescription:
      'Take your tunes on the go with the powerful JBL Flip Essential 2. Our lightweight Bluetooth speaker goes anywhere. Bad weather? Not to worry. With its waterproof design, you can rock out to our JBL Original Pro Sound rain or shine. Enjoy up to 10 hours of playtime for your favorite music.',
    shopName: 'JBL Store',
    quantity: 1,
    orderStatus: 'Delivered today',
    orderDate: '15-06-2024, 11:00 am',
    productPrice: 6599,
    imageUrl:
      'https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwddea8c6c/1_JBL_FLIP6_HERO_BLACK_29391_x2.png?sw=320&sh=320',
  },
  {
    _id: 8,
    productName:
      'Sound with Cordless Mic Power & Battery Backup for Video Song Shoot',
    productDescription:
      'Sound with Cordless Mic Power & Battery Backup for Video Song Shoot',
    shopName: 'RODE Wireless',
    quantity: 3,
    orderDate: '15-06-2024, 11:00 am',
    orderStatus: 'Delivered 31 May',
    productPrice: 5600,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3194/64be6227d2f0e.jpeg',
  },
  {
    _id: 9,
    productName: 'RODE Wireless Go II',
    productDescription: 'RODE Wireless Go II',
    shopName: 'RODE Wireless',
    quantity: 3,
    orderDate: '15-06-2024, 11:00 am',
    orderStatus: 'Delivered 27 May',
    productPrice: 1020,
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3298/64c9efa8b811c.jpeg',
  },
  {
    _id: 10,
    productName: 'JBL CLIP 4 ECO',
    productDescription:
      'New innovative, eco-friendly design—same big audio performance. Help make the world a little greener with a must-have accessory for your next outing, made from up to 90% post-consumer recycled plastic and wrapped in 100% recycled fabric on the speaker grille. The vibrant fresh looking JBL Clip 4 Eco delivers surprisingly rich JBL Original Pro Sound in a compact package. The unique oval shape fits easy in your hand. The fully integrated carabiner hooks instantly to bags, belts, or buckles, to bring your favorite tunes anywhere. Waterproof, dustproof, and up to 10 hours of playtime, it’s rugged enough to tag along wherever you explore.',
    shopName: 'JBL Store',
    quantity: 1,
    orderDate: '15-06-2024, 11:00 am',
    orderStatus: 'Delivered 1 June',
    productPrice: 4599,
    imageUrl:
      'https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw36d9e6db/JBL_FlipEssential_Hero_005_x1.png?sw=320&sh=320',
  },
  {
    _id: 11,
    productName: 'Aputure LS 300X BI - Color LED Moonlight',
    productDescription: 'Aputure LS 300X BI - Color LED Moonlight',
    shopName: 'Hiffin',
    quantity: 1,
    orderDate: '15-06-2024, 11:00 am',
    productPrice: 97000,
    orderStatus: 'Delivered 16 May',
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3296/64c9efa88ed19.jpeg',
  },
  {
    _id: 12,
    productName: 'Camera Multi Setup',
    productDescription: 'Camera Multi Setup',
    quantity: 1,
    orderDate: '15-06-2024, 11:00 am',
    shopName: 'Generic',
    productPrice: 25000,
    orderStatus: 'Delivered 13 May',
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3196/64be6227f3d98.jpeg',
  },
  {
    _id: 13,
    productName: 'Drone with Operator Phantom 4 Pro with Live',
    productDescription: 'Drone with Operator Phantom 4 Pro with Live.',
    quantity: 1,
    orderDate: '15-06-2024, 11:00 am',
    productPrice: 5000,
    shopName: 'TP Plus',
    orderStatus: 'Delivered 18 May',
    imageUrl:
      'https://rentit4me.com/assets/frontend/images/listings/post-3198/64be62282081e.jpeg',
  },
];

const categorySound = [
  {
    label: 'Speaker Maximum Output Power',
    value: 'Speaker Maximum Output Power',
  },
  {label: 'Connectivity Technology', value: 'Connectivity Technology'},
  {label: 'Mounting Type', value: 'Mounting Type'},
  {label: 'Speaker Type', value: 'Speaker Type'},
  {label: 'Special Feature', value: 'Special Feature'},
  {
    label: 'Recommended Uses For Product',
    value: 'Recommended Uses For Product',
  },
  {label: 'Compatible Devices', value: 'Compatible Devices'},
  {label: 'Colour', value: 'Colour'},
  {label: 'Included Components', value: 'Included Components'},
  {label: 'Power Source', value: 'Power Source'},
  {label: 'Wattage', value: 'Wattage'},
  {label: 'Batteries Included', value: 'Batteries Included'},
  {label: 'Battery Life', value: 'Battery Life'},
  {label: 'Charging Type', value: 'Charging Type'},
];

const categoryLightings = [
  {label: 'Colour', value: 'Colour'},
  {label: 'Indoor/Outdoor Usage', value: 'Indoor/Outdoor Usage'},
  {label: 'Special Feature', value: 'Special Feature'},
  {label: 'Light Source Type', value: 'Light Source Type'},
  {label: 'Power Source', value: 'Power Source'},
  {label: 'Light Colour', value: 'Light Colour'},
  {label: 'Number of Light Sources', value: 'Number of Light Sources'},
  {label: 'Voltage', value: 'Voltage'},
  {label: 'Bulb Shape Size', value: 'Bulb Shape Size'},
  {label: 'Wattage', value: 'Wattage'},
  {label: 'Included Components', value: 'Included Components'},
  {label: 'Controller Type', value: 'Controller Type'},
  {label: 'Shade Colour', value: 'Shade Colour'},
  {label: 'Occasion', value: 'Occasion'},
  {
    label: 'Recommended Uses For Product',
    value: 'Recommended Uses For Product',
  },
];

const categoryVideo = [
  {label: 'Equipment Type', value: 'Equipment Type'},
  {label: 'Resolution', value: 'Resolution'},
  {label: 'Connectivity', value: 'Connectivity'},
  {label: 'Display Type', value: 'Display Type'},
  {label: 'Power Source', value: 'Power Source'},
  {
    label: 'Recommended Uses For Product',
    value: 'Recommended Uses For Product',
  },
  {label: 'Voltage', value: 'Voltage'},
  {label: 'Wattage', value: 'Wattage'},
  {label: 'Included Components', value: 'Included Components'},
  {label: 'Controller Type', value: 'Controller Type'},
  {label: 'Special Feature', value: 'Special Feature'},
];

const categoryGenSet = [
  {label: 'Wattage', value: 'Wattage'},
  {label: 'Fuel Type', value: 'Fuel Type'},
  {
    label: 'Recommended Uses For Product',
    value: 'Recommended Uses For Product',
  },
  {label: 'Power Source', value: 'Power Source'},
  {label: 'Voltage', value: 'Voltage'},
  {label: 'Output Wattage', value: 'Output Wattage'},
  {label: 'Special Feature', value: 'Special Feature'},
  {label: 'Engine Type', value: 'Engine Type'},
  {label: 'Tank Volume', value: 'Tank Volume'},
  {label: 'Total Power Outlets', value: 'Total Power Outlets'},
  {label: 'Frequency', value: 'Frequency'},
  {label: 'Engine Power Maximum', value: 'Engine Power Maximum'},
  {label: 'Starting Wattage', value: 'Starting Wattage'},
  {label: 'Running Wattage', value: 'Running Wattage'},
  {label: 'Colour', value: 'Colour'},
];

export {
  productList,
  vendor,
  priceFilter,
  sliderImage,
  allProducts,
  bookingHistory,
  addsOnProducts,
  categorySound,
  categoryLightings,
  categoryVideo,
  categoryGenSet,
};
