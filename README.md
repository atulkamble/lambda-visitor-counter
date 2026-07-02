# 🚀 AWS Lambda + API Gateway + DynamoDB Visitor Counter Project

Build a **serverless visitor counter application** using **AWS Lambda**, **Amazon API Gateway**, **Amazon DynamoDB**, and a static website hosted on **Amazon EC2 (Apache)**.

---

# 📌 Architecture

```text
                 User Browser
                      │
                      ▼
          Static Website (EC2 + Apache)
                      │
          JavaScript (fetch API)
                      │
                      ▼
              Amazon API Gateway
                      │
                      ▼
               AWS Lambda Function
                      │
             Read/Update Visitor Count
                      │
                      ▼
              Amazon DynamoDB
```

---

# 🛠 Prerequisites

* AWS Account
* IAM Administrator User
* AWS CLI Installed
* Git
* Python
* Amazon Linux EC2 Instance
* GitHub Repository

Repository:

```bash
https://github.com/atulkamble/lambda-visitor-counter.git
```

---

# 📚 Services Used

| Service        | Purpose                           |
| -------------- | --------------------------------- |
| IAM            | User Authentication & Permissions |
| EC2            | Host Static Website               |
| Apache (httpd) | Web Server                        |
| Git            | Download Website Source Code      |
| Lambda         | Backend Logic                     |
| API Gateway    | REST API                          |
| DynamoDB       | Store Visitor Count               |
| AWS CLI        | Resource Management               |

---

# Step 1️⃣ Configure IAM User

Create an **IAM User**

```
IAM
 ├── Users
 ├── Groups
 └── Policies
```

Assign the user to an **Administrator Group**.

Attach:

```
AdministratorAccess
```

Create an **Access Key**

```
Access Key ID

Secret Access Key
```

These credentials will be used to configure the AWS CLI.

---

# Step 2️⃣ Launch EC2 Instance

Launch an **Amazon Linux 2023** EC2 instance.

Connect using SSH.

---

## Install Required Packages

```bash
sudo yum update -y
sudo yum install git python aws-cli httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
```

---

## Clone Project

```bash
cd /var/www/html

sudo su

git clone https://github.com/atulkamble/lambda-visitor-counter.git
```

---

## Copy Website Files

```bash
sudo mv /var/www/html/lambda-visitor-counter/website/* /var/www/html
```

Verify:

```
index.html
script.js
style.css
```

---

# Step 3️⃣ Configure AWS CLI

Configure AWS CLI.

```bash
aws configure
```

Enter

```
AWS Access Key ID

AWS Secret Access Key

Region:
us-east-1

Output:
json
```

Verify

```bash
aws sts get-caller-identity
```

Example

```json
{
  "UserId": "...",
  "Account": "123456789012",
  "Arn": "arn:aws:iam::123456789012:user/admin"
}
```

---

# Step 4️⃣ Create DynamoDB Table

Create the table.

```bash
aws dynamodb create-table \
    --table-name VisitorCounter \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1
```

---

## Verify Table

```bash
aws dynamodb describe-table \
    --table-name VisitorCounter
```

---

## List Tables

```bash
aws dynamodb list-tables
```

---

## Insert Initial Record

```bash
aws dynamodb put-item \
    --table-name VisitorCounter \
    --item '{
        "id":{"S":"visitor"},
        "count":{"N":"0"}
    }'
```

---

## Verify Data

```bash
aws dynamodb scan \
    --table-name VisitorCounter
```

Expected Output

```text
id      visitor

count   0
```

---

# Step 5️⃣ Create Lambda Function

Make the deployment script executable.

```bash
chmod +x lambda.sh
```

Run it.

```bash
./lambda.sh
```

The script creates:

* IAM Role
* Lambda Function
* Required Permissions
* Lambda Deployment Package

---

## Verify Lambda

```bash
aws lambda get-function \
    --function-name visitor-counter \
    --query "Configuration.FunctionArn" \
    --output text
```

Example

```
arn:aws:lambda:us-east-1:123456789012:function:visitor-counter
```

---

# Step 6️⃣ Create API Gateway

Make the API Gateway script executable.

```bash
chmod +x apigateway.sh
```

Run

```bash
./apigateway.sh
```

The script creates:

* REST API
* Resource
* GET Method
* Lambda Integration
* Deployment
* Invoke URL

Example

