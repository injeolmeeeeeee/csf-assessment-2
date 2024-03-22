-- TODO Task 3
drop database if exists ecommerce;
create database ecommerce;
use ecommerce;

create table order_data (
	order_id varchar(26) not null,
    order_date timestamp
        default current_timestamp
        on update current_timestamp,
    name varchar(128) not null,
    address varchar(128) not null,
    priority boolean,
    comments varchar(128),
    
    primary key(order_id)
);

-- create table cart (
-- 	cart_id varchar(128) not null,
--     primary key(cart_id)
-- );

create table line_items (
	prod_id varchar(128) not null,
    cart_id varchar(128) not null,
    quantity int,
    name varchar(128) not null,
    price decimal(10, 2),

    constraint fk_cart_id foreign key (cart_id) references order_data(order_id)
);
