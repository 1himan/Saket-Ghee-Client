import { Carousel, Typography } from "@material-tailwind/react";

export function HomeCarousel(): JSX.Element {
  return (
    <Carousel
      className="overflow-hidden"
      loop={true}
      autoplay={true}
      autoplayDelay={3000}
    >
      <div className="relative h-96 w-full">
        <img
          src="/saket1.jpg"
          alt="image 1"
          className="h-96 w-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-end h-96 w-full bg-black/30">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-xl md:text-2xl lg:text-3xl font-sassoon"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 text-md font-sassoon"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-96 w-full">
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-96 w-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-end h-96 w-full bg-black/30 text-center">
          <div className="w-3/4 md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-xl md:text-2xl lg:text-3xl font-sassoon"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 text-md font-sassoon"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-96 w-full">
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 2"
          className="h-96 w-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-end h-96 w-full bg-black/30 text-center">
          <div className="w-3/4 md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-xl md:text-2xl lg:text-3xl font-sassoon"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 text-md font-sassoon"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
