# 🎓 Network Fundamentals — ITI 9-Month Journey  
## Lesson 9: IP Addressing & Subnetting Essentials

In this lesson, we explored one of the most fundamental concepts in networking: how devices receive unique logical addresses and how subnetting allows networks to be divided efficiently.  
Mastering IP addressing and subnetting is essential for routing, scalability, and secure network design.

---

## 📘 Topics Covered

### 1️⃣ What Is an IP Address?
An IP address is a **logical identifier** assigned to devices in a network.  
It consists of two parts:

- **Network ID**  
- **Host ID**

**Examples**
- Private IP: `192.168.1.10`  
- Public IP: Provided by your ISP

---

### 2️⃣ IPv4 Address Classes (A–E)
IPv4 addresses are divided into classes based on the size of networks they support:

- **Class A:** `0.0.0.0 – 127.255.255.255`  
- **Class B:** `128.0.0.0 – 191.255.255.255`  
- **Class C:** `192.0.0.0 – 223.255.255.255`

These classes historically helped determine network size (large → small).

---

### 3️⃣ What Is Subnetting?
**Subnetting** is the process of splitting a large network into smaller, more manageable sub-networks.

**Benefits**
- Enhanced security  
- Improved performance  
- Better IP utilization  
- Reduced broadcast domains  

**Example** (from `192.168.1.0/24`):
- `/25` → 2 subnets  
- `/26` → 4 subnets  
- `/30` → Point-to-point links  

---

### 4️⃣ CIDR (Classless Inter-Domain Routing)
CIDR replaces traditional classful addressing by using prefixes.

**Example**  
`192.168.1.0/27` → 32 IP addresses  
CIDR allows flexible network design using variable prefix lengths.

---

## 🧪 Real-World Scenario

A company with **200 employees** cannot rely on a single Class C network (`/24`).  
**Solution:**

- Divide the network into multiple `/26` and `/27` subnets for department-level separation.
- Achieve better **security**, **traffic isolation**, and **resource efficiency**.

---

## 🧠 Key Takeaways

- IP addressing is the core of network communication.  
- Subnetting enhances efficiency, scalability, and performance.  
- CIDR provides flexibility in modern network design.  
- Every network engineer must be comfortable calculating subnets and prefixes.

---

## 🙏 Acknowledgments

Special thanks to our instructor  
**[Eng. Hager Taha](https://www.linkedin.com/in/hager-taha-moustafa/)**  
for her continuous guidance and support in simplifying complex networking concepts.

And thanks to the  
**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)**  
for providing an exceptional learning experience.

---

## 🔖 Hashtags  
`#ITI` `#NetworkFundamentals` `#IPaddressing` `#Subnetting` `#CIDR` `#NetworkingBasics`  
`#NetworkEngineering` `#LAN` `#Routing` `#NetworkSecurity` `#TechLearning` `#ITJourney`  
`#AhmedMaher` `#NetworkDesign` `#IPv4` `#ITInfrastructure` `#ITTraining`  
`#ScalableNetworks` `#NetworkPerformance` `#CyberSecurity` `#ITSkills`
