import Image from 'next/image';
import config from '@/config';
import { Star } from 'lucide-react';

type RefType = {
  id: string;
  ariaLabel?: string;
  svg?: React.ReactNode;
};

type Testimonial = {
  username?: string;
  name: string;
  text: string;
  type?: RefType;
  link?: string;
  img?: string;
  rating: number;
  featured?: boolean;
};

const refTypes: { [key: string]: RefType } = {
  productHunt: {
    id: 'product_hunt',
    ariaLabel: 'See user review on Product Hunt',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26.245 26.256"
        className="w-[18px] h-[18px]"
      >
        <path
          d="M26.254 13.128c0 7.253-5.875 13.128-13.128 13.128S-.003 20.382-.003 13.128 5.872 0 13.125 0s13.128 5.875 13.128 13.128"
          fill="#da552f"
        />
        <path
          d="M14.876 13.128h-3.72V9.2h3.72c1.083 0 1.97.886 1.97 1.97s-.886 1.97-1.97 1.97m0-6.564H8.53v13.128h2.626v-3.938h3.72c2.538 0 4.595-2.057 4.595-4.595s-2.057-4.595-4.595-4.595"
          fill="#fff"
        />
      </svg>
    ),
  },
  twitter: {
    id: 'twitter',
    ariaLabel: 'See user post on Twitter',
    svg: (
      <svg
        className="w-5 h-5 fill-[#00aCee]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
      </svg>
    ),
  },
  instagram: {
    id: 'instagram',
    ariaLabel: 'See user post on Instagram',
    svg: (
      <svg
        className="w-5 h-5 fill-[#E4405F]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    ),
  },
  whatsapp: {
    id: 'whatsapp',
    ariaLabel: 'See user post on WhatsApp',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 448 512" 
      className="w-5 h-5 fill-[#25D366]"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    ),
  },

  other: { id: 'other' },
};

const list: Testimonial[] = [
  {
    username: 'emma7328',
    name: 'Emma Jones',
    text: "The best platform I've used to create my online CV! The custom domain feature is a game changer. It’s so much better than sending a PDF.",
    type: refTypes.whatsapp,
    link: 'https://twitter.com/emma_jones',
    img: '',
    rating: 5,
  },
  {
    username: 'john_tech',
    name: 'John Smith',
    text: 'Honestly, it took me less than 30 minutes to set up my page, and it looks amazing. The style customizations are simple but powerful!',
    type: refTypes.productHunt,
    link: 'https://www.producthunt.com/products/cvpage/reviews',
    img: '',
    rating: 5,
  },
  {
    username: 'anna_',
    name: 'Anna Lee',
    text: 'I loved how easy it was to use! I can showcase my projects and skills in a way that’s much more professional than a regular resume. ',
    type: refTypes.instagram,
    link: 'https://twitter.com/anna_l',
    img: '',
    rating: 4,
  },
  {
    username: 'dev_mark',
    name: 'Mark Williams',
    text: 'I’ve tried other CV platforms, but cvpage.to is by far the most straightforward. The one-time payment is a huge plus, and I love the custom blocks.',
    type: refTypes.productHunt,
    link: 'https://www.producthunt.com/users/dev_mark',
    img: '',
    rating: 5,
  },
  {
    username: 'tcsara44',
    name: 'Sara Ahmed',
    text: 'Super intuitive! The ability to tweak and update my CV anytime is great. It’s perfect for someone like me who’s always working on new projects.',
    type: refTypes.instagram,
    link: 'https://twitter.com/techgirl_sara',
    img: '',
    rating: 5,
    featured: true,
  },

];

const TestimonialCard: React.FC<{ testimonial: Testimonial}> = ({
  testimonial,
}) => (
  <li className={testimonial.featured ? 'md:col-span-2 border rounded-lg bg-white dark:bg-gray-950 shadow-md' : 'border rounded-lg bg-white dark:bg-gray-950 shadow-md'}>
    <figure className={`relative h-full p-6 bg-base-100 rounded-lg ${testimonial.featured  ? 'md:p-8' : ''}`}>
      <blockquote className="relative">
        <p className={`text-base-content/80 text-zinc-700 dark:text-zinc-300 ${testimonial.featured  ? 'md:text-lg' : 'text-sm'}`}>
          {testimonial.text}
        </p>
      </blockquote>
      <figcaption className="relative flex items-center justify-start gap-4 pt-4 mt-4 border-t border-base-content/5">
        <div className="overflow-hidden rounded-full bg-base-300 shrink-0">
          {testimonial.img ? (
            <Image
              className={`rounded-full object-cover ${testimonial.featured  ? 'md:w-12 md:h-12' : 'w-10 h-10'}`}
              src={testimonial.img}
              alt={`${testimonial.name}'s testimonial for ${config.appName}`}
              width={testimonial.featured  ? 48 : 40}
              height={testimonial.featured  ? 48 : 40}
            />
          ) : (
            <span
              className={`rounded-full flex justify-center items-center text-lg font-medium bg-base-300 ${
                testimonial.featured  ? 'md:w-12 md:h-12' : 'w-10 h-10'
              }`}
            >
              {testimonial.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="w-full flex items-end justify-between gap-2">
          <div>
            <div className={`font-medium text-base-content ${testimonial.featured  ? 'md:text-lg' : 'text-sm'}`}>
              {testimonial.name}
            </div>
            {testimonial.username && (
              <div
                className={`text-base-content/80 ${testimonial.featured  ? 'md:text-base' : 'mt-0.5 text-sm'}`}
              >
                @{testimonial.username}
              </div>
            )}
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          {testimonial.link && testimonial.type?.svg && (
            <a
              href={testimonial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
              aria-label={testimonial.type?.ariaLabel}
            >
              {testimonial.type?.svg}
            </a>
          )}
        </div>
      </figcaption>
    </figure>
  </li>
);

const Testimonials: React.FC = () => {
  return (
    <section className="bg-base-200" id="testimonials">
      <div className="py-24 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="sm:text-5xl text-4xl font-extrabold text-base-content mb-4">
            What People Say
          </h2>
          <p className="lg:w-2/3 mx-auto text-xl text-base-content/80">
            Don&apos;t take our word for it. Here&apos;s what they have to say about {config.appName}.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
