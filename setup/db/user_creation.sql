CREATE USER 'librarian'@'localhost' IDENTIFIED BY /*password*/ ACCOUNT UNLOCK;
CREATE USER 'admin' IDENTIFIED BY /*password*/;

CREATE ROLE librarians WITH ADMIN 'admin';
GRANT SELECT, INSERT, DELETE, UPDATE ON TABLE books TO 'librarian'@'localhost';
GRANT SELECT, INSERT, DELETE, UPDATE ON TABLE students TO 'librarian'@'localhost';
GRANT SELECT, INSERT, DELETE ON TABLE lending TO 'librarian'@'localhost';
GRANT UPDATE (end) ON lending TO 'librarian'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
