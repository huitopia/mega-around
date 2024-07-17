USE mega_around;

# 고객
CREATE TABLE customer
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    email      VARCHAR(50)  NOT NULL UNIQUE,
    password   VARCHAR(500) NOT NULL,
    nick_name  VARCHAR(10)  NOT NULL UNIQUE,
    phone      VARCHAR(11),
    created_at DATETIME     NOT NULL DEFAULT NOW()
);

# 지점
CREATE TABLE branch
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    email       VARCHAR(50)  NOT NULL UNIQUE,
    password    VARCHAR(500) NOT NULL,
    branch_name VARCHAR(15)  NOT NULL UNIQUE,
    address     VARCHAR(100) NOT NULL,
    sub_address VARCHAR(100),
    created_at  DATETIME     NOT NULL DEFAULT NOW(),
    auth        BOOLEAN      NOT NULL DEFAULT FALSE
);

# 즐겨찾는 매장
CREATE TABLE my_branch
(
    branch_id   INT NOT NULL REFERENCES branch (id),
    customer_id INT NOT NULL REFERENCES customer (id),
    PRIMARY KEY (branch_id, customer_id)
);

# 지도
CREATE TABLE map
(
    branch_id INT NOT NULL REFERENCES branch (id),
    latitude  DOUBLE,
    longitude DOUBLE,
    PRIMARY KEY (branch_id)
);

# 품절 상품
CREATE TABLE sold_out_product
(
    branch_id  INT NOT NULL REFERENCES branch (id),
    product_id JSON,
    PRIMARY KEY (branch_id)
);

# 쿠폰
CREATE TABLE coupon
(
    customer_id INT NOT NULL REFERENCES customer (id),
    count       INT NOT NULL,
    PRIMARY KEY (customer_id)
);

# 스탬프
CREATE TABLE stamp
(
    customer_id INT NOT NULL REFERENCES customer (id),
    count       INT NOT NULL,
    PRIMARY KEY (customer_id)
);

# 알림
CREATE TABLE notice
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT          NOT NULL REFERENCES customer (id),
    tag         VARCHAR(100) NOT NULL,
    content     VARCHAR(100) NOT NULL,
    created_at  DATETIME     NOT NULL DEFAULT NOW()
);

# 상품
CREATE TABLE product
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    title         VARCHAR(30)  NOT NULL,
    main_category VARCHAR(10)  NOT NULL,
    sub_category  VARCHAR(10),
    content       VARCHAR(100) NOT NULL,
    price         INT          NOT NULL,
    options       JSON,
    created_at    DATETIME     NOT NULL DEFAULT NOW()
);

# 상품 이미지
CREATE TABLE product_img
(
    product_id INT          NOT NULL REFERENCES product (id),
    file_name  VARCHAR(200) NOT NULL,
    PRIMARY KEY (product_id)
);

# 상품 옵션
CREATE TABLE option
(
    id    INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL
);

# 세부 옵션
CREATE TABLE option_item
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    option_id INT         NOT NULL REFERENCES option (id),
    content   VARCHAR(30) NOT NULL,
    price     INT         NOT NULL
);

# 장바구니
CREATE TABLE cart
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT      NOT NULL REFERENCES customer (id),
    branch_id   INT      NOT NULL REFERENCES branch (id),
    total_price INT      NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT NOW()
);

# 장바구니 상품
CREATE TABLE cart_product
(
    cart_id     INT NOT NULL REFERENCES cart (id),
    product_id  INT NOT NULL REFERENCES product (id),
    count       INT NOT NULL,
    total_price INT NOT NULL,
    options     JSON,
    PRIMARY KEY (cart_id)
);

# 주문 상태
CREATE TABLE order_state
(
    id      INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(10) NOT NULL
);

# 주문
CREATE TABLE order_item
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT      NOT NULL REFERENCES customer (id),
    branch_id   INT      NOT NULL REFERENCES branch (id),
    total_price INT      NOT NULL,
    state_id    INT      NOT NULL REFERENCES order_state (id),
    created_at  DATETIME NOT NULL DEFAULT NOW()
);

# 결제
CREATE TABLE payment
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    order_item_id INT         NOT NULL REFERENCES order_item (id),
    total_price   INT         NOT NULL,
    method        VARCHAR(50) NOT NULL,
    created_at    DATETIME    NOT NULL DEFAULT NOW()
);

# 주문 상품
CREATE TABLE order_product
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    order_item_id INT NOT NULL REFERENCES order_item (id),
    product_id    INT NOT NULL REFERENCES product (id),
    count         INT NOT NULL,
    options       JSON
);




