-- DB 생성
CREATE DATABASE SDS;

-- DB 전환
USE SDS;

-- 계정 생성
CREATE USER fc_admin@localhost IDENTIFIED BY "fx1234";

-- 권한 부여
GRANT ALL PRIVILEGES on fc.* TO fc_admin@localhost;

-- 설정 적용
FLUSH PRIVILEGES;

ALTER USER sds_admin@localhost IDENTIFIED WITH mysql_native_password BY "sds1234";

FLUSH PRIVILEGES;

-- 원래 플러그인: caching_sha2_password
-- 바꾼 플러그인: mysql_native_password

