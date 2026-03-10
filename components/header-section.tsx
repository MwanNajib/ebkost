import Image from "next/image";

const HeaderSection = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <header className="relative h-[300px] md:h-[350px] text-white overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        {/* Note if the background is taking too long to load, use priority={true} */}
        <Image
          src="/hero.png"
          alt="Header Background"
          fill
          className="object-cover object-center w-full h-full scale-105"
          priority
        />
        {/* Soft, rich gradient overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-orange-900/10 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 lg:px-8 pt-10">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 drop-shadow-sm">
            {title}
          </h1>
          <div className="w-20 h-1.5 bg-orange-500 rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-200 font-medium tracking-wide drop-shadow-sm">
            {subTitle}
          </p>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
