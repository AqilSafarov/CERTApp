

<p align="center"><a href="https://github.com/AqilSafarov/hgg/tree/master">Download project report and slide</a></p>



<!-- ABOUT THE PROJECT -->
## About The Project

<img width="601" alt="Screenshot 2023-07-15 231903" src="https://github.com/AqilSafarov/AKMCapstoneProject/assets/75013710/34730505-90ae-49b7-b2db-5a90c444edd3">


The objective of this project was to develop a detection mechanism for brute force attacks using Splunk, a powerful security information and event management (SIEM) platform. The scope of the project focused specifically on identifying and mitigating brute force attacks against user accounts and passwords within an Active Directory Domain Services (AD DS) environment

## Objective and Scope
Brute force attacks are one of the most common methods used by attackers to gain unauthorized access to systems and sensitive data. By systematically attempting multiple combinations of usernames and passwords, attackers exploit weak credentials and security vulnerabilities. The consequences of successful brute force attacks can be severe, including unauthorized access, data breaches, and compromised user accounts.

The primary objective of this project was to enhance the security posture of the organization by developing an effective detection mechanism for brute force attacks within the AD DS environment. The focus was on quickly identifying and mitigating such attacks to prevent unauthorized access to user accounts and passwords.

## Importance of Detecting and Mitigating Brute Force Attacks

In an AD DS environment, where user accounts and passwords play a vital role in granting access to resources, detecting and mitigating brute force attacks is of paramount importance. The AD DS infrastructure forms the backbone of user authentication and authorization, making it a prime target for attackers seeking to exploit weak credentials. By effectively detecting and responding to brute force attacks, organizations can mitigate the risks associated with compromised user accounts, unauthorized access, and potential data breaches. Timely detection allows security teams to identify and neutralize attacks before they cause significant damage, protecting the organization's sensitive data, intellectual property, and reputation



<img width="731" alt="Screenshot 2023-07-15 232232" src="https://github.com/AqilSafarov/AKMCapstoneProject/assets/75013710/2c3d72bb-c8cd-4f82-a094-c1b91cce4da2">

### Methodology and Approach
To achieve the project objective, a systematic and comprehensive approach was adopted. The methodology involved the following key steps:

* Environment Setup: A fully featured AD DS environment was created, including the deployment of domain controllers, user accounts, and associated policies. This environment closely resembled a real-world scenario, ensuring the validity and accuracy of the project findings.
* SIEM Deployment: A centralized SIEM server was deployed, leveraging the capabilities of Splunk. The SIEM server acted as a central hub for collecting and analyzing logs from various endpoints within the AD DS environment
* Brute Force Attack Simulations: Various types of brute force attacks were simulated against the AD DS environment, targeting user accounts and passwords. These simulated attacks represented common techniques used by attackers and helped evaluate the effectiveness of the detection mechanism
* EventID Identification: Through extensive analysis of the generated logs, specific EventIDs associated with brute force attacks were identified. These EventIDs served as indicators of compromise and formed the basis for detection and alert generation in Splunk
* Detection Mechanism and Alert Generation: Using Splunk, a detection mechanism was implemented to identify and correlate the identified EventIDs in real-time. Custom alert rules and dashboards were created to promptly notify security personnel of potential brute force attacks, allowing them to initiate appropriate response measures
* Verification and Mitigation: The effectiveness of the detection mechanism was verified by conducting additional brute force attack simulations and assessing the system's ability to detect and respond to them. Mitigation measures, such as account lockouts, password complexity policies, and multi-factor authentication, were recommended to enhance the security posture and resilience against brute force attacks



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### System Specifications for All Machines


* **Domain Controller (Windows Server 2019)**
- [x] CPUs: 2 CPUs.
- [x] RAM: 2048 MB (2GB).
- [x] Disk Space: 40 GB.
- [x] Hyper-V Virtual Machine: Generation 1
- [x] Network Connection: Connected to the Capstone NAT network

* **Splunk Machine (Windows Server 2019)**
- [x] CPUs: 4 CPUs.
- [x] RAM: 8 GB.
- [x] Disk Space: 40 GB.
- [x] Hyper-V Virtual Machine: Generation 1
- [x] Network Connection: Connected to the Capstone NAT network

* **Windows 10 Machines (3)**
- [x] CPUs: 4 CPUs.
- [x] RAM: 2048 MB (2GB) each.
- [x] Disk Space: 40 GB each.
- [x] Hyper-V Virtual Machine: Generation 1
- [x] Each machine is connected to the Capstone NAT network

* **Commando VM Machine (Windows 10 21H1)**
- [x] CPUs: 4 CPUs.
- [x] RAM: 4+ GB.
- [x] Disk Space: 80+ GB.
- [x] Hyper-V Virtual Machine: Generation 1
- [x] Network Connection: Initially, select the Default Switch during Commando VM installation. After installation, change this to the Capstone NAT network


<p align="right">(<a href="#readme-top">back to top</a>)</p>







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
