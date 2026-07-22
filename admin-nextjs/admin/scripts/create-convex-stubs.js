const fs = require('fs');
const path = require('path');

const convexDir = path.join(__dirname, '..', 'convex', '_generated');

if (!fs.existsSync(convexDir)) {
  fs.mkdirSync(convexDir, { recursive: true });
}

const files = {
  'api.ts': `// Stub file - replace with generated API when Convex is connected
// Run \`npx convex dev\` to generate the real API

export const api = {
  teamMembers: {
    create: {} as any,
    update: {} as any,
    remove: {} as any,
    list: {} as any,
    get: {} as any,
  },
};
`,
  'dataModel.d.ts': `import { DocId } from "convex/server";

export type TeamMember = {
  _id: DocId<"teamMembers">;
  _creationTime: number;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  image?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  featured?: boolean;
  createdAt: number;
  updatedAt: number;
};

export type Doc<TableName extends string> =
  TableName extends "teamMembers" ? TeamMember : never;

export type DocumentByName = {
  teamMembers: TeamMember;
};

export type TableNames = "teamMembers";
`,
};

for (const [name, content] of Object.entries(files)) {
  const filePath = path.join(convexDir, name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created stub: convex/_generated/${name}`);
  }
}
