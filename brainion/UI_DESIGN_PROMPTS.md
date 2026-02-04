# UI Design Prompts for Brainion

## 🎨 Prompt for Lovable.dev

```
Create a modern, professional AI curriculum generator web application with the following specifications:

APP NAME: Brainion - AI Curriculum Generator

OVERALL DESIGN:
- Modern, clean aesthetic with glassmorphism effects
- Gradient accents (purple to blue: #667eea to #764ba2)
- Soft shadows and rounded corners throughout
- Ample white space for breathing room
- Professional typography with clear hierarchy

LAYOUT STRUCTURE:
1. Header (sticky):
   - App logo/name on left with brain icon
   - Gradient background (purple to indigo)
   - Dark mode toggle button on right
   - Subtle shadow on scroll

2. Main Layout (2-column on desktop, stacked on mobile):
   
   LEFT SIDEBAR (320px fixed width):
   - White card with subtle shadow
   - Sticky positioning
   - Tabbed interface:
     * "New Curriculum" tab (default)
     * "History" tab
     * "Settings" tab
   
   NEW CURRICULUM TAB:
   - Input fields with floating labels
   - Topic input (text) with search icon
   - Duration slider with visual week indicators (1-12)
   - Level selector (segmented control: Beginner/Intermediate/Advanced)
   - Advanced options (collapsible accordion):
     * Time per day slider (1-4 hours)
     * Focus type dropdown (Theory/Project-based/Balanced/Practice)
     * Prerequisites textarea
   - Generate button (gradient, prominent)
   
   HISTORY TAB:
   - List of saved curricula (cards)
   - Each card shows: topic, duration, level, date, progress %
   - Hover effect with load/delete actions
   - Empty state illustration if no history
   
   RIGHT MAIN AREA:
   - Full width, white background
   - Curriculum display area
   
3. Curriculum Display:
   
   LOADING STATE:
   - Animated skeleton loaders
   - Pulsing shimmer effect
   - "AI is crafting your curriculum..." with animated dots
   - Progress indicator (0-100%)
   
   CURRICULUM VIEW:
   - Header with topic, export buttons (PDF, Markdown, Share)
   - Progress bar showing overall completion
   - Week sections (accordion style):
     * Week header with number and expand/collapse icon
     * Week progress indicator
     * Gradient left border (different color per week)
   
   DAY CARDS (grid layout, 5 per week):
   - Card design:
     * White background with border
     * Hover effect: lift up with shadow
     * Day number badge (top-left corner)
     * Checkbox (top-right) for completion
     * Day title (bold, medium size)
     * Objectives list (3-5 items with custom bullet points)
     * Estimated time badge (bottom)
     * "Add Note" icon button (bottom-right)
   - Card states:
     * Default: white with border
     * Hover: elevated shadow, slight scale
     * Completed: green checkmark, muted background
     * Active: blue left border accent

INTERACTIVE ELEMENTS:

Progress Tracking:
- Checkboxes with smooth animation
- Progress bar fills with gradient
- Completion celebration (confetti animation)

Notes System:
- Modal overlay (glassmorphic)
- Rich text editor with toolbar
- Save/Cancel buttons
- Note indicator dot on cards

Export Options:
- Dropdown menu from export button
- Icons for each format (PDF, MD, Share)
- Copy link notification toast

COLORS:
Primary: #667eea (purple-blue)
Secondary: #764ba2 (deep purple)
Success: #10b981 (green)
Warning: #f59e0b (amber)
Danger: #ef4444 (red)
Text: #1f2937 (dark gray)
Text Secondary: #6b7280 (medium gray)
Background: #f9fafb (light gray)
Card: #ffffff (white)
Border: #e5e7eb (light border)

DARK MODE:
Background: #0f172a (dark blue-gray)
Card: #1e293b (slate)
Text: #f1f5f9 (light)
Text Secondary: #94a3b8
Border: #334155
Maintain gradient accents

TYPOGRAPHY:
Headings: Inter or Poppins (bold, 600-700 weight)
Body: Inter or System font stack
Sizes: 
- H1: 2rem
- H2: 1.5rem
- H3: 1.25rem
- Body: 1rem
- Small: 0.875rem

ANIMATIONS:
- Smooth transitions (200-300ms)
- Ease-in-out timing
- Fade-in for content loading
- Slide-in for modals
- Hover effects on all interactive elements
- Loading spinners for API calls

RESPONSIVE BREAKPOINTS:
- Mobile: < 768px (single column, collapsible sidebar)
- Tablet: 768px - 1024px (adjusted spacing)
- Desktop: > 1024px (full 2-column layout)

ACCESSIBILITY:
- High contrast ratios (WCAG AA)
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader labels
- Touch targets minimum 44x44px

ADDITIONAL FEATURES:
- Toast notifications (top-right corner)
- Empty states with illustrations
- Error states with helpful messages
- Loading states for all async operations
- Smooth scroll behavior
- Tooltips on icon buttons

COMPONENT INSPIRATION:
- Similar to: Notion, Linear, Vercel Dashboard
- Modern SaaS application aesthetic
- Clean, minimal, professional
- Focus on content and usability
```

