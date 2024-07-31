USE mage_around;

INSERT INTO order_state
    (content)
VALUES ('제조 완료');


SELECT *
FROM order_item;

SELECT *
FROM order_product;

SELECT *
FROM order_state;

SELECT *
FROM payment;

SELECT *
FROM coupon;

SELECT *
FROM stamp;

SELECT *
FROM notice;

ALTER TABLE order_product
    ADD COLUMN total_price INT NOT NULL;

INSERT INTO branch
    (email, password, branch.branch_name, address, sub_address)
VALUES ('ee@ee', 'ee', '메가커피', '지구', '어딘가');

SELECT op.id, op.order_item_id, op.product_id, op.count, op.options, op.total_price, pi.file_path
FROM order_product op
         JOIN product_img pi ON op.product_id = pi.product_id
WHERE op.order_item_id = 6;

ALTER TABLE order_item
    ADD COLUMN request     VARCHAR(100),
    ADD COLUMN is_take_out VARCHAR(1) NOT NULL,
    ADD COLUMN options     VARCHAR(10)
;

ALTER TABLE payment
    ADD COLUMN merchant_uid VARCHAR(50) NOT NULL;


ALTER TABLE payment
    CHANGE method provider VARCHAR(50);

SELECT oi.id,
       oi.customer_id,
       oi.branch_id,
       oi.total_price,
       oi.state_id,
       oi.created_at,
       oi.is_take_out,
       b.branch_name,
       p.provider
FROM order_item oi
         JOIN branch b ON oi.branch_id = b.id
         JOIN payment p ON oi.id = p.order_item_id
WHERE oi.id = 6;

INSERT INTO payment
    (order_item_id, total_price, provider, merchant_uid)
VALUES (6, 5000, '카카오페이', '4534');

ALTER TABLE payment
    ADD COLUMN coupon_count INT NOT NULL DEFAULT 0;

UPDATE payment
SET coupon_count = 1
WHERE id = 1;

ALTER TABLE order_item
    MODIFY COLUMN options JSON NOT NULL;

DELETE
FROM order_item
WHERE id = 7;

DELETE
FROM order_product
WHERE order_item_id = 7;

DELETE
FROM payment
WHERE order_item_id = 7;

INSERT INTO coupon
    (customer_id, count)
VALUES (12, 0);

UPDATE coupon
SET count = 3
WHERE customer_id = 12;

UPDATE notice
SET is_read = false;

ALTER TABLE notice
MODIFY COLUMN is_read BOOLEAN NOT NULL DEFAULT FALSE;