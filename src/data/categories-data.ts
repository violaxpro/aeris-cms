export type CategoryType = {

  name: string
  slug?: string
  meta_title: string,
  meta_description: string,
  page_description: string,
  url_logo: string
  url_banner: string
  show_in_search: boolean
  show_in_page: boolean
  enabled: boolean
  status?: boolean
}


export type CategoriesProps = {
  subCategories: {
    id: string;
    images: string;
    categoriesName: string;
    description: string;
    status: string;
  };
  id: string;
  images: string;
  categoriesName: string;
  description: string;
  status: string;
};

export const categoriesData: CategoriesProps[] = [
  {
    id: '1',
    images: 'https://example.com/image1.jpg',
    categoriesName: 'Electronics',
    description: 'High-quality electronic gadgets',
    status: 'active',
    subCategories: {
      id: '1-1',
      images: 'https://example.com/subimage1.jpg',
      categoriesName: 'Mobile Phones',
      description: 'Latest mobile phones',
      status: 'active',
    },
  },
  {
    id: '2',
    images: 'https://example.com/image2.jpg',
    categoriesName: 'Fashion',
    description: 'Trendy fashion items',
    status: 'active',
    subCategories: {
      id: '2-1',
      images: 'https://example.com/subimage2.jpg',
      categoriesName: "Men's Clothing",
      description: "Stylish men's clothing",
      status: 'active',
    },
  },
  {
    id: '3',
    images: 'https://example.com/image3.jpg',
    categoriesName: 'Home Appliances',
    description: 'Durable home appliances',
    status: 'active',
    subCategories: {
      id: '3-1',
      images: 'https://example.com/subimage3.jpg',
      categoriesName: 'Kitchen Appliances',
      description: 'Essential kitchen appliances',
      status: 'active',
    },
  },
  {
    id: '4',
    images: 'https://example.com/image4.jpg',
    categoriesName: 'Books',
    description: 'Wide range of books',
    status: 'active',
    subCategories: {
      id: '4-1',
      images: 'https://example.com/subimage4.jpg',
      categoriesName: 'Fiction',
      description: 'Best-selling fiction books',
      status: 'active',
    },
  },
  {
    id: '5',
    images: 'https://example.com/image5.jpg',
    categoriesName: 'Toys',
    description: 'Fun and educational toys',
    status: 'active',
    subCategories: {
      id: '5-1',
      images: 'https://example.com/subimage5.jpg',
      categoriesName: 'Educational Toys',
      description: 'Toys that teach',
      status: 'active',
    },
  },
  {
    id: '6',
    images: 'https://example.com/image6.jpg',
    categoriesName: 'Sports',
    description: 'Sports equipment and apparel',
    status: 'active',
    subCategories: {
      id: '6-1',
      images: 'https://example.com/subimage6.jpg',
      categoriesName: 'Outdoor Sports',
      description: 'Gear for outdoor sports',
      status: 'active',
    },
  },
  {
    id: '7',
    images: 'https://example.com/image7.jpg',
    categoriesName: 'Automotive',
    description: 'Automotive accessories',
    status: 'active',
    subCategories: {
      id: '7-1',
      images: 'https://example.com/subimage7.jpg',
      categoriesName: 'Car Accessories',
      description: 'Essential car accessories',
      status: 'active',
    },
  },
  {
    id: '8',
    images: 'https://example.com/image8.jpg',
    categoriesName: 'Beauty',
    description: 'Beauty and skincare products',
    status: 'active',
    subCategories: {
      id: '8-1',
      images: 'https://example.com/subimage8.jpg',
      categoriesName: 'Skincare',
      description: 'Top skincare products',
      status: 'active',
    },
  },
  {
    id: '9',
    images: 'https://example.com/image9.jpg',
    categoriesName: 'Groceries',
    description: 'Daily groceries',
    status: 'active',
    subCategories: {
      id: '9-1',
      images: 'https://example.com/subimage9.jpg',
      categoriesName: 'Organic Foods',
      description: 'Organic and healthy foods',
      status: 'active',
    },
  },
  {
    id: '10',
    images: 'https://example.com/image10.jpg',
    categoriesName: 'Furniture',
    description: 'Stylish furniture items',
    status: 'active',
    subCategories: {
      id: '10-1',
      images: 'https://example.com/subimage10.jpg',
      categoriesName: 'Living Room Furniture',
      description: 'Comfortable living room furniture',
      status: 'active',
    },
  },
  {
    id: '11',
    images: 'https://example.com/image11.jpg',
    categoriesName: 'Garden',
    description: 'Garden tools and accessories',
    status: 'active',
    subCategories: {
      id: '11-1',
      images: 'https://example.com/subimage11.jpg',
      categoriesName: 'Garden Furniture',
      description: 'Furniture for your garden',
      status: 'active',
    },
  },
  {
    id: '12',
    images: 'https://example.com/image12.jpg',
    categoriesName: 'Pet Supplies',
    description: 'Everything for your pet',
    status: 'active',
    subCategories: {
      id: '12-1',
      images: 'https://example.com/subimage12.jpg',
      categoriesName: 'Dog Supplies',
      description: 'Supplies for dogs',
      status: 'active',
    },
  },
  {
    id: '13',
    images: 'https://example.com/image13.jpg',
    categoriesName: 'Stationery',
    description: 'Office and school supplies',
    status: 'active',
    subCategories: {
      id: '13-1',
      images: 'https://example.com/subimage13.jpg',
      categoriesName: 'Writing Supplies',
      description: 'Pens, pencils, and more',
      status: 'active',
    },
  },
  {
    id: '14',
    images: 'https://example.com/image14.jpg',
    categoriesName: 'Music',
    description: 'Musical instruments and accessories',
    status: 'active',
    subCategories: {
      id: '14-1',
      images: 'https://example.com/subimage14.jpg',
      categoriesName: 'Guitars',
      description: 'Acoustic and electric guitars',
      status: 'active',
    },
  },
  {
    id: '15',
    images: 'https://example.com/image15.jpg',
    categoriesName: 'Photography',
    description: 'Cameras and photography gear',
    status: 'active',
    subCategories: {
      id: '15-1',
      images: 'https://example.com/subimage15.jpg',
      categoriesName: 'DSLR Cameras',
      description: 'Digital SLR cameras and accessories',
      status: 'active',
    },
  },
  {
    id: '16',
    images: 'https://example.com/image16.jpg',
    categoriesName: 'Jewelry',
    description: 'Exquisite jewelry items',
    status: 'active',
    subCategories: {
      id: '16-1',
      images: 'https://example.com/subimage16.jpg',
      categoriesName: 'Necklaces',
      description: 'Beautiful necklaces',
      status: 'active',
    },
  },
  {
    id: '17',
    images: 'https://example.com/image17.jpg',
    categoriesName: 'Health',
    description: 'Health and wellness products',
    status: 'active',
    subCategories: {
      id: '17-1',
      images: 'https://example.com/subimage17.jpg',
      categoriesName: 'Vitamins',
      description: 'Vitamins and supplements',
      status: 'active',
    },
  },
  {
    id: '18',
    images: 'https://example.com/image18.jpg',
    categoriesName: 'Footwear',
    description: 'Shoes for all occasions',
    status: 'active',
    subCategories: {
      id: '18-1',
      images: 'https://example.com/subimage18.jpg',
      categoriesName: 'Sneakers',
      description: 'Comfortable and stylish sneakers',
      status: 'active',
    },
  },
  {
    id: '19',
    images: 'https://example.com/image19.jpg',
    categoriesName: 'Luggage',
    description: 'Travel bags and suitcases',
    status: 'active',
    subCategories: {
      id: '19-1',
      images: 'https://example.com/subimage19.jpg',
      categoriesName: 'Suitcases',
      description: 'Durable suitcases for travel',
      status: 'active',
    },
  },
  {
    id: '20',
    images: 'https://example.com/image20.jpg',
    categoriesName: 'Office Supplies',
    description: 'Essentials for your office',
    status: 'active',
    subCategories: {
      id: '20-1',
      images: 'https://example.com/subimage20.jpg',
      categoriesName: 'Desk Accessories',
      description: 'Accessories for your desk',
      status: 'active',
    },
  },
];
