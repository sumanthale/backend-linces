# Product Reviews System - Complete Documentation

## Overview
A complete product review system allowing logged-in customers to add, view, update, and delete reviews with ratings (1-5 stars), titles, and comments.

---

## Database Schema

### Review Model
```prisma
model Review {
  id        Int      @id @default(autoincrement())
  productId Int
  userId    Int
  rating    Int      // 1-5 stars
  title     String
  comment   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([productId, userId])  // One review per user per product
  @@index([productId])
  @@index([userId])
}
```

### Relations
- **User** → hasMany **Review**
- **Product** → hasMany **Review**
- Each user can only have **one review per product** (can update it)

---

## REST API Endpoints

### 1. Add/Update Review
**Create or update review for a product**
```
POST /api/reviews
Auth: Required (Bearer token)
Content-Type: application/json

Request Body:
{
  "productId": 1,
  "rating": 5,
  "title": "Great product!",
  "comment": "This product exceeded my expectations. Highly recommended!"
}

Response (201 Created / 200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "productId": 1,
    "userId": 2,
    "rating": 5,
    "title": "Great product!",
    "comment": "This product exceeded my expectations. Highly recommended!",
    "createdAt": "2026-04-18T22:00:00Z",
    "updatedAt": "2026-04-18T22:00:00Z",
    "user": {
      "id": 2,
      "name": "John Customer"
    }
  },
  "message": "Review created successfully"
}
```

**Validation:**
- `productId` - Required, must exist
- `rating` - Required, integer 1-5
- `title` - Required, non-empty string
- `comment` - Required, non-empty string

**Error Cases:**
- 400: Invalid rating (not 1-5)
- 400: Missing required fields
- 500: Internal error

---

### 2. Get Product Reviews (Paginated)
**Fetch all reviews for a product with statistics**
```
GET /api/reviews/product/:productId?page=1&limit=10
Auth: Optional

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "productId": 1,
      "userId": 2,
      "rating": 5,
      "title": "Great product!",
      "comment": "This product exceeded my expectations...",
      "createdAt": "2026-04-18T22:00:00Z",
      "updatedAt": "2026-04-18T22:00:00Z",
      "user": {
        "id": 2,
        "name": "John Customer"
      }
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3,
    "stats": {
      "averageRating": 4.5,
      "totalReviews": 25
    }
  },
  "message": "Reviews fetched successfully"
}
```

**Query Parameters:**
- `page` - Optional, default 1
- `limit` - Optional, default 10

**Notes:**
- Public endpoint (no auth required)
- Returns paginated reviews sorted by newest first
- Includes average rating and total count

---

### 3. Get User's Review for Product
**Fetch logged-in user's review for a specific product**
```
GET /api/reviews/product/:productId/my-review
Auth: Required (Bearer token)

Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "productId": 1,
    "userId": 2,
    "rating": 5,
    "title": "Great product!",
    "comment": "This product exceeded my expectations...",
    "createdAt": "2026-04-18T22:00:00Z",
    "updatedAt": "2026-04-18T22:00:00Z",
    "user": {
      "id": 2,
      "name": "John Customer"
    }
  },
  "message": "Review fetched successfully"
}
```

**Response if no review:**
```json
{
  "success": true,
  "data": null,
  "message": "Review fetched successfully"
}
```

---

### 4. Update Review
**Update an existing review**
```
PUT /api/reviews/:reviewId
Auth: Required (Bearer token)
Content-Type: application/json

Request Body:
{
  "rating": 4,
  "title": "Good product",
  "comment": "Updated review after using it for a week"
}

Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "productId": 1,
    "userId": 2,
    "rating": 4,
    "title": "Good product",
    "comment": "Updated review after using it for a week",
    "createdAt": "2026-04-18T22:00:00Z",
    "updatedAt": "2026-04-18T22:30:00Z",
    "user": {
      "id": 2,
      "name": "John Customer"
    }
  },
  "message": "Review updated successfully"
}
```

**Validation:**
- `rating` - Required, integer 1-5
- `title` - Optional, but if provided must be non-empty
- `comment` - Optional, but if provided must be non-empty
- Only review owner or admin can update

**Error Cases:**
- 400: Invalid rating
- 404: Review not found
- 403: Cannot update other user's review (non-admin)
- 500: Internal error

---

### 5. Delete Review
**Delete a review**
```
DELETE /api/reviews/:reviewId
Auth: Required (Bearer token)

Response (200 OK):
{
  "success": true,
  "data": null,
  "message": "Review deleted successfully"
}
```

**Access Control:**
- Owner can delete their own review
- Admin can delete any review

**Error Cases:**
- 404: Review not found
- 403: Cannot delete other user's review (non-admin)
- 500: Internal error

---

### 6. Get Review Statistics
**Get aggregated review stats for a product**
```
GET /api/reviews/product/:productId/stats
Auth: Optional

Response (200 OK):
{
  "success": true,
  "data": {
    "averageRating": 4.5,
    "totalReviews": 25,
    "ratingDistribution": {
      "1": 1,
      "2": 2,
      "3": 4,
      "4": 8,
      "5": 10
    }
  },
  "message": "Stats fetched successfully"
}
```

**Notes:**
- Public endpoint (no auth required)
- Useful for displaying rating breakdown
- Shows how many people gave each rating

**Error Cases:**
- 404: Product not found
- 500: Internal error

---

## Service Layer Functions

### `createReview(productId, userId, rating, title, comment)`
Creates or updates a review
- **Returns:** `{ success, data, isUpdate, error, message }`
- **Enforces:** Rating 1-5, one review per user per product

### `getProductReviews(productId, page, limit)`
Fetches paginated reviews with statistics
- **Returns:** `{ success, data, stats, pagination, error, message }`
- **Stats includes:** averageRating, totalReviews

