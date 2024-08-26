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