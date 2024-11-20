# CS3.401_Distributed_Systems
## Team ID : 45
## Team Members

<table border="1" style="border-collapse: collapse; width: 50%; text-align: left;">
  <thead>
    <tr>
      <th>Name</th>
      <th>Roll Number</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Vilal Ali</td>
      <td>2024701027</td>
      <td>Developer</td>
    </tr>
    <tr>
      <td>Shriom Tyagi</td>
      <td>2023900034</td>
      <td>Developer</td>
    </tr>
  </tbody>
</table>

## Project Title : Haystack - Dynamic Replication

## Introduction  
In distributed storage systems, particularly those designed to manage large datasets and high-throughput demands, traditional static replication strategies often fall short. These static methods lack adaptability to changing network conditions and varying user demands, leading to resource inefficiencies, latency spikes, and inconsistent data access times. As data access patterns evolve, so too should the replication strategy, allowing frequently accessed data to be available close to the end-user or critical application, while minimizing unnecessary storage and processing costs.

"Haystack - Dynamic Replication" addresses this issue by proposing a flexible, real-time approach to replication in distributed storage. Through dynamic replication, the system can adjust the number and location of data replicas based on real-time conditions such as server load, access frequency, and network latency. This adaptability is aimed at achieving an optimized balance between performance and resource usage, leading to a system capable of better handling load distribution and reducing latency in data access.

## Key Features: To implement this feature, we plan the following approach:
### Main Components are :
- **Replication Policy Engine:** This component will use real-time analytics to decide when and where replicas should be created, adjusted, or removed. The policy engine will factor in metrics like data access frequency, latency, and server load.
- **Data Placement Service:** A service to handle the physical replication and placement of data across storage nodes, orchestrating data transfer while minimizing disruption.
- **Monitoring and Metrics System:** A real-time monitoring system that captures performance metrics and provides the policy engine with the necessary data for decision-making.

## Prerequisites  
Ensure the following are installed on your system:  
- Node.js (version 16 or higher)  
- npm (Node Package Manager)  
- Git  

## Setup Instructions  
1. **Clone the Repository**  
   ```bash  
   git clone <repository_url>  
   cd sourceCode  
   ```  

2. **Install Dependencies**  
   Run the following command to install all required packages:  
   ```bash  
   npm install  
   ```  

3. **Start the System Components**  

   - Open **Terminal 1** and run:  
     ```bash  
     node dataPlacementService.js  
     ```  

   - Open **Terminal 2** and run:  
     ```bash  
     node monitoringService.js  
     ```  

   - Open **Terminal 3** and run:  
     ```bash  
     node replicationPolicyEngine.js  
     ```  

   - Open **Terminal 4** and run:  
     ```bash  
     node testReplication.js  
     ```  

## Live Demo  
 
## Detailed Report  
For an in-depth explanation of the system architecture, fault tolerance mechanisms, and performance benchmarks, please refer to the project documentation available in the repository.  

---
**Contact Team Members**:  
- Vilal Ali (2024701027)  
- Shriom Tyagi (2023900034)
- emailID: vilal.ali@research.iiit.ac.in
---

