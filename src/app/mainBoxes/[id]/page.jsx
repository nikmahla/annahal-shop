
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetail({ params }) {
  const { id } = params;
  if (!id) notFound();

  const res = await fetch(
    `https://66dee1fdde4426916ee2c7b3.mockapi.io/HonyShop/${encodeURIComponent(id)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) notFound();

  const product = await res.json();
  return <ProductDetailClient product={product} />;
}
