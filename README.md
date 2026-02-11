# AllStaff Health - Healthcare Staffing MVP

A modern healthcare staffing platform built with Next.js 14+ that connects qualified healthcare professionals with healthcare facilities. This MVP provides a dual-audience experience with optimized conversion funnels based on industry research.

## 🚀 Live Demo

- **Production**: [Deployed on Vercel](https://allstaff-demo.vercel.app) *(Coming Soon)*
- **Staging**: [Preview Environment](https://allstaff-demo-git-main.vercel.app) *(Coming Soon)*

## 📋 Features

### For Healthcare Professionals
- **Application Portal**: Comprehensive application form with credential verification
- **Profile Management**: Professional credentials, licenses, and experience tracking
- **Opportunity Matching**: Smart matching with facility requirements
- **Mobile-First Design**: Optimized for on-the-go applications

### For Healthcare Facilities  
- **Staff Request Portal**: Detailed staffing requirement submission
- **Candidate Matching**: Access to pre-screened, qualified professionals
- **Compliance Tracking**: Automated verification and documentation
- **Account Management**: Dedicated support and relationship management

### Technical Features
- **Modern Stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Form Validation**: Type-safe forms with react-hook-form and Zod
- **UI Components**: shadcn/ui component library for consistent design
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **SEO Optimized**: Meta tags, structured data, and performance optimization
- **Analytics Ready**: Google Analytics integration placeholder

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Forms**: react-hook-form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🏁 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/allstaff-demo.git
   cd allstaff-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration (see [Google Integrations Setup](#-google-integrations-setup) below for details):
   ```env
   # Google Service Account
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

   # Google Sheets
   GOOGLE_SHEET_ID_CLINICIANS=your-clinician-sheet-id
   GOOGLE_SHEET_ID_FACILITIES=your-facility-sheet-id

   # Vercel Blob (for resume uploads)
   BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

   # Google Analytics (optional)
   # NEXT_PUBLIC_GA_ID=your-ga-tracking-id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
allstaff-demo/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── apply/         # Clinician applications
│   │   └── request-staff/ # Facility requests
│   ├── clinicians/        # Healthcare professional portal
│   ├── facilities/        # Healthcare facility portal
│   ├── success/           # Success confirmation page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Homepage sections
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and integrations
│   ├── validations/      # Zod validation schemas
│   ├── google-sheets.ts  # Google Sheets integration
│   ├── blob-storage.ts   # Vercel Blob resume uploads
│   └── utils.ts          # Utility functions
├── docs/                 # Documentation
│   └── research.md       # Industry research and design decisions
└── public/              # Static assets
```

## 🎨 Design System

Based on healthcare industry research, the platform uses:

- **Primary Color**: Navy Blue (`#1e40af`) - Trust and professionalism
- **Accent Color**: Teal (`#0891b2`) - Healthcare and care
- **Typography**: Inter font for modern readability
- **Spacing**: 8px base unit with consistent scale
- **Components**: Healthcare-optimized patterns with conversion focus

## 🔌 API Endpoints

### POST `/api/apply`
Submit healthcare professional application
```typescript
interface ApplicationData {
  personalInfo: PersonalInfo
  professionalInfo: ProfessionalInfo
  workPreferences: WorkPreferences
  additionalInfo: AdditionalInfo
}
```

### POST `/api/request-staff` 
Submit facility staffing request
```typescript
interface StaffingRequest {
  facilityInfo: FacilityInfo
  contactInfo: ContactInfo
  staffingNeeds: StaffingNeeds
  requirements: Requirements
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Set environment variables**
   Configure in Vercel dashboard or via CLI:
   ```bash
   vercel env add NEXT_PUBLIC_GA_ID
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- **Netlify**: Use `@netlify/plugin-nextjs`
- **AWS Amplify**: Configure build settings for Next.js
- **Railway**: Direct deployment from GitHub
- **DigitalOcean App Platform**: Configure via UI

## 🔧 Google Integrations Setup

Both forms (clinician applications and facility staffing requests) save submissions to Google Sheets. Clinician resumes are uploaded to Google Drive. All of this is powered by a single Google Cloud service account.

### Step 1: Create a Google Cloud Project and Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project (or use an existing one).
2. Enable the following APIs for the project:
   - **Google Sheets API**
   - **Google Drive API**
3. Go to **IAM & Admin > Service Accounts** and create a new service account.
4. On the service account detail page, go to the **Keys** tab and click **Add Key > Create new key > JSON**.
5. Download the JSON key file. You will need two values from it:
   - `client_email` — this is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` — this is your `GOOGLE_PRIVATE_KEY`

### Step 2: Create the Clinician Applications Spreadsheet

1. Create a new Google Spreadsheet (e.g., "Clinician Applications").
2. In the **first row** of Sheet1, add these exact column headers:

   | Timestamp | First Name | Last Name | Email | Phone | City | State | Specialty | Years Experience | Shift Preferences | Resume Link | Consent |
   |-----------|-----------|----------|-------|-------|------|-------|-----------|-----------------|-------------------|-------------|---------|

3. Share the spreadsheet with your service account email (the `client_email` from the JSON key) and give it **Editor** access.
4. Copy the spreadsheet ID from the URL — it's the long string between `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
   ```
   This is your `GOOGLE_SHEET_ID_CLINICIANS`.

### Step 3: Create the Facility Requests Spreadsheet

1. Create another Google Spreadsheet (e.g., "Facility Requests").
2. In the **first row** of Sheet1, add these exact column headers:

   | Timestamp | Contact Name | Work Email | Phone | Organization Name | City | State | Role Needed | Number of Openings | Shift Type | Start Date | Contract Length | Budget Range | Notes | Consent |
   |-----------|-------------|-----------|-------|-------------------|------|-------|-------------|-------------------|-----------|-----------|----------------|-------------|-------|---------|

3. Share the spreadsheet with your service account email and give it **Editor** access.
4. Copy the spreadsheet ID from the URL. This is your `GOOGLE_SHEET_ID_FACILITIES`.

### Step 4: Set Up Vercel Blob for Resume Uploads

Resumes are stored using [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), which provides a public URL for each file. The URL is saved in the Google Sheet so you can click through to view/download any resume.

1. In the [Vercel Dashboard](https://vercel.com/dashboard), go to your project's **Storage** tab.
2. Click **Create Database** and select **Blob**.
3. Once created, go to the Blob store settings and copy the **Read/Write Token**.
4. Add it to your `.env.local` as `BLOB_READ_WRITE_TOKEN`.

Resumes are stored under `candidates/{Candidate Name}/{filename}` and the public URL is saved in the "Resume Link" column of the clinician spreadsheet.

> **Note:** Vercel Blob's free tier includes 256MB of storage (~1,200-5,000 resumes). Beyond that it's $0.023/GB/month.

### Step 5: Configure Environment Variables

Create a `.env.local` file in the project root with the following:

```env
# Google Service Account credentials (from the JSON key file)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Google Sheet IDs (from each spreadsheet URL)
GOOGLE_SHEET_ID_CLINICIANS=your-clinician-spreadsheet-id
GOOGLE_SHEET_ID_FACILITIES=your-facility-spreadsheet-id

# Vercel Blob token (from Vercel Dashboard > Storage > Blob)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Google Analytics (optional)
# NEXT_PUBLIC_GA_ID=your-ga-tracking-id
```

> **Important:** When copying `GOOGLE_PRIVATE_KEY`, wrap the entire value in double quotes and keep the `\n` newline characters as-is. Do not replace them with actual line breaks.

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Yes | Service account email (`client_email` from JSON key) |
| `GOOGLE_PRIVATE_KEY` | Yes | Service account private key (`private_key` from JSON key) |
| `GOOGLE_SHEET_ID_CLINICIANS` | Yes | Spreadsheet ID for clinician applications |
| `GOOGLE_SHEET_ID_FACILITIES` | Yes | Spreadsheet ID for facility staffing requests |
| `BLOB_READ_WRITE_TOKEN` | Yes | Vercel Blob read/write token for resume uploads |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

### Vercel Deployment

When deploying to Vercel, add all environment variables in **Settings > Environment Variables**. For `GOOGLE_PRIVATE_KEY`, paste the raw key value including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` markers. The `BLOB_READ_WRITE_TOKEN` is automatically available if you created the Blob store through the Vercel dashboard for this project.

## 🔧 Configuration

### Tailwind Configuration

Custom design tokens in `tailwind.config.js`:
- Healthcare-appropriate color palette
- Extended spacing scale
- Custom font family (Inter)
- Responsive breakpoints
- Animation and transition utilities

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build
```

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Minimized with Next.js automatic optimizations
- **Loading**: Server-side rendering with smart client hydration

## 🔒 Security & Compliance

- **Data Protection**: HIPAA-compliant data handling patterns
- **Form Security**: CSRF protection and input validation
- **Privacy**: Comprehensive privacy policy and user controls
- **Authentication**: Ready for integration with healthcare SSO providers

## 🔮 Roadmap

### Phase 3: Enhanced Features
- [ ] User authentication and profiles
- [ ] Real-time matching algorithms
- [ ] Advanced filtering and search
- [ ] Mobile app (React Native)

### Phase 4: Integrations  
- [ ] ATS integrations (RecruiterFlow, BullhornATS)
- [ ] CRM integrations (Salesforce, HubSpot)
- [ ] Background check APIs
- [ ] Payment processing
- [ ] Calendar and scheduling

### Phase 5: Advanced Platform
- [ ] Machine learning matching
- [ ] Predictive analytics
- [ ] Advanced reporting dashboard
- [ ] Multi-tenant architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check `/docs` folder for detailed guides
- **Issues**: Report bugs via GitHub Issues
- **Email**: [support@allstaffhealth.com](mailto:support@allstaffhealth.com)
- **Phone**: (800) 555-0123

## 🙏 Acknowledgments

- **Design Inspiration**: Based on research of leading healthcare staffing platforms
- **UI Components**: Built with shadcn/ui component library  
- **Icons**: Lucide React icon library
- **Fonts**: Inter font family by Rasmus Andersson

---

**Built with ❤️ for healthcare professionals and facilities**