# StudentHub 

All-in-one student platform for flexible gigs, housing, navigation & community.  

StudentHub helps college students find irregular, one-off jobs like moving, lawn mowing and snow shovelling, along with off-campus housing, volunteer opportunities, campus navigation, international student resources and friend matching. We connect students with people who need help based on zip code and availability, so they can earn extra cash and build community during their spare time.

---

## 🛑 The Problem

Students often juggle coursework, extracurriculars and personal responsibilities. Finding flexible, one-off jobs in their local neighbourhood—jobs like helping a neighbour move, mowing a lawn or clearing snow—can be surprisingly difficult. Meanwhile, they must also hunt for off-campus housing, navigate unfamiliar campuses, connect with like-minded peers and locate essential services like visa consultants or tax advisors.  

There is no unified platform that brings all of these needs together.

---

## 💡 The Solution

StudentHub solves these challenges by providing a single hub for students:

- **Flexible Gigs Matching**: Connects students with hourly, irregular jobs posted by people in their community based on zip code and availability.  
- **Volunteer & Non-profit Opportunities**: Dedicated space to discover volunteering roles and non-profit internships.  
- **Housing Marketplace**: Find off-campus sublets and rentals by location, price and availability.  
- **Campus Navigation**: Door-to-door directions across campus using a hybrid routing system (campus graph + off-campus API).  
- **International Student Resources**: Curated visa consultants, university transfer guides, loans, SIM cards and tax assistance.  
- **Mate Matching**: AI-powered recommendation engine for study buddies, hobbies or projects.  
- **Organization Portals**: Dorms and clubs can create private job/help boards.  

---

## ⚙️ Technical Approach

- 🧠 **AI Matching**: Mate matching service uses worker threads + similarity scoring.  
- 📍 **Hybrid Navigation**: Dijkstra on static campus graph + third-party mapping API.  
- 🗄️ **Prisma ORM**: Models data in MongoDB with type-safe queries.  
- 🔌 **Concurrency**: Worker threads handle compute-heavy tasks like matching.  
- ♻️ **Extensible Modules**: Jobs, Housing, Volunteer, Internships, Books, International live in separate route folders with shared query/pagination logic.  

---

## 🏗️ System Architecture

Users & Orgs → Auth Service → Jobs API → Database
↓ ↓
Housing Navigation → Google API
↓ ↓
Internships Mates Worker
↓ ↓
International Resources


- Backend exposes REST endpoints (Express + Prisma).  
- Frontend consumes APIs via Next.js (shadcn/ui).  
- Worker threads handle mate matching.  

---

## 📚 Core Services

- **Auth & User Service** – Registration, login, RBAC (student/org admin/super admin).  
- **Jobs Service** – Jobs, volunteer roles, internships with CRUD, filters and application flow.  
- **Housing Service** – Off-campus rentals and subleases with zip, price and date filters.  
- **Navigation Service** – Campus routing hybrid algorithm with Dijkstra + mapping API.  
- **Mate Matching Service** – Buddy recommendations by similarity on majors/interests.  
- **International Service** – Visa, transfer, loan, SIM and tax resources.  
- **Organisation Service** – Private help boards for dorms/clubs.  
- **Books Exchange Service** – Buy/sell used books with search and pricing filters.  

---

## 🛠️ Technology Stack

**Backend & Data**  
- Node.js + Express  
- Prisma ORM (MongoDB)  
- Worker Threads (for mate matching)  
- `.env` configuration  

**Infrastructure**  
- Docker (backend + workers)  
- AWS / Vercel (backend → AWS, frontend → Vercel)  
- GitHub Actions (CI/CD)  

**Frontend**  
- Next.js 13 (App Router)  
- shadcn/ui + Tailwind CSS  
- TypeScript  

---

## 🔄 Data Flow & Processing

**Jobs & Housing Listings**  
1. Users/orgs post listings → API → Database → client UI.  
2. Students search/filter by zip, pay, price or schedule.  

**Mate Matching & Internships**  
1. Students submit preferences → worker thread computes similarity.  
2. Suggestions returned with top matches.  
3. Non-profit internships flagged via `meta.nonprofit`.  

**Navigation**  
1. API receives origin/destination.  
2. On-campus → Dijkstra (campus graph).  
3. Off-campus → third-party API directions.  
4. Hybrid route returned.  

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+  
- Docker & Docker Compose  
- `pnpm` or `npm`  

### Local Development

```bash
# Clone repo
git clone https://github.com/your-org/studenthub.git
cd studenthub
cd backend
pnpm install  # or npm install

# Copy env file
cp .env.example .env
# Set DATABASE_URI and GOOGLE_API_KEY

pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm run dev  # Express server → http://localhost:3001

cd ../frontend
pnpm install

# Copy env file
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to backend URL

pnpm run dev  # Next.js server → http://localhost:3000
```
Visit → http://localhost:3000

## Deployment

Backend → Docker image → AWS ECS/EKS/EC2 or Heroku.

Frontend → Vercel or Netlify (set NEXT_PUBLIC_API_URL).

Database → Managed MongoDB (Atlas / AWS DocumentDB).

## 🤝 Contributing

Contributions are welcome!

Open issues or PRs for bugs, improvements, or new features.

Ideas: scholarship boards, mental health resources, expanded international services.

Please check contributing guidelines before submitting.
