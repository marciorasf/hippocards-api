POSTGRES_DB_HOST="localhost"
POSTGRES_DB_USER="marciorasf"
POSTGRES_DB_NAME="flashcards"
POSTGRES_APP_NAME="flashcards-postgres"

CLEAR_DATABASE_QUERIES="DROP SCHEMA flashcards CASCADE; CREATE SCHEMA flashcards;"

# Drop all tables from database
docker exec -i ${POSTGRES_APP_NAME} psql --host $POSTGRES_DB_HOST --username $POSTGRES_DB_USER --dbname $POSTGRES_DB_NAME -c "${CLEAR_DATABASE_QUERIES}"
