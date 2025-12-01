# 🎓 Computer Networks — ITI 9-Month Journey  
## Lesson 7: IPv4 Addressing, Classes, Subnetting & CIDR Notation

In this lesson, we explored one of the most important foundations in computer networking: **IPv4 addressing**, **subnetting**, and **CIDR notation**. These concepts are essential for designing scalable, efficient, and secure networks.

---

## 🔹 1. What Is an IPv4 Address?

An **IPv4 address** is a 32-bit value written in dotted-decimal format, such as:

```yaml
192.168.1.10
```


Each IPv4 address consists of two parts:

- **Network Portion**
- **Host Portion**

---

## 🔹 2. IPv4 Address Classes

IPv4 addresses are categorized into 5 classes, but Classes **A**, **B**, and **C** are primarily used for standard networking.

### 🏢 Class A — Very Large Networks
- **Range:** 0.0.0.0 – 127.255.255.255  
- **Default Mask:** 255.0.0.0  
- **Best For:** Governments, ISPs, large enterprises  

### 🏫 Class B — Medium-Sized Networks
- **Range:** 128.0.0.0 – 191.255.255.255  
- **Default Mask:** 255.255.0.0  
- **Best For:** Universities, large organizations  

### 🏠 Class C — Small Networks
- **Range:** 192.0.0.0 – 223.255.255.255  
- **Default Mask:** 255.255.255.0  
- **Best For:** Homes, small offices, LAN environments  

### 🔸 Special Classes  
- **Class D** → Multicasting  
- **Class E** → Experimental / Research  

---

## 🔹 3. Private vs Public IP Addresses

### 🔸 Private IP Ranges
- **Class A:** 10.0.0.0 – 10.255.255.255  
- **Class B:** 172.16.0.0 – 172.31.255.255  
- **Class C:** 192.168.0.0 – 192.168.255.255  

📌 *Used within internal LAN networks.*

### 🔸 Public IP Addresses  
Routable on the internet and assigned by ISPs.

---

## 🔹 4. Subnet Mask — Why It Matters

A **subnet mask** divides an IP address into the **network** and **host** portions.

Example:
```yaml
IP: 192.168.1.10
Mask: 255.255.255.0
```


This means:
- **Network:** 192.168.1.0  
- **Host Range:** 1 – 254  

### Benefits of Subnet Masks
- ✔️ Reduce broadcast traffic  
- ✔️ Increase security  
- ✔️ Improve network organization  

---

## 🔹 5. CIDR Notation (Classless Inter-Domain Routing)

CIDR allows flexible IP allocation using *slash notation*.

Example:
```yaml
192.168.1.0/24
```


- **/24 = 24 bits for the network**  
- Equivalent to **255.255.255.0**

### Benefits of CIDR  
- ✔️ Reduces IP address waste  
- ✔️ Supports VLSM (Variable Length Subnet Masking)  
- ✔️ Enables more efficient routing  

---

## 🔹 6. Real-World Subnetting Example

Company Network:  
```yaml
192.168.10.0/24
```

Needs: **4 departments → 4 subnets**

Subnetting step:
- `/24` → `/26`

Each `/26` provides:
- **64 IP addresses total**  
- **62 usable hosts**

### Resulting Subnets:
- **192.168.10.0/26**  
- **192.168.10.64/26**  
- **192.168.10.128/26**  
- **192.168.10.192/26**  

📌 Common use case: isolating HR, IT, Finance, and Networking departments.

---

## ⭐ Key Takeaways

- 🔸 IPv4 = Network Portion + Host Portion  
- 🔸 Classes A/B/C are historical but still foundational  
- 🔸 Private IPs are for internal networks  
- 🔸 Subnet masks define network size  
- 🔸 CIDR allows efficient, flexible network subdivision  
- 🔸 Subnetting is essential in modern enterprise network design  

---

## 🙏 Special Thanks  
**[Eng. Hager Taha](https://www.linkedin.com/in/hager-taha-moustafa/)** — for her excellent instruction and clear explanations.  
**[Information Technology Institute (ITI)](https://www.linkedin.com/school/information-technology-institute-iti-/)** — for delivering a high-quality learning experience.

---

### 🏷️ Hashtags  
`#ITI #ComputerNetworks #CyberSecurity #NetworkingBasics #IPv4 #IPAddresses #Subnetting #CIDR #NetworkEngineering #NetworkDesign #PrivateIP #PublicIP #VLSM #AhmedMaher #ITInfrastructure #SubnetPlanning #NetworkingFundamentals`
