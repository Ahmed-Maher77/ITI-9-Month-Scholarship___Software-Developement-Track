# 🎓 Computer Networks & Cyber Security Fundamentals — ITI 9-Month Journey  
## **Lesson 5: TCP/IP Protocol Architecture & Transport Layer**

This lesson delivered a deep and structured understanding of networking foundations — including protocol architectures, transport mechanisms, hardware components, media types, and core cybersecurity concepts.

---

## 🔹 1. TCP/IP Protocol Architecture & Transport Layer

### **TCP/IP & OSI Layers**
We explored how the TCP/IP model maps to the OSI model and how data flows through the layers:

**Application → Transport → Internet → Network Access**

### **Transport Layer Protocols**
- **TCP** — Reliable, connection-oriented, sequenced, and error-checked (uses a 3-way handshake)  
- **UDP** — Fast, lightweight, connectionless, and best-effort

### **Key Transport Layer Functions**
- Session multiplexing  
- Segmentation  
- Flow control (TCP Windowing)  
- Reliability & sequencing (TCP)

**Real Example:**  
Opening *cisco.com* and *facebook.com* on the same machine uses different dynamic port numbers (e.g., **49001**, **49002**).

---

## 🔹 2. Application Layer Protocols & Internet Services

### **Common Protocols**
- **HTTP/HTTPS** – Web browsing  
- **DNS** – Domain-to-IP resolution  
- **FTP** – File transfer  
- **SMTP / POP3 / IMAP4** – Email communication  
- **SSH / Telnet / RDP** – Remote access

### **DNS Lookup Order**
1. Cache  
2. Hosts file  
3. DNS Server  

---

## 🔹 3. Network Hardware Devices

### **1. Network Interface Card (NIC)**
- **Layer:** Physical  
- **Function:** Connects the device to the network medium

### **2. Repeater**
- **Layer:** Physical  
- **Function:** Regenerates weak signals to extend cable length

### **3. Hub**
- **Layer:** Physical  
- **Function:** Broadcasts data to all ports → collision-heavy

### **4. Switch**
- **Layer:** Data Link  
- **Function:** Uses MAC addresses to intelligently forward frames

### **5. Router**
- **Layer:** Network  
- **Function:** Routes packets between different networks using IP addresses

### 🏠 Home Router = Multi-Layer Device
A typical home router includes:
- Router  
- Switch  
- Access Point (AP)  
- DHCP Server  
- Firewall  

---

## 🔹 4. Network Media & Wireless Technologies

### **Wired Media**
- **UTP / STP** – RJ45  
- **Coaxial Cable**  
- **Fiber Optic** – High speed, long-distance, EMI-free  
  - *Single-Mode* → Long distance  
  - *Multi-Mode* → Shorter distance

### **Wireless Technologies**
Wi-Fi • Infrared • Microwave • Bluetooth  

- **SSID** identifies each wireless network  
- **Modes:** Ad-hoc & Infrastructure  

---

## 🔹 5. Cyber Security Essentials

### **CIA Triad**
- 🔐 **Confidentiality**  
- 🛠 **Integrity**  
- ⚙ **Availability**

### **Threat Types**
- Passive & Active attacks  
- Phishing, Spoofing, Buffer Overflow  
- Session Hijacking  
- Malware (Viruses, Worms, Trojans, Spyware)  
- DoS / DDoS  
- Social Engineering  

### **Attacker Categories**
- Black Hat  
- White Hat  
- Gray Hat  

### **Attack Lifecycle**
Reconnaissance → Scanning → Gaining Access → Maintaining Access → Covering Tracks

---

## 🔹 6. Essential Network Lab Commands

### **IP & Connectivity**
`ipconfig` • `ping` • `getmac` • `arp -a`

### **Routing**
`route print` • `route add` • `route delete`

### **DNS**
`nslookup domain_name`  
`nslookup IP_address`

### **FTP (CLI)**
Use Windows built-in FTP client to upload/download files.

---

## ✅ Key Takeaways
- Understand OSI ↔ TCP/IP layer interaction  
- Differentiate between TCP and UDP  
- Identify core protocols like DNS, HTTP, SMTP  
- Recognize essential network devices and their layers  
- Understand wired & wireless media  
- Apply cybersecurity basics (CIA, threat types, attack phases)  
- Use practical network commands in a lab environment  

---

## 🙏 Special Thanks  
Instructor: **[Eng. Hager Taha](https://www.linkedin.com/in/hager-taha-moustafa/)**  
For clear explanations, real-world examples, and continuous guidance throughout the course.

---

### **#ITI #ComputerNetworks #CyberSecurity #TCPIP #TransportLayer #NetworkingBasics #NetworkProtocols #ITInfrastructure #AhmedMaher**
