# Personal Code Snippets For This Project

### Get user data in client side

```ts
import { useSession } from 'next-auth/react';

// Component code
const {data: session} = useSession();
  const name = session?.user?.name;
  console.log('name: ', name);
```
--------------------------------------------------------------------------------------------

### Test MongoDB Local Connection

Start
```bash
mongosh
```
Change db
```bash
use dev
```
Show collections
```bash
show collections
```
Show documents
```bash
db.users.find()
```

--------------------------------------------------------------------------------------------

### Hidratation Warning

[Suppress hydration warning](https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c)

```html
<body suppressHydrationWarning={true}></body>
```

--------------------------------------------------------------------------------------------

## UI Components

Instalation: 
```bash
npx shadcn-ui@latest add alert
```
--------------------------------------------------------------------------------------------
## Params in Next.js

If we have a page with dynamic routes, we can get the params in the page component like this:

```ts
export default async function EditUserPage({ params }: Props) {
  const { id } = params;
  console.log('id: ', id);
  return (
    <div>
      <h1>Edit User</h1>
    </div>
  );
}
```
--------------------------------------------------------------------------------------------
## Get User ID with NextAuth

```ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function handler(req, res) {
  const session = await getServerSession(authOptions);
  
  if (session) {
    const userId = session.user._id;

    console.log('userId: ', userId);
  }
}
```


--------------------------------------------------------------------------------------------

## MongoDB CLI

Update a document
```bash
db.users.updateOne({ email: 'test@test.com' }, { $set: { customDomain:'testdomain' } })
```

Delete a document
```bash
db.users.deleteOne({_id: ObjectId("")})
```

--------------------------------------------------------------------------------------------