import { getUserDataByCustomDomainTest } from '@/actions/getUserDataByCustomDomain';

interface Props {
  params: {
    customDomain: string;
  };
}

/**
 * A page component that retrieves user data by custom domain.
 *
 * @param props - The parameters for the user page.
 * @returns The rendered user data.
 */
export default async function UserPage({ params }: Props) {
  const { customDomain } = params;

  const userData = await getUserDataByCustomDomainTest(customDomain);

  const response = JSON.parse(userData);

  return (
    <div>
      <h1>User data by custom domain</h1>
      <p>Custom domain: {customDomain}</p>
      <p>User data: {response.email}</p>
    </div>
  )
}