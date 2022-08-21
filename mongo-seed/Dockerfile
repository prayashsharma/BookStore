FROM mongo

COPY init.json /init.json

CMD mongoimport --uri mongodb://database/bookstore --collection Categories --drop --type json --file /init.json --jsonArray && \
    mongoimport --uri mongodb://database/bookstore --collection Books --drop 