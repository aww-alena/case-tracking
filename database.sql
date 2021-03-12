create TABLE user_app(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)  
);

create TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    icon VARCHAR(255)
);

create TABLE affair(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    color VARCHAR(255),
    time_tracking BOOLEAN,
    rate BOOLEAN,
    done BOOLEAN,
    indicator BOOLEAN,
    category_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user_app(id),
    FOREIGN KEY(category_id) REFERENCES category(id)
);

create TABLE goal(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    color VARCHAR(255),
    date_start timestamp,
    date_end timestamp,
    indicator_start NUMERIC,
    indicator_end NUMERIC,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user_app(id)
);