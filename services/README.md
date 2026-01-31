# Services

This directory contains all external service integrations and backend configurations. Each service is organized in its own folder with utilities, configurations, and helper functions.

## 📋 Sample Folder Structure

```
services/
├── firebase/
│   ├── config.ts          # Firebase initialization and configuration
│   └── utils.ts           # Firebase helper functions (CRUD operations)
└── README.md              # This file
```

## 📋 Service Organization Guidelines

When adding new external services, follow this structure:

1. **Create a service folder** (e.g., `service_name/`)
2. **Configuration file** (`config.ts`): Initialize and export service instances
3. **Utilities file** (`utils.ts`): Provide reusable wrapper functions around the service API
4. **Documentation**: Include inline comments and update this README

## ✅ Best Practices

- **Centralize configurations**: Keep all service configurations in `config.ts`
- **Wrap service calls**: Use utility functions to abstract service implementations
- **Type safety**: Use TypeScript interfaces for all service operations
- **Environment variables**: Never hardcode credentials; use environment variables
- **Error handling**: Implement proper error handling in utility functions
- **Reusability**: Design utilities to be used across multiple features
- **Scalability**: Structure follows a pattern that scales well as features grow

## ⚙️ Usage Examples

Below are quick examples for how to use the existing Firebase helpers in this repo. Note: this project places Firebase files at `services/config.ts` and `services/utils.ts`.

Client (Next.js) - auth example:

```ts
import { signIn, signUp, signOut, onAuthChange } from "../services/utils";

// signIn / signUp
await signUp("alice@example.com", "super-secret");
await signIn("alice@example.com", "super-secret");

// listen for auth changes
onAuthChange((user) => {
	if (user) console.log("signed in", user.uid);
	else console.log("signed out");
});
```

Hook usage (React client):

```ts
import useAuth from "../services/firebase/useAuth";

export default function Example() {
	const { user, loading } = useAuth();

	if (loading) return <div>Loading…</div>;
	return <div>{user ? `Hello ${user.email}` : "Not signed in"}</div>;
}
```

Firestore example:

```ts
import { addDocument, getCollection } from "../services/utils";

await addDocument("tasks", { title: "New task", done: false });
const tasks = await getCollection("tasks");
console.log(tasks);
```

Storage upload example:

```ts
import { uploadFile } from "../services/utils";

const url = await uploadFile("avatars/alice.png", fileBlob);
console.log(url);
```

## 🔐 Environment variables

Use a local environment file for development. Create a `.env.local` (gitignored) with these keys or copy the example below.

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```