### `getUserReview(productId, userId)`
Fetches specific user's review
- **Returns:** `{ success, data, error, message }`

### `updateReview(reviewId, userId, accountType, rating, title, comment)`
Updates a review with access control
- **Returns:** `{ success, data, error, message }`
- **Enforces:** Only owner or admin can update

### `deleteReview(reviewId, userId, accountType)`
Deletes a review with access control
- **Returns:** `{ success, message, error }`
- **Enforces:** Only owner or admin can delete

### `getReviewStats(productId)`
Gets aggregated statistics
- **Returns:** `{ success, data, error, message }`
- **Data includes:** averageRating, totalReviews, ratingDistribution

---

## Frontend Integration Guide

### Component: ReviewForm
```javascript
const ReviewForm = ({ productId, currentReview, onSubmit }) => {
  const [rating, setRating] = useState(currentReview?.rating || 0);
  const [title, setTitle] = useState(currentReview?.title || '');
  const [comment, setComment] = useState(currentReview?.comment || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          rating,
          title,
          comment
        })
      });
      const result = await res.json();
      if (result.success) {
        onSubmit(result.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rating-selector">
        {[1,2,3,4,5].map(r => (
          <button
            key={r}
            type="button"
            className={`star ${r <= rating ? 'active' : ''}`}
            onClick={() => setRating(r)}
          >★</button>
        ))}
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Review title"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your detailed review"
        required
      />
      <button type="submit" disabled={loading}>
        {currentReview ? 'Update Review' : 'Post Review'}
      </button>
    </form>
  );
};
```

### Component: ReviewsList
```javascript
const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId, page]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/reviews/product/${productId}?page=${page}&limit=10`
      );
      const result = await res.json();
      if (result.success) {
        setReviews(result.data);
        setStats(result.pagination.stats);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reviews-section">
      <div className="rating-stats">
        <div className="avg-rating">
          <span className="number">{stats?.averageRating || 0}</span>
          <span className="stars">★★★★★</span>
        </div>
        <p>{stats?.totalReviews || 0} reviews</p>
      </div>

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <span className="user-name">{review.user.name}</span>
              <span className="rating">{'★'.repeat(review.rating)}</span>
              <span className="date">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h4 className="review-title">{review.title}</h4>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
    </div>
  );
};
```

### Component: ProductDetail with Reviews
```javascript
const ProductDetail = ({ productId }) => {
  const [userReview, setUserReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserReview();
    }
  }, [productId, isLoggedIn]);

  const fetchUserReview = async () => {
    const res = await fetch(
      `/api/reviews/product/${productId}/my-review`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const result = await res.json();
    if (result.data) {
      setUserReview(result.data);
    }
  };

  return (
    <div className="product-detail">
      {/* Product info */}

      {isLoggedIn && (
        <section className="review-section">
          <h3>
            {userReview ? 'Your Review' : 'Write a Review'}
          </h3>
          {showReviewForm || !userReview ? (
            <ReviewForm
              productId={productId}
              currentReview={userReview}
              onSubmit={(review) => {
                setUserReview(review);
                setShowReviewForm(false);
              }}
            />
          ) : (
            <div>
              <ReviewItem review={userReview} isOwner />
              <button onClick={() => setShowReviewForm(true)}>
                Edit Review
              </button>
            </div>
          )}
        </section>
      )}

      <section className="all-reviews">
        <h3>Customer Reviews</h3>
        <ReviewsList productId={productId} />
      </section>
    </div>
  );
};
```

---

## Testing Guide

### 1. Add Review (Logged-in Customer)
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "rating": 5,
    "title": "Excellent!",
    "comment": "Great product, highly recommended"
  }'
```

### 2. Get Product Reviews
```bash
curl http://localhost:3000/api/reviews/product/1?page=1&limit=10
```

### 3. Get User's Review
```bash
curl http://localhost:3000/api/reviews/product/1/my-review \
  -H "Authorization: Bearer USER_TOKEN"
```

### 4. Update Review
```bash
curl -X PUT http://localhost:3000/api/reviews/1 \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "title": "Good",
    "comment": "Updated after more use"
  }'
```

### 5. Delete Review
```bash
curl -X DELETE http://localhost:3000/api/reviews/1 \
  -H "Authorization: Bearer USER_TOKEN"
```

### 6. Get Review Statistics
```bash
curl http://localhost:3000/api/reviews/product/1/stats
```

---

## Key Features

✅ **One Review Per User Per Product** - Users can only have one review per product, but can update it
✅ **Star Rating System** - 1-5 star ratings with title and detailed comment
✅ **Pagination** - Reviews are paginated (default 10 per page)
✅ **Statistics** - Average rating and distribution of ratings
✅ **Access Control** - Users can only modify their own reviews, admins can modify any
✅ **Timestamps** - Created and updated timestamps for each review
✅ **Cascade Delete** - Removing user or product removes associated reviews

---

## Error Handling

| Status | Error Code | Meaning |
|--------|-----------|---------|
| 400 | INVALID_INPUT | Missing required fields |
| 400 | INVALID_RATING | Rating not between 1-5 |
| 400 | MISSING_FIELDS | Title or comment empty |
| 404 | PRODUCT_NOT_FOUND | Product doesn't exist |
| 404 | REVIEW_NOT_FOUND | Review doesn't exist |
| 403 | FORBIDDEN | Cannot modify other user's review |
| 500 | INTERNAL_ERROR | Server error |

---

## Summary

The reviews system provides:
- Complete CRUD operations for reviews
- One review per user per product with update capability
- 1-5 star ratings with title and comment
- Paginated list with statistics
- Access control (user can only modify own, admin can modify any)
- Cascade deletion with user/product
- Full REST API integration
