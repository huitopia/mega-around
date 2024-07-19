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