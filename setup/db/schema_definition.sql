CREATE DATABASE library;
USE library;

/*Naming conventions for tables are as follows:
Entities are Uppercase, relationships are lowercase
and attributes are lowercase.
*/

CREATE TABLE Books (
	id INT UNSIGNED PRIMARY KEY,
	title TEXT NOT NULL,
	author varchar(100)
);

CREATE TABLE Students (
	name varchar(200) PRIMARY KEY
);

/*The table 'lending' stores all transactions,
past and current ones. To find the still running
transactions query for rows where end IS NULL*/
CREATE TABLE lending (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	book INT UNSIGNED REFERENCES Books(id),
	student VARCHAR(200) REFERENCES Students(name),
	start DATE NOT NULL,
	end DATE
);


/*The following trigger makes sure you can't lend out
a book that someone else already borrowed*/
DELIMITER //

CREATE TRIGGER book_still_lent
BEFORE INSERT ON lending
FOR EACH ROW

BEGIN
IF EXISTS (
                SELECT *
                FROM lending l
                WHERE new.book = l.book
                AND l.end IS NULL )
THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Book still lent out';
END IF;
END;
//

DELIMITER ;