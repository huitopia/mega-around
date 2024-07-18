SELECT *
FROM cart;

SELECT *
FROM cart_product;

ALTER TABLE cart_product DROP FOREIGN KEY cart_product_ibfk_1;

ALTER TABLE cart_product DROP PRIMARY KEY;

ALTER TABLE cart_product
ADD COLUMN id INT PRIMARY KEY AUTO_INCREMENT;

ALTER TABLE cart_product
    ADD CONSTRAINT cart_product_ibfk_1
        FOREIGN KEY (cart_id)
            REFERENCES cart(id);