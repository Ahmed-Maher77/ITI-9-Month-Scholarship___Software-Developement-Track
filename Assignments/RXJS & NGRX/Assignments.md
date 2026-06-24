# RxJS & NgRx Assignments

## Assignment 1: Multi-Warehouse Product Feed

### Scenario

An e-commerce company receives products from multiple warehouses and wants to display all incoming products in a single live feed.

### Requirements

* Create **three independent product sources**.
* Each source should provide a list of products.
* Display all incoming products in a **single product feed**.
* Products should appear as they arrive from their respective sources.

### Expected Output

A unified product feed showing products arriving from all warehouses in real time.

### RxJS Concepts

* Observables
* `merge`
* `of`
* `interval`
* `delay`
* Subscription Management

### Bonus

* Add warehouse labels for each product.
* Display arrival timestamps.
* Allow filtering products by warehouse.

---

## Assignment 2: Airport Operations Dashboard

### Scenario

An airport dashboard requires information from multiple services before it can be displayed to operators.

### Services to Simulate

1. Flight Status Service
2. Weather Information Service
3. Gate Information Service

### Requirements

* Simulate the three services using RxJS.
* The dashboard must wait until **all services complete successfully**.
* Display a **"Dashboard Ready"** message once all required data is available.
* Handle:

  * Success scenarios
  * Completion scenarios
  * Failure scenarios

### Expected Output

A dashboard that appears only after all required information has been loaded successfully.

### RxJS Concepts

* `forkJoin`
* Error Handling
* `catchError`
* `throwError`
* Loading States

### Bonus

* Add retry functionality.
* Display service loading indicators.
* Show detailed error messages when a service fails.

---

## Assignment 3: City Operations Monitoring Center

### Scenario

A city operations center monitors live sensor data to track environmental and traffic conditions.

### Sensors to Simulate

* Temperature Sensor
* Traffic Sensor

### Requirements

* Simulate a temperature sensor.
* Simulate a traffic sensor.
* Display the latest values from both sensors on a live dashboard.
* Update the dashboard whenever either sensor value changes.
* Stop monitoring after a specified period.
* Display a status message when monitoring ends.

### Expected Output

A live dashboard showing continuously updated sensor information.

### RxJS Concepts

* `combineLatest`
* `interval`
* `timer`
* `takeUntil`
* Real-time Data Streams

### Bonus

* Add charts for sensor values.
* Show sensor status indicators.
* Allow users to configure the monitoring duration.

---

## Assignment 4: Learning Platform Activity Tracker

### Scenario

An online learning platform tracks user activities and onboarding processes.

### User Actions

Create buttons for:

* Login
* Logout
* Enroll in Course

### Requirements

* Display user activities as they occur.
* Implement an onboarding workflow that executes a sequence of actions after login.
* Demonstrate the difference between two observable behaviors by showing how multiple subscribers receive emitted values.

### Expected Output

An activity feed showing user actions and onboarding progress.

### RxJS Concepts

* `Subject`
* `BehaviorSubject`
* `concat`
* Event Streams
* Multicasting

### Suggested Onboarding Workflow

After Login:

1. Load User Profile
2. Load Recommended Courses
3. Display Welcome Message
4. Complete Onboarding

### Bonus

* Track activity timestamps.
* Add user statistics.
* Persist activity history using NgRx Store.

---

# Technical Requirements

## Framework

* Angular
* SCSS
* TypeScript

## State Management

* NgRx Store
* Actions
* Reducers
* Selectors
* Effects (where applicable)

## UI Requirements

* Modern responsive dashboard design
* Loading indicators
* Error handling states
* Empty states
* Activity logs
* Status badges
* Clean card-based layout

## Deliverables

For each assignment:

* Functional Angular implementation
* Proper RxJS usage
* NgRx integration
* Responsive UI
* Well-structured folder organization
* Clean and maintainable code
* README explaining the solution and chosen RxJS operators
