use mega_around;
DELETE
FROM coupon
WHERE customer_id = 14;

DELETE
FROM branch
WHERE id = 20;

UPDATE stamp
SET count = 5
WHERE customer_id = 20;

UPDATE coupon
SET count = 3
WHERE customer_id = 20;