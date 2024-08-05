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

SELECT *
FROM customer
WHERE email = 'joo@naver.com';

UPDATE coupon
SET count = 2
WHERE customer_id = 11;

SELECT *
FROM notice
WHERE customer_id = 21
ORDER BY created_at DESC;

SELECT COUNT(*)
FROM notice
WHERE customer_id = 21
GROUP BY tag, is_read
HAVING tag = 'stamp'
   AND is_read = 1;

SELECT COUNT(*)
FROM notice
WHERE customer_id = 12
GROUP BY tag, is_read
HAVING tag = 'stamp'
   AND is_read = 1;

SELECT COUNT(*)
FROM notice
WHERE customer_id = 21
GROUP BY tag, is_read
HAVING tag = 'stamp'
   AND is_read = 1;

SELECT COALESCE(COUNT(*), 0)
FROM notice
WHERE customer_id = 21
GROUP BY tag, is_read
HAVING tag = 'coupon'
   AND is_read = 1;

SELECT COALESCE(COUNT(*), 0)
FROM notice
WHERE customer_id = 21
  AND tag = 'stamp'
  AND created_at > NOW() - INTERVAL 6 HOUR
GROUP BY tag;

DELETE cp FROM cart_product cp JOIN cart c ON cp.cart_id = c.id WHERE c.id = #{id};
