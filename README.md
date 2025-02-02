# Booking Application

The Booking Application is a web-based platform that allows users to book events and view their booked events. It handles slot booking across multiple timezones for client and the admin. The slots can be set for the preferred duration and timezone. The booked events also contain detials about the Name, Email, Phone and Notes as the event data and can be captured with the event.The application consists of a frontend built with React and a backend built with Node.js and Express. The backend uses Firebase Firestore for data storage.

## Base URLs

- Client: https://booking-app-sarthak-saxena.netlify.app/
- Server: https://booking-app-7zbg.onrender.com

## Project Structure

The project is divided into two main directories: `booking_app_backend` and `booking_app_frontend`.

### Backend (`booking_app_backend`)

- **Configuration Files**:
  - `.babelrc`: Babel configuration file.
  - `.env`: Environment variables.
  - `jest.config.js`: Jest configuration file for testing.
  - `nodemon.json`: Nodemon configuration file for development.
  - `package.json`: Project dependencies and scripts.
  - `tsconfig.json`: TypeScript configuration file.

- **Directories**:
  - `src/`: Source code directory.
    - `app.ts`: Express application setup.
    - `index.ts`: Entry point for the backend server.
    - `handlers/`: Contains request handlers.
      - `event.handler.ts`: Event-related request handlers.
      - `event.handler.test.ts`: Tests for event handlers.
    - `helpers/`: Utility functions and configurations.
      - `config.ts`: Configuration settings.
      - `date.ts`: Date utility functions.
      - `firebase.ts`: Firebase initialization.
      - `routeExecutor.ts`: Route executor and error handling.
      - `validators.ts`: Request validation functions.
    - `methods/`: Business logic and database interactions.
      - `event.method.ts`: Event-related methods.
      - `event.method.test.ts`: Tests for event methods.
    - `models/`: Data models (currently empty).
    - `routes/`: Express routes.
      - `events.router.ts`: Event-related routes.
      - `index.ts`: Route attachment.
    - `types/`: TypeScript type definitions.
      - `event.types.ts`: Event-related types.

### Frontend (`booking_app_frontend`)

- **Configuration Files**:
  - `.gitignore`: Git ignore file.
  - `package.json`: Project dependencies and scripts.
  - `tsconfig.json`: TypeScript configuration file.

- **Directories**:
  - `public/`: Public assets and HTML template.
    - `index.html`: Main HTML file.
    - `manifest.json`: Web app manifest.
    - `robots.txt`: Robots exclusion file.
  - `src/`: Source code directory.
    - `App.tsx`: Main application component.
    - `index.tsx`: Entry point for the React application.
    - `configs/`: Configuration settings.
      - `configs.ts`: API URL and timezones.
    - `components/`: React components.
      - `ActionButton/`: Action button component.
      - `DatePicker/`: Date picker component.
      - `EventBooking/`: Event booking component.
      - `EventForm/`: Event form component.
      - `SlotDetails/`: Slot details component.
      - `SlotInput/`: Slot input component.
      - `Slots/`: Slot container and item components.
      - `UserEventCard/`: User event card component.
      - `UserEvents/`: User events component.
    - `helpers/`: Utility functions.
      - `date.utils.ts`: Date utility functions.
    - `types/`: TypeScript type definitions.
      - `event.types.ts`: Event-related types.
      - `slot.types.ts`: Slot-related types.

## Backend

#### Installation

1. Navigate to the `booking_app_backend` directory.
2. Install dependencies:

npm install

#### Start
npm run start

#### Test
npm run test

### API Endpoints
#### GET /event/events

Retrieve events within a specified date range.

- **URL**: `/event/events`
- **Method**: `GET`
- **Query Parameters**:
  - `startDate` (string, required): The start date of the range in ISO 8601 format.
  - `endDate` (string, required): The end date of the range in ISO 8601 format.
  - `timezone` (string, optional): The timezone for the events. Defaults to the server's timezone if not provided.
- **Response**:
  - `200 OK`: An array of events within the specified date range.
  - `400 Bad Request`: If the request parameters are invalid.

**Example**:
```sh
curl -X GET "https://booking-app-7zbg.onrender.com/event/events?startDate=2025-02-14T00:00:00.000Z&endDate=2025-02-14T23:59:59.000Z&timezone=America/New_York"
```

#### GET /event/free-events

Retrieve events within a specified date range.

- **URL**: `/event/events`
- **Method**: `GET`
- **Query Parameters**:
  - `startDate` (string, required): The start date of the range in ISO 8601 format.
  - `endDate` (string, required): The end date of the range in ISO 8601 format.
  - `timezone` (string, optional): The timezone for the events. Defaults to the server's timezone if not provided.
- **Response**:
  - `200 OK`: An array of slots available.
  - `400 Bad Request`: If the request parameters are invalid.

**Example**:
```sh
curl -X GET "https://booking-app-7zbg.onrender.com/event/free-events?startDate=2025-02-14T00:00:00.000Z&endDate=2025-02-14T23:59:59.000Z&duration=30&timezone=America/New_York"
```

#### POST /event/book-event

Book an event within a specified slot.

- **URL**: `/event/book-event`
- **Method**: `POST`
- **Request Body**:
  - `startDate` (string, required): The start date and time of the event in ISO 8601 format.
  - `endDate` (string, required): The end date and time of the event in ISO 8601 format.
  - `timezone` (string, optional): The timezone for the event. Defaults to the server's timezone if not provided.
  - `eventData` (object, required): The details of the event, including:
    - `name` (string, required): The name of the event.
    - `email` (string, required): The email of the event organizer.
    - `mobile` (string, required): The mobile number of the event organizer.
    - `notes` (string, optional): Additional notes for the event.
- **Response**:
  - `200 OK`: A success message indicating that the event was created successfully.
  - `400 Bad Request`: If the request parameters are invalid.
  - `422 Conflict`: If the slot is not available.

**Example**:
```sh
curl -X POST "https://booking-app-7zbg.onrender.com/event/book-event" \
-H "Content-Type: application/json" \
-d '{
  "startDate": "2025-02-14T15:00:00.000Z",
  "endDate": "2025-02-14T16:00:00.000Z",
  "timezone": "America/New_York",
  "eventData": {
    "name": "Test Event",
    "email": "test@test.com",
    "mobile": "1234567890",
    "notes": "Test notes"
  }
}'
```
## Frontend

#### Event Booking Page

- **URL**: `/book-event`
- **Component**: `EventBooking`
- **Description**: This page allows users to book an event. Users can select a date, set the duration and timezone, find available slots, and book an event by providing event details such as name, email, mobile, and notes.

#### User Events Page

- **URL**: `/`
- **Component**: `UserEvents`
- **Description**: This page allows users to view their booked events within a specified date range and timezone. Users can see the details of their events and manage their bookings.

These routes are defined in the `App.tsx` file and are used to navigate between the Event Booking page and the User Events page.

## Future scopes

#### Setting up FIFO Queue, Worker and Locking Mechanisms
- For handling large booking requests.
- For handling concurrent requests.
