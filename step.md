### payload is more need to prettier because it is not formatting the code properly

### I make sure that tabWidth is 4 in .prettierrc.json:

```json
{
    "tabWidth": 4
}
```

### for this reasone i have added prettier in my project and new script in package.json file:

```json
{
    "scripts": {
        "format": "prettier --write ."
    }
}
```

### now i need to run the prettier command to format the code

### the command is :

```bash
npm run format
```

### I need to make sure that I ignored important files, for this reasons I write .prettierignore for payload cms projects

### run:
```bash
npm run dev
```
## open http://localhost:3000/admin, if you don't have an admnin user you can create one directly, but we need to create seeder script that can create user and fill it in database
### run:
```bash
npm i zod
```
## now we have seed script to run it by: 
```bash
npm run seed
```
## after that, open http://localhost:3000/admin, you can see that you have login page

## but I don't need to login in everytime, I need to autologin for now in development mode, we can make that in (src\payload.config.ts)

## from here: (https://env.t3.gg/docs/nextjs), we can install zod for Next.js more check:
```bash
npm add @t3-oss/env-nextjs zod
```
## now we can use it in our project by create (src/env.ts)
## after that I can use environment variables in each file like this:

```js
import { env } from '@/env'
{
    email: env.CMS_SEED_ADMIN_EMAIL,
    password: env.CMS_SEED_ADMIN_PASSWORD
}
```

## now auto login is working fine after update payload.config.ts

## we need plaiceholder package for generate-blur-data-url helper function, we can add it from (https://plaiceholder.co/docs/plugins/next)
## run:
```bash
npm install @plaiceholder/next
```
## and edit on next.config.ts for complete installation
## we need faker package to create fake data, we can install it from (https://fakerjs.dev/guide/) by:
## run:
```bash
npm install @faker-js/faker --save-dev
```

## now I need to build the frontend, first I'll install TailwindCSS for Next.js from (https://tailwindcss.com/docs/installation/framework-guides/nextjs):
## run:
```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

## install next-themes from (https://www.npmjs.com/package/next-theme):
## run:
```bash
npm install next-themes
```

## now we need to install cloudinary for media upload, we can install it from (https://cloudinary.com/documentation/upload_widget_reference#upload_widget_quick_start):
## run:
```bash
npm install cloudinary
```

## this step to export database from PgAdmin :
```bash
pg_dump -U postgres -d payload-next-blog > backup.sql
```
