# NoSQL Project

## Table of Contents
- [Introduction](#introduction)
- [Used Tools](#used-tools)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)


## Introduction
This project is focused on utilizing NoSQL databases to manage and store data efficiently. The aim is to demonstrate the advantages of NoSQL databases over traditional SQL databases in certain use cases.



## Entities and Relationships

### Entities

#### Student
```javascript
const studentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },   
});
```
- **firstName**: The first name of the student.
- **lastName**: The last name of the student.
- **email**: The unique email address of the student.

#### Topic
```javascript
const topicSchema = new Schema({
    topicTitle: { type: String, required: true },
    description: { type: String, required: true },
});
```
- **topicTitle**: The title of the topic.
- **description**: A brief description of the topic.

#### Activity
```javascript
const activitySchema = new Schema({
    activityTitle: { type: String, required: true },
    description: { type: String, required: true },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
});
```
- **activityTitle**: The title of the activity.
- **description**: A brief description of the activity.
- **topicId**: Reference to the associated topic.

#### Enrolment
```javascript
const enrolmentSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    activityId: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
    dateEnrolled: { type: Date, default: new Date() },
});
```
- **studentId**: Reference to the enrolled student.
- **activityId**: Reference to the activity the student is enrolled in.
- **dateEnrolled**: The date when the student enrolled in the activity.

### Relationships

- **Student** and **Enrolment**: A student can have multiple enrolments, each representing an activity they are enrolled in.
- **Activity** and **Enrolment**: An activity can have multiple enrolments, each representing a student enrolled in that activity.
- **Activity** and **Topic**: Each activity is associated with a single topic.

## Highlighted API Endpoints

### Get Students by Email Domain
- **Endpoint**: `/api/students/email-domain`
- **Method**: `GET`
- **Description**: Retrieves students with email addresses matching the specified domain.
- **Query Parameters**: `domain` (e.g., `/api/students/email-domain?domain=gmail.com`)

### Get All Activities in a Topic
- **Endpoint**: `/api/topics/:id/activities`
- **Method**: `GET`
- **Description**: Retrieves all activities related to a specific topic by topic ID.
- **Path Parameters**: `id` (Topic ID)

### Get Topics with Specific Keywords
- **Endpoint**: `/api/topics/search`
- **Method**: `GET`
- **Description**: Searches for topics containing specific keywords.
- **Query Parameters**: `keywords` (e.g., `/api/topics/search?keywords=sharding+indexing+transactions`)

### Get All Enrolments for a Student
- **Endpoint**: `/api/enrolments/student/:studentId`
- **Method**: `GET`
- **Description**: Retrieves all enrolments for a specific student and populates the activity and topic details.
- **Path Parameters**: `studentId` (Student ID)

### Get the Most Popular Activities
- **Endpoint**: `/api/enrolments/popular-activities`
- **Method**: `GET`
- **Description**: Retrieves the most popular activities based on the number of enrolments.



## Installation
To install and set up the project, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/NoSql-project.git
    ```
2. Navigate to the project directory:
    ```sh
    cd NoSql-project
    ```
3. Install the necessary dependencies:
    ```sh
    npm install
    ```

## Usage
To run the project, use the following command:
```sh
npm run dev
```
Make sure to configure your NoSQL database connection in the `.env` file before running the project.



