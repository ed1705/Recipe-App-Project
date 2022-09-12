CREATE TABLE recipes
(
    id           varchar(255) PRIMARY KEY,
    name         varchar(255),
    servings     int,
    cookTime     varchar(255),
    instructions varchar(255)
);

CREATE TABLE ingredients ( id varchar(255) PRIMARY KEY,
                           recipe_id varchar(255),
                           name varchar(255),
                           amount varchar(255));

INSERT INTO recipes VALUES
                        (1, 'Plain chicken', 3, '1:45', '1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken'),
                        (2, 'Plain Pork', 5, '0:45', '1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork');

INSERT INTO ingredients VALUES
                            (1, 1, 'Chicken', '2 pounds'),
                            (2, 1, 'Salt', '1 Tbs'),
                            (3, 2, 'Pork', '3 pounds'),
                            (4, 2, 'Paprika', '2 Tbs');
