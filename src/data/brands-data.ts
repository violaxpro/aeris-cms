export type BrandType = {
  id?: number | string | undefined
  name: string;
  status?: boolean
  discount_percent?: number
  meta_title?: string;
  meta_description?: string;
  url_banner?: string;
  url_logo: string
  createdAt?: string | undefined
};

export type BrandsProps = {
  id: string;
  logo: string;
  brandsName: string;
  status: string;
  createdAt: string;
};

export const brandsData: BrandsProps[] = [
  {
    id: '1',
    logo: 'https://picsum.photos/200/300?random=1',
    brandsName: 'Nike',
    status: 'active',
    createdAt: '2022-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    logo: 'https://picsum.photos/200/300?random=2',
    brandsName: 'Adidas',
    status: 'active',
    createdAt: '2022-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    logo: 'https://picsum.photos/200/300?random=3',
    brandsName: 'Lacoste',
    status: 'inactive',
    createdAt: '2022-01-03T00:00:00.000Z',
  },
  {
    id: '4',
    logo: 'https://picsum.photos/200/300?random=4',
    brandsName: 'Puma',
    status: 'active',
    createdAt: '2022-01-04T00:00:00.000Z',
  },
  {
    id: '5',
    logo: 'https://picsum.photos/200/300?random=5',
    brandsName: 'Reebok',
    status: 'inactive',
    createdAt: '2022-01-05T00:00:00.000Z',
  },
  {
    id: '6',
    logo: 'https://picsum.photos/200/300?random=6',
    brandsName: 'Under Armour',
    status: 'active',
    createdAt: '2022-01-06T00:00:00.000Z',
  },
  {
    id: '7',
    logo: 'https://picsum.photos/200/300?random=7',
    brandsName: 'New Balance',
    status: 'inactive',
    createdAt: '2022-01-07T00:00:00.000Z',
  },
  {
    id: '8',
    logo: 'https://picsum.photos/200/300?random=8',
    brandsName: 'Asics',
    status: 'active',
    createdAt: '2022-01-08T00:00:00.000Z',
  },
  {
    id: '9',
    logo: 'https://picsum.photos/200/300?random=9',
    brandsName: 'Fila',
    status: 'inactive',
    createdAt: '2022-01-09T00:00:00.000Z',
  },
  {
    id: '10',
    logo: 'https://picsum.photos/200/300?random=10',
    brandsName: 'Converse',
    status: 'active',
    createdAt: '2022-01-10T00:00:00.000Z',
  },
];
