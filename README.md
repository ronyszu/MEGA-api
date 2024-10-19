
# **MEGA NFT Migration: Polygon to Solana**

This project handles the migration of NFTs from the Polygon blockchain to the Solana blockchain. It includes both backend logic for interacting with the databases and APIs to manage and update NFTs, as well as batch processing to handle large amounts of NFT data efficiently.

## **Project Overview**

The goal of this project is to automate the process of migrating NFTs currently stored on the Polygon blockchain to the Solana blockchain. The project involves:

- Fetching NFT data from the Polygon chain.
- Updating the necessary fields to map NFTs to Solana.
- Ensuring smooth data migration with robust error handling.
- API development using **Next.js** and **Prisma** to interact with PostgreSQL and process data.

## **Technology Stack**

- **Node.js**: Backend runtime environment.
- **Next.js**: Framework used for API routes and rendering.
- **TypeScript**: For type safety and robust development.
- **Prisma**: ORM to handle PostgreSQL database.
- **PostgreSQL**: The database storing NFT data for migration.
- **Polygon**: Source blockchain where the NFTs are stored.
- **Solana**: Destination blockchain where the NFTs will be migrated to.

## **Setup Instructions**

### **Prerequisites**

- **Node.js** (v14 or above)
- **PostgreSQL** (Installed and running)
- **Prisma** (For managing migrations)
- **Git** (For version control)

### **1. Clone the Repository**

```bash
git clone https://github.com/ronyszu/MEGA-api.git
cd MEGA-api/mega-api

```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Setup Environment Variables**

Create a `.env` file at the root of the project and add your database connection string and any necessary API keys:

```
DATABASE_URL="postgresql://<user>:<password>@<server>:<port>/NftsMega"
```

### **4. Set Up Prisma**

Run the following command to generate the Prisma client and apply migrations to the PostgreSQL database:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### **5. Running the Project**

To start the development server:

```bash
npm run dev
```

### **6. Running Migrations**

If there are any updates to the Prisma schema, run:

```bash
npx prisma migrate dev --name <migration_name>
npx prisma generate
```

## **API Endpoints**

### **1. GET `/api/data?owner_of=<address>`**

Fetch all NFTs belonging to the specified owner address on Polygon.

### **2. POST `/api/data/update-solana-address`**

Update the `solana_address` field for NFTs during the migration.

**Body:**
```json
{
  "solana_address": "new_solana_address",
  "owner_of": "polygon_owner_address"
}
```

### **3. Batch Insert**

Run batch insert operations for NFT data with the provided SQL scripts (`nfts_batch_insert.sql`) to speed up the data transfer process.

## **Database Schema**

The PostgreSQL database includes the following fields in the `nftsMega` table:

- **`token_address`**: Address of the token on Polygon.
- **`token_id`**: Unique identifier of the NFT.
- **`amount`**: Number of tokens (typically 1 for NFTs).
- **`token_hash`**: Hash of the token data.
- **`block_number`**: The block number where the NFT was minted.
- **`block_number_minted`**: Can be NULL, the original block number of minting.
- **`contract_type`**: Type of contract (e.g., ERC721).
- **`name`**: Name of the NFT.
- **`symbol`**: Token symbol.
- **`token_uri`**: URI containing metadata of the NFT.
- **`metadata`**: JSON object with attributes like traits and descriptions.
- **`last_token_uri_sync`**: Last time the token URI was synchronized.
- **`last_metadata_sync`**: Last time the metadata was synchronized.
- **`minter_address`**: Address of the minter.
- **`owner_of`**: Address of the current owner on Polygon.
- **`rarity_rank`**: Rank of the NFT’s rarity.
- **`rarity_percentage`**: Percentage representing the rarity.
- **`solana_address`**: Address of the token on Solana.
- **`rarity_label`**: Text label for the rarity rank.

## **Scripts and Utilities**

- **`nfts_batch_insert.sql`**: SQL file containing batch insert commands to add NFT data.
- **`nfts_create_table.sql`**: SQL script to create the `nftsMega` table in the PostgreSQL database.
- **Migration Scripts**: Prisma migrations to ensure schema updates are applied correctly.

## **How to Contribute**

1. Fork the repository.
2. Create a new feature branch.
3. Submit a pull request with your changes.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
