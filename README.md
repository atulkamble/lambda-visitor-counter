A **Visitor Counter** is one of the easiest and most practical AWS Lambda projects. It demonstrates serverless architecture, API integration, database usage, and a simple web UI.

# AWS Visitor Counter Project

## Objective

Create a website that displays the total number of visitors.

Each page refresh increments the visitor count automatically.

---

# Architecture

```text
                User
                  │
                  ▼
          Static Website (HTML/CSS/JS)
                  │
          JavaScript Fetch API
                  │
                  ▼
            API Gateway
                  │
                  ▼
             AWS Lambda
                  │
          Read/Update Counter
                  │
                  ▼
            DynamoDB Table
```

---

# AWS Services Used

| Service     | Purpose             |
| ----------- | ------------------- |
| AWS Lambda  | Backend logic       |
| API Gateway | REST API            |
| DynamoDB    | Store visitor count |
| S3          | Static Website      |
| IAM         | Permissions         |
| CloudWatch  | Logs                |

---

# Project Flow

```text
Open Website

↓

JavaScript calls API Gateway

↓

API Gateway invokes Lambda

↓

Lambda reads current count

↓

Lambda increments count

↓

Store updated count

↓

Return latest count

↓

Website displays count
```

---

# Folder Structure

```text
visitor-counter/

│
├── lambda/
│      lambda_function.py
│
├── website/
│      index.html
│      style.css
│      script.js
│
├── architecture.png
│
└── README.md
```

Repository Name

```text
aws-lambda-visitor-counter
```

---

# Step 1 Create DynamoDB Table

Table Name

```text
VisitorCounter
```

Partition Key

```text
id
```

Value

```text
visitor
```

Example

| id      | count |
| ------- | ----- |
| visitor | 0     |

---

# Step 2 Create IAM Role

Attach

```
AWSLambdaBasicExecutionRole
```

Add DynamoDB permissions

```
GetItem
UpdateItem
PutItem
```

---

# Step 3 Create Lambda Function

Runtime

```
Python 3.13
```

Name

```
visitor-counter
```

---

## Lambda Code

```python
import json
import boto3

table = boto3.resource('dynamodb').Table('VisitorCounter')

def lambda_handler(event, context):

    response = table.update_item(
        Key={'id':'visitor'},
        UpdateExpression="ADD #c :inc",
        ExpressionAttributeNames={
            "#c":"count"
        },
        ExpressionAttributeValues={
            ":inc":1
        },
        ReturnValues="UPDATED_NEW"
    )

    count = int(response["Attributes"]["count"])

    return {
        "statusCode":200,
        "headers":{
            "Access-Control-Allow-Origin":"*"
        },
        "body":json.dumps({
            "count":count
        })
    }
```

---

# Step 4 Create API Gateway

```
HTTP API
```

Route

```
GET /count
```

Integration

```
Lambda
```

Enable

```
CORS
```

---

# Step 5 Website

## index.html

```html
<!DOCTYPE html>
<html>

<head>
    <title>Visitor Counter</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

<h1>AWS Visitor Counter</h1>

<div class="card">

<p>Total Visitors</p>

<h2 id="count">Loading...</h2>

</div>

<script src="script.js"></script>

</body>

</html>
```

---

## style.css

```css
body{
    font-family:Arial;
    background:#f5f5f5;
    text-align:center;
    margin-top:120px;
}

.card{

width:300px;
margin:auto;
padding:30px;
background:white;
border-radius:10px;
box-shadow:0 0 10px gray;

}

h2{
font-size:45px;
color:#0073e6;
}
```

---

## script.js

Replace with your API URL.

```javascript
fetch("https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/count")
.then(response=>response.json())
.then(data=>{
document.getElementById("count").innerHTML=data.count;
});
```

---

# Step 6 Upload Website

```
S3
```

Enable

```
Static Website Hosting
```

Upload

```
index.html
style.css
script.js
```

---

# Step 7 Test

Open

```
Website URL
```

Every refresh

```
1

2

3

4

5
```

Counter increases.

---

# Architecture Diagram

```text
                Browser
                   │
                   ▼
          S3 Static Website
                   │
          JavaScript Fetch()
                   │
                   ▼
             API Gateway
                   │
                   ▼
              AWS Lambda
                   │
          Update Visitor Count
                   │
                   ▼
              DynamoDB
```

---

# Sample Output

```text
-----------------------------
 AWS Visitor Counter
-----------------------------

Total Visitors

1245
```

---

# Skills Covered

* Static website hosting on S3
* AWS Lambda development
* API Gateway integration
* DynamoDB CRUD operations
* IAM roles and least-privilege access
* CloudWatch logging
* JavaScript Fetch API
* Serverless application architecture

---

# Possible Enhancements

* Add a **Reset Counter** button (admin only).
* Display **Today's Visitors** and **Total Visitors** separately.
* Show the **Last Visit Time**.
* Capture visitor metadata such as country or browser (respecting privacy).
* Use a custom domain with HTTPS via **CloudFront** and **Route 53**.
* Build a dashboard with charts using **Amazon CloudWatch** or a frontend framework like React.

---

# Interview Questions

1. Why use DynamoDB instead of S3 to store the count?
2. What is the purpose of `UpdateExpression` in DynamoDB?
3. Why is `ADD` preferred for incrementing counters?
4. How does API Gateway invoke Lambda?
5. Why is CORS required?
6. What IAM permissions does the Lambda function need?
7. What happens if two users refresh the page simultaneously?
8. How does DynamoDB ensure atomic counter updates?
9. How would you prevent abuse of the API?
10. How would you scale this application to millions of requests per day?

This project is excellent for learning core serverless concepts and is a common portfolio project because it combines frontend, backend, API, and database components in a simple, production-style architecture.
