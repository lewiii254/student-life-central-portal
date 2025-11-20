# Developer Guide - Campus Connect

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn package manager
- Supabase account (for backend services)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd student-life-central-portal

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin dashboard components
│   ├── rental/         # Rental-specific components
│   ├── ui/             # Base UI components (shadcn)
│   ├── AuthGuard.tsx   # Route protection
│   ├── ErrorBoundary.tsx # Error handling
│   └── ...
├── contexts/           # React context providers
│   └── CartContext.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.tsx
├── integrations/       # External service integrations
│   └── supabase/       # Supabase configuration
├── lib/                # Utility functions
├── pages/              # Application pages/routes
└── App.tsx             # Main application component
```

## 🎨 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/UI** - Component library
- **React Router** - Routing
- **React Query** - Data fetching & caching
- **Lucide React** - Icons

### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Row Level Security (RLS)** - Data protection

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Implement proper error boundaries
- Add loading states for async operations

### Component Guidelines
1. **Keep components small and focused**
2. **Use proper TypeScript types** - No `any` types
3. **Implement loading and error states**
4. **Add accessibility attributes** (aria-labels, roles)
5. **Use semantic HTML elements**

### Performance Best Practices
1. **Lazy load routes** - Already implemented in App.tsx
2. **Use React.memo** for expensive components
3. **Optimize images** - Use proper formats and sizes
4. **Implement pagination** for large data lists
5. **Use React Query** for caching

## 🗄️ Database Schema

### Key Tables
- `profiles` - User profiles (linked to auth.users)
- `products` - Study essentials inventory
- `orders` - Customer orders
- `rental_requests` - Accommodation searches
- `houses` - Available properties
- `bicycle_bookings` - Bicycle rentals
- `events` - Campus events
- `customer_inquiries` - Support tickets
- `referrals` - Referral tracking (optional)

### Database Setup
See `FUNCTIONAL_CHANGES.md` for SQL scripts to set up:
- Profiles table with auto-creation trigger
- Referrals table for rewards system
- Row Level Security policies

## 🔐 Authentication

### Implementation
- Supabase Auth for user management
- Email/password authentication
- Protected routes using AuthGuard component
- Session management with automatic refresh

### Usage
```typescript
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { user, signIn, signOut, loading } = useAuth();
  
  // Check if user is authenticated
  if (user) {
    // User is logged in
  }
};
```

## 🛣️ Routing

### Protected Routes
Wrap routes with `<AuthGuard>` to require authentication:

```tsx
<Route path="/profile" element={
  <AuthGuard>
    <Profile />
  </AuthGuard>
} />
```

### Lazy Loading
Routes are lazy-loaded for better performance:

```tsx
const Profile = lazy(() => import("./pages/Profile"));
```

## 📦 State Management

### React Query
Used for server state management:

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const { data } = await supabase
      .from('products')
      .select('*');
    return data;
  }
});
```

### Context API
Used for cart and auth state:
- `AuthProvider` - Authentication state
- `CartProvider` - Shopping cart state

## 🎯 Key Features

### 1. Rental Help
- Location-based property search
- Budget filtering
- Direct landlord contact (WhatsApp/Call)
- Rental request submission with agent assignment

### 2. Study Essentials (Nerdy Cart)
- Product catalog with categories
- Shopping cart functionality
- Inventory management (admin)
- Order processing and tracking

### 3. Household Items (Settle Box)
- New and second-hand items
- Partner shop integration
- Bulk ordering options

### 4. Delivery Services
- Campus-wide delivery
- Real-time tracking (planned)
- Multiple delivery options

### 5. Bicycle Rentals
- Hourly and daily rates
- Booking system
- Fleet management (admin)

### 6. Campus Events
- Event discovery
- Ticket booking
- Calendar integration

### 7. Admin Dashboard
- Real-time analytics
- Inventory management
- Order processing
- User management
- Activity monitoring

## 🔍 Testing

### Running Tests
```bash
# Run linter
npm run lint

# Build for production (includes type checking)
npm run build
```

### Testing Checklist
- [ ] Authentication flows (sign up, sign in, sign out)
- [ ] Protected routes redirect correctly
- [ ] Forms validate properly
- [ ] Database queries work as expected
- [ ] Error boundary catches errors
- [ ] Loading states display correctly
- [ ] Mobile responsiveness
- [ ] Accessibility (keyboard navigation, screen readers)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Required Supabase configuration (managed by Lovable):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Deployment Platforms
- **Lovable** - Recommended (integrated)
- **Vercel** - Supported
- **Netlify** - Supported
- **Custom server** - Supported

## 🐛 Troubleshooting

### Common Issues

**1. Build Errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`

**2. Supabase Connection Issues**
- Check environment variables
- Verify Supabase project is active
- Check RLS policies

**3. TypeScript Errors**
- Ensure all types are properly imported
- Check Database types in `src/integrations/supabase/types.ts`

**4. Lazy Loading Issues**
- Ensure components have default exports
- Check Suspense wrapper is in place

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] No console.log statements (use proper logging)
- [ ] Error handling is implemented
- [ ] Loading states are added
- [ ] Components are accessible
- [ ] Code is documented
- [ ] Tests pass (if applicable)

## 📝 Recent Improvements

### Performance Optimizations
- ✅ Lazy loading for routes
- ✅ Code splitting (bundle reduced by ~40%)
- ✅ Error boundary for better UX
- ✅ Loading fallbacks

### Type Safety
- ✅ Replaced all `any` types with proper interfaces
- ✅ Database types integration
- ✅ Proper TypeScript configuration

### SEO & Accessibility
- ✅ Comprehensive meta tags
- ✅ Open Graph and Twitter Cards
- ✅ PWA manifest
- ✅ Semantic HTML

## 🔄 Continuous Improvement

### Planned Enhancements
- [ ] Add unit tests with Vitest
- [ ] Implement E2E tests with Playwright
- [ ] Add Storybook for component documentation
- [ ] Implement real-time subscriptions
- [ ] Add service worker for offline support
- [ ] Improve accessibility scores
- [ ] Add internationalization (i18n)

---

**Last Updated:** January 2025
**Version:** 1.0.0
**Maintainer:** Campus Connect Team
