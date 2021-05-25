export const __postgres_host__ = process.env.POSTGRES_HOST;
export const __postgres_port__ = process.env.POSTGRES_PORT as number | undefined;
export const __postgres_database__ = process.env.POSTGRES_DATABASE;
export const __postgres_schema__ = process.env.POSTGRES_SCHEMA;
export const __postgres_username__ = process.env.POSTGRES_USERNAME;
export const __postgres_password__ = process.env.POSTGRES_PASSWORD;

export const __postgres_logging__ = (process.env.POSTGRES_LOGGING || false) as boolean;
