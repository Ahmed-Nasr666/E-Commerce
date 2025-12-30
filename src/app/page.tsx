import Link from "next/link";
export default function Home() {
  return <>

    <main className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to <span className="text-black">ShopMart</span>
        </h1>


        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>


        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={'/products'}>
          <button className="bg-black cursor-pointer text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition">
            Shop Now
          </button>
          </Link>

          <Link href={'/categories'}>
          <button className="border cursor-pointer border-black px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
            Browse Categories
          </button>
          </Link>
        </div>
      </div>
    </main>


  </>
}
