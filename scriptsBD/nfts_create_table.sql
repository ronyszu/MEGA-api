
CREATE TABLE nftsMega (
    token_address VARCHAR(255),
    token_id INTEGER PRIMARY KEY,
    amount INTEGER,
    token_hash VARCHAR(255),
    block_number INTEGER,
    block_number_minted INTEGER NULL,
    contract_type VARCHAR(100),
    name VARCHAR(255),
    symbol VARCHAR(10),
    token_uri TEXT,
    metadata JSONB,
    last_token_uri_sync TIMESTAMP,
    last_metadata_sync TIMESTAMP,
    minter_address VARCHAR(255),
    owner_of VARCHAR(255),
    rarity_rank INTEGER,
    rarity_percentage NUMERIC(5, 2),
    rarity_label VARCHAR(20),
    solana_address VARCHAR(100)
);
