# **<p align="center">Clinic Appointment Scheduling System</p>**

Small clinics and individual healthcare providers often struggle with managing appointments due to manual or outdated methods such as paper logs or spreadsheets. These methods make it difficult to track doctor availability, avoid scheduling conflicts, and maintain accurate patient information.

The **Clinic Appointment Scheduling System** provides a lightweight, console-based digital solution developed using **C++** and **Object-Oriented Programming (OOP)** principles.

This system simplifies scheduling, ensures accuracy, and improves the organization of clinic operations without requiring complex infrastructure.


## <strong>System Objectives</strong>

- Streamline the process of scheduling and managing clinic appointments.
- Provide a simple, conflict-free method for booking doctor–patient appointments.
- Reduce manual errors caused by paper-based or spreadsheet scheduling.
- Offer an organized structure for storing doctor and patient information.
- Implement a lightweight system using C++ and OOP concepts.
- Provide an intuitive, menu-driven console interface for clinic staff.
- Allow staff to view, add, modify, and delete appointment records.
- Demonstrate a full SDLC workflow for academic and portfolio purposes.

## <strong>Development Model</strong>

### <strong>Agile</strong>
Agile provides quick, flexible development through small iterations.  
Since the system is simple and requirements may evolve, Agile helps deliver features early, gather feedback fast, and adjust without heavy rework.


# <strong>System Requirements</strong>

1. The system shall allow registered Admins, Doctors, and Receptionists to log in using a secure email and password.
2. The system shall validate credentials and load the user dashboard within 3 seconds. It must support three distinct access levels: Admin, Doctor, and Receptionist.
3. The Admin shall be able to Create, Read, Update, and Delete (CRUD) accounts for Doctors and Receptionists, managing fields for Name, ID, Specialty, and Contact Info.
3. The Receptionist shall be able to create a new appointment for a patient by selecting a specific Doctor.
4. The system shall automatically assign a unique, sequential Queue Number to each patient upon 'Check-In' to manage the service order.
5. The Doctor shall be able to view a filtered list of appointments scheduled specifically for them for the current day.
6. The Receptionist shall be able to Cancel upcoming appointments upon patient request.
7. The system shall display a dashboard allowing the Receptionist to view a list of all Doctors and the total count of active appointments for each Doctor for the selected date.
8. The system shall be a web-based application accessible via standard browsers (Chrome, Edge, Firefox) on Windows 10/11 and macOS.
9. The user interface shall be designed such that a new Receptionist can book an appointment within 2 minutes of their first login without requiring external assistance.


# <strong>Functional Requirements (SMART)</strong>

## **1. User Authentication & Authorization**
- The system shall allow Admin, Receptionist, and Doctor to log in using a username and password.  
- The system shall validate credentials within **1 second**.  
- The system shall restrict access so each role only sees its permitted features.  


## **2. Doctor Management (Admin Only)**
- The system shall allow the Admin to add, update, and delete doctor profiles.  
- The system shall assign each doctor a unique **DoctorID**.  
- The system shall allow the Admin to view all registered doctors.


## **3. Patient & Appointment Management (Receptionist)**  
- The system shall allow the Receptionist to add new patients.  
- The system shall assign each patient a unique **PatientID**.  
- The system shall allow the Receptionist to book appointments for patients.  
- The system shall allow selecting a doctor and entering date & time.  
- The system shall prevent double-booking a doctor at the same time.  
- The system shall allow the Receptionist to update or cancel appointments.  


## **4. Doctor Features**
- Doctors shall be able to view **only their own** appointments.  
- Doctors shall not modify, create, or cancel appointments.


# <strong>Non-Functional Requirements (SMART)</strong>

## **1. Performance**
- The system shall respond to any user action in **less than 1 second**.  
- The system shall handle up to 100 doctors, patients, and appointments in memory.


## **2. Usability**
- The system shall offer a simple, readable console interface.  
- All user actions shall require no more than **4—5 steps**.


## **3. Reliability**
- The system shall prevent double-booking for the same doctor and time.


## **4. Portability**
- The system shall run on any operating system with a C++ compiler.


## **5. Maintainability**
- The system shall follow OOP principles and use a modular structure.


# 📘 UML Diagrams

Below are the main UML diagrams used in designing the system.  
Replace the image placeholders with your actual diagram files once uploaded to GitHub.

---

## 🧱 **1. Class Diagram**
Illustrates the main classes in the system and their relationships.

![Class Diagram](./Diagrams/class%20diagram.png)

---

## 🎭 **2. Use Case Diagram**
Shows all actors and interactions with the system.

![Use Case Diagram](./Diagrams/use%20case%20diagram.png)

---

## 🔄 **3. Activity Diagram**
Describes the workflow of scheduling and managing appointments.

![Activity Diagram](./Diagrams/activity%20diagram.png)

## 🔁 **4. Sequence Diagram**
Illustrates the interaction flow between objects during appointment creation.

## Sequence Diagram – Make Appointment
![Sequence Diagram](./Diagrams/sequence%20diagram%20-%20Make%20Appointment.png)

## Sequence Diagram – Show All Doctors
![Sequence Diagram](./Diagrams/sequence%20diagram%20-%20Show%20All%20Doctors.png)
