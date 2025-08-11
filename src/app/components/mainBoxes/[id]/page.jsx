// export default async function ProductDetail({ params }) {
//   const { id } = params;

//   const res = await fetch(
//     `https://66dee1fdde4426916ee2c7b3.mockapi.io/HonyShop/${id}`,
//     { cache: 'no-store' }
//   );

//   console.log('fetch status:', res.status); // add this to check status

//   if (!res.ok) {
//     return <div>Product not found.</div>;
//   }

//   const product = await res.json();

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>{product.name}</h1>
//       <img src={product.avatar} alt={product.name} style={{ maxWidth: '100%' }} />
//       <p>Price: ${product.priceR}</p>
//     </div>
//   );
// }


export default function ProductDetail({ params }) {
  return (
    <div>
      <h1>Product Detail for ID: {params.id}</h1>
    </div>
  );
}
