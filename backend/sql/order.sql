USE mage_around;

INSERT INTO order_state
    (content)
VALUES ('제조 완료');


SELECT *
FROM order_item;

SELECT *
FROM order_state;

SELECT *
FROM notice;

ALTER TABLE order_product
    ADD COLUMN total_price INT NOT NULL;