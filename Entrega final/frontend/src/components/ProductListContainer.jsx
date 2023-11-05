import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from './Spinner';
import useFetch from '../hooks/useFetch';
import { ProductList } from './ProductList';
export const ProductListContainer = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  let apiUrl = `http://localhost:9090/api/products?query=true`;
  if (category !== undefined) apiUrl = `http://localhost:9090/api/products?query=${category}`;

  const searchParams = new URLSearchParams(location.search)

  if (searchParams.get('page') !== null) {
    apiUrl += `&page=${searchParams.get('page')}`
  }

  if (searchParams.get('limit') !== null) {
    apiUrl += `&limit=${searchParams.get('limit')}`
  }

  if (searchParams.get('sort') !== null) {
    apiUrl += `&sort=${searchParams.get('sort')}`
  }

  const { data, isLoading, error } = useFetch(apiUrl);

  const handlePriceSortChange = (newSortOrder) => {
    searchParams.set('sort', newSortOrder);
    navigate({ search: searchParams.toString() });
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='container mx-auto mt-5'>
      <div className='w-full flex justify-end my-5 gap-5 text-myDarkColor'>
        <button className={`btn btn-sm ${searchParams.get('sort') === 'undefined' ? 'bg-myLightGreen' : ''}`} onClick={() => handlePriceSortChange('undefined')}>Default</button>
        <button className={`btn btn-sm ${searchParams.get('sort') === 'asc' ? 'bg-myLightGreen' : ''}`} onClick={() => handlePriceSortChange('asc')}>Price Asc</button>
        <button className={`btn btn-sm ${searchParams.get('sort') === 'desc' ? 'bg-myLightGreen' : ''}`} onClick={() => handlePriceSortChange('desc')}>Price Desc</button>
      </div>
      <ProductList products={data.payload.products} pagination={data.payload} />
    </div>
  );
};

export default ProductListContainer;
