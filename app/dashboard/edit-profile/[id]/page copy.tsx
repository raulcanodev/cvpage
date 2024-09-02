import { fetchUserByCustomDomain } from '@/lib/mongodb'; // Function to get the user
import { authOptions } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

interface Props {
  params: {
    id: string;
  };
}

interface ProfileFormProps {
  initialData: {
    email: string;
    name: string;
    description: string;
    customDomain: string;
    phone: string;
    profileImage: string;
    services: string[];
  };
}

export default async function EditUserPage({ params }: Props) {
  const { id } = params;

  // Get the current user's session
  const session = await getServerSession(authOptions); // Not allowed in front-end code
  const currentUserId = session?.user?._id; // Not allowed in front-end code

  if (!currentUserId) {
    // Redirect to the login page if there is no session
    redirect('/login');
  }

  // Get the user by ID
  // const user = await getUserById(id);

  // Check if the user exists and if the current user is authorized to edit it
  if (!user || currentUserId !== id) {
    return notFound(); // Redirect to 404 page if user is not found or not authorized
  }

  const handleSubmit = async () => {
    // Handle form submission
  }

  return (
    <div>
      <h1>Edit User</h1>
      <form action={`/api/user/${id}`} method="POST">
        <input type="text" name="name" defaultValue={user.name} required />
        <input type="email" name="email" defaultValue={user.email} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}