---

## 🤖 Prompt for Google Jules / Claude / ChatGPT

```
Design a modern, professional web application UI for "Brainion" - an AI-powered curriculum generator. The app should feel like a premium SaaS product (similar to Notion, Linear, or Vercel).

CORE FUNCTIONALITY:
Users input: topic to learn, duration (weeks), skill level
AI generates: structured weekly curriculum with daily objectives
Users can: track progress, add notes, export, save history

UI REQUIREMENTS:

1. LAYOUT:
- Header: gradient purple/blue with app name and dark mode toggle
- Two-column layout (desktop): 320px left sidebar + flexible main area
- Sidebar has tabs: New Curriculum, History, Settings
- Responsive: stacks on mobile, sidebar becomes drawer

2. INPUT SECTION (Sidebar):
- Clean form with floating labels
- Topic text input with icon
- Duration slider with visual indicators (1-12 weeks)
- Level selector: segmented button control (Beginner/Intermediate/Advanced)
- Collapsible "Advanced Options":
  * Time per day slider (1-4 hours)
  * Focus type dropdown
  * Prerequisites textarea
- Prominent gradient "Generate" button
- Validation: show errors inline, disable button if invalid

3. CURRICULUM DISPLAY (Main Area):

LOADING STATE:
- Skeleton loaders with shimmer animation
- "AI is crafting your curriculum..." message
- Progress percentage

CURRICULUM VIEW:
- Header bar with export actions (PDF, Markdown, Share link)
- Overall progress bar (shows % completion)
- Week sections (expandable accordions):
  * Week header with number
  * Progress indicator per week
  * Colored left border (different color per week)
  
- Day cards in grid (5 per row on desktop):
  * White card with subtle shadow
  * Checkbox (top-right) for marking complete
  * Day number badge (top-left)
  * Day title (bold)
  * 3-5 learning objectives (custom bullets)
  * Estimated time badge
  * "Add note" button
  * Hover: lift up with larger shadow
  * Completed: checkmark, muted background with green tint
  * Smooth animations on all interactions

4. INTERACTIVE FEATURES:

Progress Tracking:
- Click checkbox to mark day complete
- Progress bar updates with smooth animation
- Visual feedback (green highlight, checkmark)
- Persist state across sessions

Notes System:
- Click "Add note" opens modal
- Glassmorphic backdrop blur
- Rich text editor (basic formatting)
- Save to local storage
- Indicator dot on cards with notes

Export Options:
- Button with dropdown menu
- PDF, Markdown, Share link options
- Copy notification toast

History:
- List of saved curricula in sidebar
- Card preview: topic, date, progress %
- Load or delete actions
- Empty state with illustration

5. DESIGN SYSTEM:

Colors:
- Primary: Purple-blue gradient (#667eea to #764ba2)
- Success: Emerald green (#10b981)
- Background: Light gray (#f9fafb)
- Cards: White (#ffffff)
- Text: Dark gray (#1f2937)
- Borders: Light border (#e5e7eb)

Dark Mode:
- Background: Dark blue-gray (#0f172a)
- Cards: Slate (#1e293b)
- Text: Light (#f1f5f9)
- Keep gradient accents

Typography:
- Font: Inter or similar modern sans-serif
- Clear hierarchy (2rem/1.5rem/1.25rem/1rem)
- Medium to bold weights for headings

Spacing:
- Consistent 8px grid system
- Ample padding (1.5rem for cards)
- Comfortable white space

Components:
- Rounded corners (8-12px)
- Soft shadows (subtle elevation)
- Smooth transitions (200-300ms)
- Glassmorphism effects on modals

6. INTERACTIONS:

Micro-animations:
- Fade in content on load
- Smooth hover effects (scale, shadow)
- Button press feedback
- Progress bar fill animation
- Checkbox check animation
- Toast slide-in from top-right

States:
- Loading: skeletons, spinners
- Empty: friendly illustrations, helpful text
- Error: clear messaging, retry options
- Success: subtle celebration (optional confetti)

7. RESPONSIVE DESIGN:
- Mobile: single column, burger menu for sidebar, touch-optimized
- Tablet: adjusted spacing, 2-3 cards per row
- Desktop: full layout, 5 cards per row

8. ACCESSIBILITY:
- High contrast (WCAG AA)
- Keyboard navigation
- Focus indicators
- Screen reader support
- Touch targets 44x44px minimum

INSPIRATION REFERENCES:
- Notion: clean, minimal cards
- Linear: smooth animations, modern colors
- Vercel: professional, gradient accents
- Stripe: clear hierarchy, excellent spacing

GOAL: Create a UI that feels premium, is highly usable, and makes learning curriculum planning feel delightful and effortless.
```