```
https://abc123.execute-api.us-east-1.amazonaws.com/prod/visitor
```

---

# Step 7️⃣ Update Website

Open

```
script.js
```

Replace the API URL.

Example

```javascript
const API_URL = "https://abc123.execute-api.us-east-1.amazonaws.com/prod/visitor";
```

Save the file.

---

# Step 8️⃣ Access Website

Open the EC2 Public IP in your browser.

Example

```
http://32.192.42.219/
```

---

# Expected Output

```
Visitor Counter

Powered by AWS Serverless

Total Visitors

1
```

Refreshing the page should increase the visitor count.

```
1

2

3

4

...
```

---

# Complete Flow

```text
User
 │
 ▼
EC2 Website
 │
 ▼
script.js
 │
 ▼
API Gateway
 │
 ▼
Lambda Function
 │
 ▼
DynamoDB
 │
Update Count
 │
 ▼
Return JSON
 │
 ▼
Website Displays Count
```

---

# Project Directory

```text
lambda-visitor-counter/
│
├── website/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── lambda/
│   ├── lambda_function.py
│   └── requirements.txt
│
├── lambda.sh
├── apigateway.sh
├── trust-policy.json
└── README.md
```

---

# Useful AWS CLI Commands

## Check Caller Identity

```bash
aws sts get-caller-identity
```

---

## List Lambda Functions

```bash
aws lambda list-functions
```

---

## List APIs

```bash
aws apigateway get-rest-apis
```

---

## Get API Stages

```bash
aws apigateway get-stages \
  --rest-api-id <API_ID>
```

---

## Get Lambda ARN

```bash
aws lambda get-function \
    --function-name visitor-counter \
    --query "Configuration.FunctionArn" \
    --output text
```

---

## Scan DynamoDB

```bash
aws dynamodb scan \
    --table-name VisitorCounter
```

---

## Delete Lambda

```bash
aws lambda delete-function \
    --function-name visitor-counter
```

---

## Delete DynamoDB Table

```bash
aws dynamodb delete-table \
    --table-name VisitorCounter
```

---

# Learning Outcomes

After completing this project, you will understand:

* ✅ IAM Users and Permissions
* ✅ AWS CLI Configuration
* ✅ Amazon EC2 Setup
* ✅ Apache Web Server Hosting
* ✅ Git Repository Management
* ✅ Amazon DynamoDB CRUD Operations
* ✅ AWS Lambda Deployment
* ✅ API Gateway REST API Integration
* ✅ JavaScript Fetch API
* ✅ End-to-End Serverless Architecture
* ✅ Building a Production-Style Visitor Counter Application


Below is the updated documentation section with the **actual project code** (HTML, JavaScript, and CSS) included based on your uploaded project. The website uses a modern UI and fetches the visitor count from your deployed API Gateway endpoint. 

---

# 🚀 AWS Lambda Visitor Counter Project

## 📖 Project Overview

This project demonstrates how to build a **Serverless Visitor Counter** using:

* ✅ Amazon EC2 (Static Website Hosting)
* ✅ Apache Web Server
* ✅ AWS Lambda
* ✅ Amazon API Gateway
* ✅ Amazon DynamoDB
* ✅ JavaScript Fetch API

When a user visits the website:

1. Website loads from EC2
2. JavaScript calls API Gateway
3. API Gateway invokes Lambda
4. Lambda increments visitor count in DynamoDB
5. Updated count is returned
6. Website displays the latest visitor count

---

# 🏗 Architecture

```text
                     Internet
                         │
                         ▼
              Amazon EC2 (Apache)
             Static HTML/CSS/JS Website
                         │
                fetch(API Gateway)
                         │
                         ▼
                Amazon API Gateway
                         │
                         ▼
                 AWS Lambda Function
                         │
                  Read / Update Count
                         │
                         ▼
                  Amazon DynamoDB
```

---

# 📂 Project Structure

```text
lambda-visitor-counter/

│
├── website/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── lambda/
│   ├── lambda_function.py
│   └── requirements.txt
│
├── lambda.sh
├── apigateway.sh
├── trust-policy.json
└── README.md
```

---

# Step 1 – IAM Configuration

Create an IAM User

```
IAM
 ├── User
 ├── Group
 └── AdministratorAccess
```

Generate

* Access Key
* Secret Access Key

Configure AWS CLI

