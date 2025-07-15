# portfolioTemplate

# Portfolio Backend Template – API Routes

> Base URL: `https://yourdomain.com/api/portfolio`

---

## Articles

| Method | Route                     | Description                |
|--------|---------------------------|----------------------------|
| `GET`  | `/article`                | Get all articles           |
| `POST` | `/article`                | Add a new article          |
| `PATCH`| `/article/:id`            | Update an article by ID    |
| `DELETE`| `/article/:id`           | Delete an article by ID    |

**POST /article — Request Body Example**:
```json
{
  "insert_dict": {
    "title": "My Article",
    "body": "Full body of the article",
    "link": "https://...",
    "description": "Article summary",
    "still_writing": true
  }
}
```

---

## Concepts

| Method | Route                      | Description                |
|--------|----------------------------|----------------------------|
| `GET`  | `/concept`                 | Get all concepts           |
| `POST` | `/concept`                 | Add a concept              |
| `PATCH`| `/concept/:id`             | Update a concept by ID     |
| `DELETE`| `/concept/:id`            | Delete a concept by ID     |

---

## Contact

| Method | Route                      | Description                |
|--------|----------------------------|----------------------------|
| `GET`  | `/contact`                 | Get contact info           |
| `POST` | `/contact/insert`          | Add contact info           |
| `PATCH`| `/contact/:id`             | Update contact by ID       |
| `DELETE`| `/contact/:id`            | Delete contact by ID       |

---

## Experience

| Method | Route                      | Description                |
|--------|----------------------------|----------------------------|
| `GET`  | `/experience`              | Get all experiences        |
| `POST` | `/experience`              | Add an experience          |
| `PATCH`| `/experience/:id`          | Update by ID               |
| `DELETE`| `/experience/:id`         | Delete by ID               |

---

## Open To (Job Preferences)

| Method | Route                      | Description                |
|--------|----------------------------|----------------------------|
| `GET`  | `/openTo`                  | Get job preferences        |
| `POST` | `/openTo`                  | Add job preferences        |
| `PATCH`| `/openTo/:id`              | Update preferences by ID   |
| `DELETE`| `/openTo/:id`             | Delete preferences by ID   |

---

## Projects

| Method | Route                      | Description                |
|--------|----------------------------|----------------------------|
| `GET`  | `/project`                 | Get all projects           |
| `POST` | `/project`                 | Add a project              |
| `PATCH`| `/project/:id`             | Update a project by ID     |
| `DELETE`| `/project/:id`            | Delete a project by ID     |

---

## Resume

| Method | Route                      | Description                |
|--------|----------------------------|----------------------------|
| `GET`  | `/resume`                  | Get resume info            |
| `POST` | `/resume`                  | Upload resume              |
| `PATCH`| `/resume/:id`              | Update resume by ID        |
| `DELETE`| `/resume/:id`             | Delete resume by ID        |

---

## Skills

| Method | Route                      | Description                          |
|--------|----------------------------|--------------------------------------|
| `GET`  | `/skills`                  | Get all skills                       |
| `POST` | `/skills`                  | Add a skill                          |
| `PATCH`| `/skills/:id`              | Update a skill by ID                 |
| `DELETE`| `/skill/:id`              | Delete a skill by ID                 |
| `GET`| `/skills/experience?level=?` | Filter skills by experience level    |

**POST /skills — Request Body Example**:
```json
{
  "insert_dict": {
    "name": "Node.js",
    "level": "advanced",
    "type": "Technical",
    "is_learning": false,
    "learnt_date": "2024-06-01"
  }
}
```

**GET /skills/experience?level=**:
```json

```

---

### Notes

- All POST/PATCH requests require a valid JSON body with `insert_dict` or `update_dict`.
- Most routes return `{ message: string, data: ... }` format.
- All routes use secure parameter binding to prevent SQL injection.
