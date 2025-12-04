# 🎓 Cyber Security Essentials — ITI 9-Month Journey  
## Lesson 14: Cryptography & Digital Trust — Encryption, Keys & Certificates

This lesson introduced the foundational concepts of cryptography and explained how organizations use encryption, hashing, and digital certificates to protect data and establish trust online.

---

## 🔍 Topics Covered

### 1️⃣ Encryption — Converting Plaintext → Ciphertext
Encryption protects data using algorithms and keys.

#### 🔹 Types of Encryption:
- **Symmetric Encryption:**  
  Uses *one shared key* for both encryption and decryption.  
  *Fast and ideal for large data.*

- **Asymmetric Encryption (Public-Key Cryptography):**  
  - Public key → encrypts  
  - Private key → decrypts  
  *Used for secure key exchange and authentication.*

**Real Example:**  
WhatsApp uses asymmetric encryption to exchange keys, then switches to symmetric keys for fast message encryption.

---

### 2️⃣ Hashing — Ensuring Data Integrity
Hashing is a **one-way** function that converts data into a fixed-length value.

- Common use: Secure password storage  
- Example: Storing passwords using SHA-256 or bcrypt  

Hashes **cannot be reversed**, making them ideal for integrity verification.

---

### 3️⃣ Digital Signatures
Digital signatures provide three major security properties:

- **Integrity:** Data was not modified  
- **Authentication:** Confirms the sender's identity  
- **Non-repudiation:** Sender cannot deny the action  

⚠️ Note: Digital signatures **do NOT** provide confidentiality.

---

### 4️⃣ Digital Certificates & PKI (Public Key Infrastructure)
Digital certificates are issued by trusted **Certificate Authorities (CAs)** to verify identities online.

Used for:
- HTTPS websites  
- Secure email  
- VPN authentication  

**Example:**  
The padlock icon in your browser indicates the site has a valid digital certificate verified by a trusted CA.

---

## 🧠 Key Takeaways

✔️ Asymmetric encryption solves the key exchange problem  
✔️ Hashing ensures integrity and secure password storage  
✔️ Digital signatures confirm identity and prevent tampering  
✔️ PKI is the backbone of secure communication on the internet  

---

## 🙏 Acknowledgments

Special thanks to  
**[Eng. Hager Taha](https://www.linkedin.com/in/hager-taha-moustafa/)**  
for simplifying complex cryptography concepts with practical examples.

Gratitude to the  
**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)**  
for delivering high-quality cybersecurity education.

---

## 🔖 Hashtags  
`#Cryptography` `#Encryption` `#PKI` `#DigitalCertificates` `#CyberSecurity` `#Networking` `#ITI` `#AhmedMaher`
