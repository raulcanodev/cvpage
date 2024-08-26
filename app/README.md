# Personal Code Snippets For This Project

### See if user is logged in

```ts
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Page: React.FC = () => {
  const { data: session } = useSession();

  if( !session?.user ) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
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