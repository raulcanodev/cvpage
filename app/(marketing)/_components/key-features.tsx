import { Card, CardContent } from '@/components/ui/card';
import { Link, Zap, Shield } from 'lucide-react';

export default function KeyFeatures() {

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Key Features
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Link className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Custom URL</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Get your own personalized hitme.to link to share with your audience.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Zap className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 p-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Easy Setup</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Create your page in minutes with our intuitive dashboard.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Shield className="h-12 w-12 rounded-full bg-green-100 text-green-600 p-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Secure & Reliable
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Your data is always safe and your page is always online.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
