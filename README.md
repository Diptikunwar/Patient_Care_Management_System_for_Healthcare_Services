# MediCore Health — Patient Care Management System

An integrated patient care management platform for healthcare services, built with **TanStack Start**, **React 19**, and **Tailwind CSS**. MediCore provides purpose-built, role-based dashboards for hospital administrators, doctors, and patients — bringing appointments, records, prescriptions, billing, and reporting into a single connected workspace.

## ✨ Features

MediCore ships with three dedicated portals, each tailored to its user role:

### 🛡️ Admin
- **Dashboard** — hospital-wide KPIs, visit/admission trends, and revenue charts
- **Appointments** — view and manage appointments across the facility
- **Doctors** — manage physician records and schedules
- **Patients** — manage the patient directory
- **Billing** — track invoices and payments
- **Reports** — operational and financial reporting
- **Settings & Profile** — account and system configuration

### 🩺 Doctor
- **Dashboard** — daily schedule and patient overview
- **Patients** — assigned patient list and details
- **Schedule** — appointment calendar management
- **Records** — patient medical records
- **Prescriptions** — issue and manage prescriptions
- **Lab Reports** — review lab results
- **Messages** — secure patient/staff messaging
- **Profile** — physician account settings

### 🧑‍⚕️ Patient
- **Dashboard** — upcoming appointments and health summary
- **Appointments & Booking** — view and book appointments
- **History** — visit and treatment history
- **Prescriptions** — active and past prescriptions
- **Lab Reports** — personal lab results
- **Billing** — invoices and payment history
- **Profile** — personal account settings

Authentication is role-based (Admin / Doctor / Patient), with each role landing on its own dashboard shell after sign-in.

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) (file-based routing via [TanStack Router](https://tanstack.com/router)) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) on top of [Radix UI](https://www.radix-ui.com/) primitives |
| Data & Forms | [TanStack Query](https://tanstack.com/query), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide](https://lucide.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Language | TypeScript |
| Package Manager | [Bun](https://bun.sh/) |

## 📁 Project Structure

```
Patient_Care_Management_System_for_Healthcare_Services/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── dashboard-shell.tsx    # Shared layout/shell for dashboards
│   │   ├── dashboard-widgets.tsx  # Reusable stat cards, panels, etc.
│   │   └── ui/                    # shadcn/ui component library
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── auth.ts            # Role-based session handling
│   │   └── utils.ts           # Shared utilities
│   ├── routes/                 # File-based routes (TanStack Router)
│   │   ├── admin.*.tsx         # Admin portal pages
│   │   ├── doctor.*.tsx        # Doctor portal pages
│   │   ├── patient.*.tsx       # Patient portal pages
│   │   ├── login.tsx           # Sign-in page
│   │   └── index.tsx           # Landing route (redirects by session)
│   ├── router.tsx              # Router setup
│   ├── server.ts                # SSR server entry
│   ├── start.ts                 # App/middleware bootstrap
│   └── styles.css               # Global styles / Tailwind entry
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- npm/yarn/pnpm if not using Bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Patient_Care_Management_System_for_Healthcare_Services

# Install dependencies
bun install
```

### Development

```bash
bun run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build

```bash
bun run build
```

### Preview production build

```bash
bun run preview
```

### Linting & Formatting

```bash
bun run lint
bun run format
```

## 🔐 Authentication

Sign-in is role-based: from the login screen, choose **Admin**, **Doctor**, or **Patient**, and you'll be routed to the corresponding portal. Session state is currently stored client-side (`localStorage`) for demo purposes — swap in your own authentication/authorization backend before deploying to production.

## 📌 Notes

- Data displayed across dashboards (appointments, patients, visit trends, etc.) is currently mock/sample data intended to demonstrate the UI — connect it to a real backend/database for production use.
- Routing is file-based; see `src/routes/README.md` for TanStack Router conventions used in this project.
- `src/routeTree.gen.ts` is auto-generated — do not edit by hand.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).
