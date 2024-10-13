
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import config from '@/config';

export const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const PricingCard: React.FC<{
    title: string;
    subtitle?: string;
    price: string;
    features: string[];
    buttonText: string;
    isPro?: boolean;
  }> = ({ title, price, features, buttonText, isPro, subtitle = false }) => (
    <motion.div
      variants={itemVariants}
      className={`bg-white dark:bg-zinc-950 rounded-lg shadow-lg p-6 flex flex-col border border-black/30 dark:border-white/30 hover:shadow-2xl transition-shadow duration-300 ease-in-out  ${
        isPro ? 'border-2 border-blue-500 dark:border-blue-500' : ''
      }`}
    >
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{price}</p>
      <span className='text-sm mb-6 text-zinc-400'>{subtitle}</span>
      <ul className="mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2 text-gray-600 dark:text-gray-300">
            <Check className="w-5 h-5 mr-2 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <button
  className={`py-2 px-4 rounded-full font-bold transition duration-300 transform ${
    isPro
      ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
      : 'bg-zinc-950 dark:bg-zinc-50 text-white hover:bg-zinc-700 dark:text-black dark:hover:bg-gray-600'
  }`}
>
  {buttonText}
</button>
    </motion.div>
  );

  return (
    <section className="py-16">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Pricing
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
                title="Free"
                subtitle='Try it out for free'
                price="0€"
                features={[
                    "Landing page",
                    "Domain name",
                    "Access to 2 content blocks",
                    "1 Style customizations",
                ]}
                buttonText="Get Started"
            />
            <PricingCard
                title="Pro"
                subtitle="Most popular, one-time payment"
                price={config.lemonsqueezy.price}
                features={[
                    "Landing page",
                    "Domain name",
                    "Custom templates",
                    "Access to 8 content blocks",
                    "100 Block limit",
                    "4 Style customizations",
                    "All future updates",
                ]}
                buttonText="Upgrade to Pro 🚀"
                isPro={true}
            />
        </div>
      </motion.div>
    </section>
  );
};
