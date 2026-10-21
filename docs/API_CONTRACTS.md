# Future Backend API Contracts & Integration Guide — Rana Da Dera

## 1. Authentication Endpoints
- `POST /api/v1/auth/login`
  - Body: `{ identifier: string, password: string }`
  - Response: `{ token: string, user: UserProfile }`
- `POST /api/v1/auth/register`
  - Body: `{ fullName: string, email?: string, phone: string, password: string }`
  - Response: `{ token: string, user: UserProfile }`
- `POST /api/v1/auth/forgot-password`
  - Body: `{ identifier: string }`
  - Response: `{ success: boolean, message: string }`

## 2. Menu & Availability Endpoints
- `GET /api/v1/menu/dishes`
  - Query: `?category=karahi&available_only=true`
  - Response: `{ dishes: Dish[], categories: Category[] }`
- `PATCH /api/v1/admin/menu/dishes/:dishId/availability`
  - Headers: `Authorization: Bearer <staff_jwt>`
  - Body: `{ isAvailable: boolean }`
  - Response: `{ dishId: string, isAvailable: boolean }`

## 3. Order Submission & Tracking Endpoints
- `POST /api/v1/orders`
  - Body:
    ```json
    {
      "fulfillmentType": "delivery",
      "deliveryDetails": {
        "fullName": "Chaudhry Taimoor",
        "phone": "0301-4431520",
        "addressLine": "House 14, Street 3",
        "zoneId": "naseerabad",
        "city": "Rawalpindi"
      },
      "items": [
        {
          "dishId": "mutton-karahi",
          "quantity": 1,
          "selectedOptions": [{ "groupId": "portion-size", "optionId": "half-kg" }]
        }
      ],
      "couponCode": "FIRSTORDER",
      "paymentMethod": "cod",
      "policyAcknowledged": true
    }
    ```
  - Response (201 Created): `{ orderId: "RDD-84920", status: "received", total: 2000 }`
- `GET /api/v1/orders/:orderId`
  - Response: `{ order: Order }`
- `PATCH /api/v1/admin/orders/:orderId/stage`
  - Headers: `Authorization: Bearer <staff_jwt>`
  - Body: `{ stage: "preparing" | "out_for_delivery" | "completed" }`
  - Response: `{ orderId: string, currentStage: string }`

## 4. Reservations Endpoints
- `POST /api/v1/reservations`
  - Body: `{ customerName: string, phone: string, date: string, time: string, guestCount: number, occasion: string, seatingPreference: string }`
  - Response (201 Created): `{ reservationId: "RES-9412", status: "pending" }`
- `PATCH /api/v1/admin/reservations/:resId/status`
  - Headers: `Authorization: Bearer <staff_jwt>`
  - Body: `{ status: "confirmed" | "cancelled" }`
  - Response: `{ reservationId: string, status: string }`
