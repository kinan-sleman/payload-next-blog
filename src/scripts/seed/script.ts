import { seedAdmin } from "@/scripts/seed/seeders/admin.seeder"

async function main() {
    try {
        // here we can add all the seeders
        await seedAdmin();
        process.exit(0)
    } catch (error) {
        console.error('Error seeding database: ', error)
        process.exit(1)
    }
}

void main()