# Axiom Token Trading Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and modern React patterns.

## Features

- ✅ Three token columns (New Pairs, Final Stretch, Migrated)
- ✅ Real-time price updates with WebSocket mock
- ✅ Smooth color transitions for price changes
- ✅ Multiple interaction patterns (hover effects, click actions)
- ✅ Popover, tooltip, and modal components
- ✅ Sorting functionality for each column
- ✅ Priority filtering (P1, P2, P3)
- ✅ Loading states (skeleton, shimmer, progressive loading)
- ✅ Error boundaries for graceful error handling
- ✅ Pixel-perfect dark theme UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main Pulse page
│   ├── providers.tsx       # Redux & React Query providers
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── Header.tsx          # App header
│   ├── Footer.tsx          # App footer
│   ├── TokenColumn.tsx     # Token column with sorting
│   ├── TokenCard.tsx       # Individual token card
│   ├── TokenModal.tsx     # Token details modal
│   └── ErrorBoundary.tsx   # Error boundary component
├── store/                  # Redux store
│   ├── store.ts            # Store configuration
│   ├── slices/             # Redux slices
│   └── hooks.ts            # Typed Redux hooks
├── hooks/                  # Custom React hooks
│   ├── useTokenData.ts     # Token data fetching
│   └── useWebSocket.ts     # WebSocket mock hook
├── lib/                    # Utilities and types
│   ├── utils.ts            # Utility functions
│   ├── types.ts            # TypeScript types
│   ├── constants.ts        # Constants and dummy data
│   └── react-query.ts      # React Query config
└── public/                 # Static assets
```

## Architecture

### Atomic Design Principles

- **Components**: Reusable, memoized components
- **Hooks**: Custom hooks for data fetching and WebSocket
- **Store**: Centralized state management with Redux Toolkit
- **Utilities**: Shared utility functions and types

### Performance Optimizations

- React.memo for component memoization
- useMemo and useCallback for expensive computations
- React Query for efficient data caching
- Optimized re-renders with Redux selectors

### Code Quality

- Strict TypeScript configuration
- Comprehensive error handling
- Documented complex logic
- DRY principles throughout

## Features in Detail

### Real-time Updates

The app includes a WebSocket mock that simulates real-time price updates every 2 seconds. Price changes trigger smooth color transitions (green for increases, red for decreases).

### Sorting & Filtering

Each column supports:
- Multiple sort options (price, volume, liquidity, change, market cap)
- Ascending/descending sort direction
- Priority filtering (P1, P2, P3)

### Loading States

- Skeleton loaders during initial data fetch
- Progressive loading for better UX
- Error boundaries for graceful error handling

### Interactions

- **Hover effects**: Cards scale and show additional information
- **Click actions**: Open detailed token modal
- **Tooltips**: Hover over token symbols for names
- **Popovers**: Click cards for quick token details
- **Modals**: Full token information on click

## License

MIT