---

## 📱 Additional Mobile-Specific Prompt

```
Optimize Brainion for mobile devices:

MOBILE LAYOUT:
- Full-width single column
- Sticky header with hamburger menu
- Sidebar becomes slide-out drawer from left
- Curriculum cards stack vertically (1 per row)
- Larger touch targets (minimum 48x48px)
- Bottom navigation bar with quick actions:
  * Generate (center, prominent FAB)
  * History
  * Settings

GESTURES:
- Swipe to dismiss toasts
- Pull to refresh curriculum
- Swipe day cards for quick actions (complete/delete)
- Long press for context menu
- Pinch to zoom on curriculum view

MOBILE OPTIMIZATIONS:
- Reduce animations for performance
- Lazy load curriculum sections
- Compress images and assets
- Use native-feeling components
- Bottom sheets instead of modals
- Haptic feedback on interactions

PERFORMANCE:
- First Contentful Paint < 1.5s
- Smooth 60fps scrolling
- Minimal bundle size
- Progressive Web App (PWA) ready
- Offline support for saved curricula
```

---

## 🎯 Quick Component Reference

### Key UI Components to Implement:

1. **Input Form Card** - Floating labels, validation, smooth focus states
2. **Curriculum Week Accordion** - Expandable sections with smooth animations
3. **Day Learning Card** - Hoverable cards with checkbox, objectives list, badges
4. **Progress Bar** - Animated fill with gradient, percentage display
5. **Export Button Menu** - Dropdown with icons and actions
6. **History List Item** - Clickable cards with metadata and actions
7. **Notes Modal** - Glassmorphic overlay with rich text editor
8. **Toast Notification** - Slide-in alerts from top-right
9. **Skeleton Loader** - Shimmer effect for loading states
10. **Empty State** - Illustration with helpful message
11. **Error State** - Clear error message with retry button
12. **Dark Mode Toggle** - Smooth transition between themes

---

## 🔗 Design Resources

**Color Palette Generator**: https://coolors.co/667eea-764ba2-10b981-f59e0b-ef4444

**Icon Library**: Use Heroicons, Lucide, or Feather Icons for consistent modern icons

**Illustration Libraries**: 
- unDraw (https://undraw.co) for empty states
- Storyset (https://storyset.com) for onboarding

**Font**: Inter (https://fonts.google.com/specimen/Inter)

**Animations**: Framer Motion for React animations

---

## 💡 Pro Tips for Implementation

1. **Use CSS Variables** for theme switching (light/dark mode)
2. **Implement skeleton loaders** before content loads
3. **Add micro-interactions** on buttons, checkboxes, cards
4. **Use proper z-index layers** (header: 50, modals: 100, toasts: 200)
5. **Optimize images** with WebP format
6. **Use lazy loading** for heavy components
7. **Add loading states** for all async operations
8. **Implement error boundaries** to catch React errors
9. **Use CSS Grid** for day cards layout
10. **Add smooth scroll** behavior for better UX
