
import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";

const galleryItems = [
  {
    title: "Winter Clothes Distribution",
    category: "Winter Relief",
    description: "Sharing warmth and kindness with families in need.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAyb6tY0cT6edMsALq1tESqehW_yUBx0BWoNFu74wTMVjBiRHWI2vP1lZ&s=1024  ",
    size: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Food for Everyone",
    category: "Food Support",
    description: "A little help can make a big difference.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433",
    size: "",
  },
  {
    title: "Growing a Greener Future",
    category: "Tree Plantation",
    description: "Together for a greener tomorrow.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
    size: "",
  },
  {
    title: "A Cleaner Community",
    category: "Clean Up",
    description: "Small actions create a cleaner world.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjQj7bezk5GwXNDBL4i5_mSysMp_mpLd3ed6M9mDRNxw&s=1024",
    size: "",
  },
  {
    title: "Education for All",
    category: "Education",
    description: "Empowering the next generation.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    size: "lg:col-span-2",
  },
];

const GallerySection = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8faf7] py-20 md:py-28">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-[#34765a]">
              <Heart size={15} className="fill-green-600" />
              Stories of Kindness
            </div>

            <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#263b30] sm:text-4xl md:text-5xl">
              Small Actions,
              <span className="text-[#34765a]"> Big Changes.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Every moment tells a story. Explore the beautiful memories
              of people coming together to make our community better.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-sm font-semibold text-[#34765a] md:flex">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            Together we make a difference
          </div>
        </div>

        {/* Bento Gallery */}
        <div className="grid auto-rows-[250px] grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[230px] lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-3xl bg-gray-200 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${item.size}`}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                priority={index === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Category */}
              <div className="absolute left-5 top-5">
                <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              {/* Arrow */}
              <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={20} />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="mb-2 block text-xs font-medium tracking-wider text-green-300">
                  0{index + 1} / COMMUNITY MOMENT
                </span>

                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-green-100 pt-7 sm:flex-row">
          <p className="text-sm text-gray-500">
            Every picture represents a little act of kindness.
          </p>

          <p className="text-sm font-bold tracking-wide text-[#34765a]">
            KINDNEST — SPREAD KINDNESS ❤️
          </p>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
