use mega_around;
DELETE
FROM coupon
WHERE customer_id = 14;

DELETE
FROM branch
WHERE id = 20;

INSERT INTO coupon
SET customer_id=11,
    count=6;

INSERT INTO stamp
SET customer_id=11,
    count=3;

UPDATE stamp
SET count = 6
WHERE customer_id = 11;

UPDATE coupon
SET count = 2
WHERE customer_id = 11;