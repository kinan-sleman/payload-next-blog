import { seedAdmin } from "@/scripts/seed/seeders/admin.seeder"
import { getPayloadClient } from "@/scripts/seed/lib/payload/client"
import { seedArticleAuthors } from "@/scripts/seed/seeders/article-authors.seeder";
import { seedArticles } from "@/scripts/seed/seeders/articles.seeder";

async function main() {
    const payload = await getPayloadClient()
    try {
        await seedAdmin(payload);
        await seedArticleAuthors(payload);
        await seedArticles(payload);
        process.exit(0)
    } catch (error) {
        console.error('Error seeding database: ', error)
        process.exit(1)
    }
}

void main()