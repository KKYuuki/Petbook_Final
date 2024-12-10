import { writeFile } from "fs/promises";

const sqlContent = `
-- Create the database
CREATE DATABASE IF NOT EXISTS Petbook;
USE Petbook;

-- Table: Users
CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(100),
    Bio TEXT,
    ProfilePicture VARCHAR(255)
);

-- Table: Pets
CREATE TABLE IF NOT EXISTS Pets (
    PetID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Species VARCHAR(50),
    BirthDate DATE,
    Notes TEXT,
    OwnerID INT NOT NULL,
    FOREIGN KEY (OwnerID) REFERENCES Users(UserID)
);

-- Table: Posts
CREATE TABLE IF NOT EXISTS Posts (
    PostID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    Content TEXT NOT NULL,
    MediaType VARCHAR(20),
    MediaURL VARCHAR(255),
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table: Comments
CREATE TABLE IF NOT EXISTS Comments (
    CommentID INT PRIMARY KEY AUTO_INCREMENT,
    PostID INT NOT NULL,
    UserID INT NOT NULL,
    Content TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table: Likes
CREATE TABLE IF NOT EXISTS Likes (
    LikeID INT PRIMARY KEY AUTO_INCREMENT,
    PostID INT NOT NULL,
    UserID INT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table: Notifications
CREATE TABLE IF NOT EXISTS Notifications (
    NotificationID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    Content TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    IsRead BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
`;

try {
    await writeFile("Petbook.sql", sqlContent, "utf8");
    console.log("Petbook.sql has been generated successfully!");
} catch (err) {
    console.error("Error writing the SQL file:", err);
}
