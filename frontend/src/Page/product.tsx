/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productItems from '../data/api-data/productItem';
import { Pagination } from '../Component/Pagination';

interface ProductData {
  item_no: number;
  item_name: string;
  detail_image_url: string;
  price: number;
  score: number;
}

type GetProductData = () => Promise<ProductData[]>;

// eslint-disable-next-line @typescript-eslint/return-await
const mockFetchProduct: GetProductData = async () => await productItems;

const mockFetchProductV2 = async (pageNumber: number): Promise<ProductData[]> => {
  const items = await productItems;
  return items.sort((a, b) => b.score - a.score).slice((pageNumber - 1) * 5, pageNumber * 5);
};

// eslint-disable-next-line arrow-body-style
const ProductCard = ({ item }: { item: ProductData }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={item.detail_image_url}
          alt={item.item_name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex flex-col justify-between lg:h-16">
        <div>
          <h3 className="text-sm text-gray-700">{item.item_name}</h3>
        </div>
        <div className="ml-auto">
          <p className="text-sm font-medium text-gray-900">{`${item.price} 원`}</p>
        </div>
        <div className="ml-auto">
          <p className="text-xs font-medium text-gray-900">담기</p>
          <span className="text-xs font-medium text-gray-900">{item.score}</span>
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);

  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();
  const page = query.get('page');
  const initialPageNumber = page ? parseInt(page, 10) : 1;
  const pageNumber = initialPageNumber;

  useEffect(() => {
    const getProductData = async () => {
      const data = await mockFetchProductV2(pageNumber);
      setProductData(data);
    };
    getProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageNumber]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shopping List</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productData.map((item) => (
            <ProductCard key={item.item_no} item={item} />
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default ProductPage;
