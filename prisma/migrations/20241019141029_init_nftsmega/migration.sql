-- CreateTable
CREATE TABLE "NftsMega" (
    "token_address" VARCHAR(255),
    "token_id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "token_hash" VARCHAR(255),
    "block_number" INTEGER,
    "block_number_minted" INTEGER,
    "contract_type" VARCHAR(100),
    "name" VARCHAR(255),
    "symbol" VARCHAR(10),
    "token_uri" TEXT,
    "metadata" JSON,
    "last_token_uri_sync" TIMESTAMP(100),
    "last_metadata_sync" TIMESTAMP(100),
    "minter_address" VARCHAR(255),
    "owner_of" VARCHAR(255),
    "rarity_rank" INTEGER,
    "rarity_percentage" DECIMAL(5,2),
    "rarity_label" VARCHAR(20),
    "solana_address" VARCHAR(100),

    CONSTRAINT "NftsMega_pkey" PRIMARY KEY ("token_id")
);