```bash
aws configure
```

---

# Step 2 – Launch EC2

Install required packages

```bash
sudo yum update -y

sudo yum install git python aws-cli httpd -y

sudo systemctl start httpd
sudo systemctl enable httpd
```

Clone repository

```bash
cd /var/www/html

sudo su

git clone https://github.com/atulkamble/lambda-visitor-counter.git
```

Copy website

```bash
mv /var/www/html/lambda-visitor-counter/website/* /var/www/html
```

---

# Step 3 – Create DynamoDB

```bash
aws dynamodb create-table \
    --table-name VisitorCounter \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1
```

Verify

```bash
aws dynamodb describe-table \
--table-name VisitorCounter
```

Insert initial record

```bash
aws dynamodb put-item \
    --table-name VisitorCounter \
    --item '{
        "id":{"S":"visitor"},
        "count":{"N":"0"}
    }'
```

Check data

```bash
aws dynamodb scan \
--table-name VisitorCounter
```

---

# Step 4 – Deploy Lambda

```bash
chmod +x lambda.sh

./lambda.sh
```

Verify Lambda

```bash
aws lambda get-function \
--function-name visitor-counter \
--query "Configuration.FunctionArn" \
--output text
```

---

# Step 5 – Deploy API Gateway

```bash
chmod +x apigateway.sh

./apigateway.sh
```

Example output

```
https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/count
```

---

# Step 6 – Update Website

Open

```
script.js
```

Replace API URL

```javascript
const API_URL =
"https://yh3vw26c7h.execute-api.us-east-1.amazonaws.com/prod/count";
```

This endpoint is used by the website to retrieve the latest visitor count. 

---

# Website Code

## index.html

Features:

* Animated glassmorphism UI
* Visitor Counter
* Live badge
* Refresh button
* Tech stack badges
* Responsive layout

```text
index.html
```

Contains:

* Live Status
* Visitor Counter
* Refresh Button
* AWS Technology Tags
* Animated Background

---

## script.js

The JavaScript file performs the following tasks:

✔ Calls API Gateway

✔ Parses JSON response

✔ Supports both Lambda Proxy formats

```javascript
const count =
    result.count ??
    result.visitorCount ??
    JSON.parse(result.body || "{}").count ??
    JSON.parse(result.body || "{}").visitorCount;
```

Features

* Animated counter
* Loading state
* Error handling
* Last updated time
* Refresh button
* Async Fetch API

---

## style.css

The website includes:

* Glassmorphism UI
* Animated glowing background
* Gradient counter
* Responsive design
* Modern typography
* Hover animations
* Loading spinner
* Gradient button
* Mobile support

---

# Running Application

Open browser

```
http://EC2-PUBLIC-IP/
```

Example

```
http://32.192.42.219/
```

Website

```
Live

Visitor Counter

Powered by Serverless AWS Infrastructure

Total Visitors

15

Lambda
API Gateway
DynamoDB
S3

Refresh
```

---

# Request Flow

```text
Browser

↓

index.html

↓

script.js

↓

fetch()

↓

API Gateway

↓

Lambda

↓

DynamoDB

↓

Increment Count

↓

Return JSON

↓

Display Count
```

---

# Example Response

```json
{
    "count": 17
}
```

or

```json
{
    "statusCode":200,
    "body":"{\"count\":17}"
}
```

The JavaScript handles both response formats automatically. 

---

# Useful Commands

## List Lambda

```bash
aws lambda list-functions
```

## List APIs

```bash
aws apigateway get-rest-apis
```

## Scan DynamoDB

```bash
aws dynamodb scan \
--table-name VisitorCounter
```

## Delete Lambda

```bash
aws lambda delete-function \
--function-name visitor-counter
```

## Delete Table

```bash
aws dynamodb delete-table \
--table-name VisitorCounter
```

---

# Learning Outcomes

After completing this project, you will understand:

* IAM User & Access Keys
* AWS CLI Configuration
* Amazon EC2 Static Website Hosting
* Apache Web Server
* Git & GitHub Integration
* Amazon DynamoDB Operations
* AWS Lambda Development
* API Gateway REST APIs
* JavaScript Fetch API
* JSON Processing
* Serverless Application Architecture
* End-to-End AWS Cloud Integration

This project provides a practical, production-style example of integrating frontend, serverless compute, and NoSQL storage into a complete AWS application.
