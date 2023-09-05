CREATE DATABASE IF NOT EXISTS `adonis_books_bookmarks` ;

DROP USER 'adonis'@'%';
CREATE USER 'adonis'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON * . * TO 'adonis'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
