import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-20 md:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-amber-100">
          Kingdom Threads
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300 mb-4 max-w-3xl mx-auto">
          Reverent, Biblical apparel and art for those who bear witness to Christ.
        </p>
        <p className="text-lg text-neutral-400 mb-12 italic">
          He died for us; we live for Him.
        </p>
        <Link
          href="/products"
          className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded-md text-lg font-medium transition-colors"
        >
          Shop the Collection
        </Link>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-neutral-200">
            Wear Your Faith with Reverence
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-6">
            Every piece is crafted to honor the sacrifice of Christ and inspire daily devotion. We create apparel and art that speaks truth without compromise, designed for believers who walk humbly with their God.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            From the empty tomb to the throne room, our designs reflect the beauty of redemption and the call to holy living. Wear the gospel. Live the gospel.
          </p>
        </div>
      </section>
    </div>
  );
}
