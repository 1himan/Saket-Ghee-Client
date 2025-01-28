import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";

export function CarouselDefault({ delay }: { delay: number }) {
  return (
    <Carousel
      autoplay={true}
      autoplayDelay={delay}
      loop={true}
      className="rounded-xl w-96 h-96"
    >
      {/* <div>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          onClick={() => {}}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </IconButton>
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={() => {}}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </IconButton>
      </div> */}
      <Image
        width={1000}
        height={1000}
        src="/images/mini-carousel/image.png"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <Image
        width={1000}
        height={1000}
        src="/images/mini-carousel/image1.png"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <Image
        width={1000}
        height={1000}
        src="/images/mini-carousel/image2.png"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
