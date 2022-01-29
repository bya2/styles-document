DROP TABLE user;
DROP TABLE document;
DROP TABLE element;

CREATE TABLE user (
  id VARCHAR(24),
  password VARCHAR(24) NOT NULL,
  email VARCHAR(40) NOT NULL UNIQUE,
  hash_id VARCHAR(300) NOT NULL UNIQUE,
  PRIMARY KEY(id)
);

CREATE TABLE document (
  id VARCHAR(24),
  document_name VARCHAR(40) NOT NULL UNIQUE,
  PRIMARY KEY(id),
  FOREIGN KEY(id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE element (
  document_name VARCHAR(40),
  type VARCHAR(16),
  value VARCHAR(300),
  PRIMARY KEY(document_name),
  FOREIGN KEY(document_name) REFERENCES document(document_name) ON UPDATE CASCADE ON DELETE CASCADE
);
