# 🎓 Network Fundamentals — ITI 9-Month Journey  
## Lesson 10: DHCP — Dynamic Host Configuration Protocol

In this lesson, we explored how DHCP enables devices to automatically obtain IP addresses and essential network settings without manual configuration.  
DHCP is a cornerstone of scalable, efficient, and error-free network management.

---

## 📘 Topics Covered

### 1️⃣ What Is DHCP?
**DHCP (Dynamic Host Configuration Protocol)** automatically assigns the following to network devices:

- IP Address  
- Subnet Mask  
- Default Gateway  
- DNS Servers  
- Lease Duration  

This automation reduces manual work, eliminates misconfigurations, and prevents issues such as IP conflicts.

---

### 2️⃣ How DHCP Works — The DORA Process
DHCP uses a 4-step handshake known as **DORA**:

1. **Discover** — Client broadcasts a request for an IP address  
2. **Offer** — DHCP server responds with an available IP  
3. **Request** — Client formally requests the offered IP  
4. **Acknowledge** — Server confirms and completes the assignment  

This process ensures smooth and automated IP allocation.

---

### 3️⃣ DHCP Lease
IP addresses are not assigned permanently—they are **leased** for a defined period.

- At **50% of the lease time**, the client attempts to renew the IP.
- If renewal fails and the lease expires, the address returns to the DHCP pool.

This mechanism optimizes IP utilization and prevents exhaustion.

---

### 4️⃣ DHCP Options
Beyond basic addressing, DHCP can provide advanced configuration parameters:

- DNS Domain Name  
- NTP (Time Server)  
- TFTP Server (often used for VoIP phones)  
- Boot File Names (for PXE boot environments)

These features are heavily used in enterprise deployments for automation and centralized management.

---

### 5️⃣ DHCP in Real Networks
Common real-world applications include:

- Home routers assigning `192.168.1.x` to connected devices  
- Organizations assigning different DHCP pools to VLANs  
- ISPs providing IP settings dynamically to customer equipment  

---

## 🧠 Key Takeaways

- DHCP is essential for automated and efficient IP address management.  
- The **DORA** process defines how devices receive their configurations.  
- Leasing ensures fair and optimized usage of IP address space.  
- DHCP options automate advanced configurations across enterprise environments.  

---

## 🙏 Acknowledgments

Special thanks to  
**[Eng. Hager Taha](https://www.linkedin.com/in/hager-taha-moustafa/)**  
for simplifying complex concepts and guiding us through real-world networking scenarios.

And appreciation to the  
**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)**  
for providing a high-quality learning experience.

---

## 🔖 Hashtags  
`#ITI` `#NetworkFundamentals` `#DHCP` `#DORA` `#NetworkingBasics` `#NetworkEngineering`  
`#IPaddressing` `#LAN` `#EnterpriseNetworking` `#ITInfrastructure` `#DNS` `#Gateway`  
`#Subnetting` `#ITTraining` `#CyberSecurity` `#ScalableNetworks` `#Automation`  
`#AhmedMaher` `#TechLearning` `#Routing` `#NetworkDesign`
