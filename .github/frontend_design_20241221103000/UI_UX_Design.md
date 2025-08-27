# Griffin PF Deployment AI - UI/UX Design Guide

## Design Philosophy

The Griffin PF Deployment AI interface follows Microsoft's Fluent Design principles, emphasizing clarity, efficiency, and accessibility for IT professionals managing complex deployment workflows. The design balances information density with usability, providing powerful tools without overwhelming users.

## Visual Design System

### Color Palette
```css
/* Fluent UI v9 Color Tokens */
:root {
  /* Neutral Colors */
  --colorNeutralForeground1: #242424;      /* Primary text */
  --colorNeutralForeground2: #424242;      /* Secondary text */
  --colorNeutralForeground3: #616161;      /* Tertiary text */
  --colorNeutralBackground1: #ffffff;      /* Primary background */
  --colorNeutralBackground2: #f5f5f5;      /* Secondary background */
  --colorNeutralBackground3: #f0f0f0;      /* Tertiary background */
  
  /* Brand Colors */
  --colorBrandBackground: #0f6cbd;         /* Primary brand */
  --colorBrandBackgroundHover: #115ea3;    /* Brand hover */
  --colorBrandForeground1: #0f6cbd;        /* Brand text */
  
  /* Semantic Colors */
  --colorStatusSuccess: #107c10;           /* Success green */
  --colorStatusWarning: #ca5010;           /* Warning orange */
  --colorStatusDanger: #d13438;            /* Error red */
  --colorStatusInfo: #0078d4;              /* Info blue */
  
  /* Status-specific backgrounds */
  --colorStatusSuccessBackground: #dff6dd;
  --colorStatusWarningBackground: #fff4ce;
  --colorStatusDangerBackground: #fde7e9;
  --colorStatusInfoBackground: #e3f2fd;
}
```

### Typography Scale
```css
/* Fluent UI Typography Tokens */
.fluent-text-title1 {     /* 28px/36px - Page titles */
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
}

.fluent-text-title2 {     /* 20px/28px - Section headers */
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
}

.fluent-text-title3 {     /* 18px/24px - Subsection headers */
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
}

.fluent-text-body1 {      /* 14px/20px - Primary body text */
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.fluent-text-body2 {      /* 12px/16px - Secondary body text */
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.fluent-text-caption1 {   /* 12px/16px - Captions */
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--colorNeutralForeground2);
}

.fluent-text-monospace {  /* Code/version text */
  font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 13px;
  line-height: 18px;
}
```

### Spacing System
```css
/* Consistent spacing scale */
:root {
  --spacing-xs: 4px;      /* Tight spacing */
  --spacing-sm: 8px;      /* Small spacing */
  --spacing-md: 12px;     /* Medium spacing */
  --spacing-lg: 16px;     /* Large spacing */
  --spacing-xl: 24px;     /* Extra large spacing */
  --spacing-xxl: 32px;    /* Section spacing */
  --spacing-xxxl: 48px;   /* Page section spacing */
}
```

## Component Design Specifications

### 1. Navigation & Layout

#### Responsive Sidebar
```typescript
// Desktop: Fixed sidebar (256px wide)
// Tablet: Collapsible sidebar with hamburger
// Mobile: Overlay sidebar

const NavigationSidebar = {
  desktop: {
    width: '256px',
    position: 'fixed',
    background: 'var(--colorNeutralBackground1)',
    borderRight: '1px solid var(--colorNeutralStroke2)',
    boxShadow: 'var(--shadow2)'
  },
  mobile: {
    width: '256px',
    position: 'fixed',
    transform: 'translateX(-100%)', // Hidden by default
    transition: 'transform 0.3s ease',
    zIndex: 1000,
    overlay: {
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(2px)'
    }
  }
};
```

#### Header Navigation
```typescript
const AppHeader = {
  height: '56px',
  background: 'var(--colorNeutralBackground1)',
  borderBottom: '1px solid var(--colorNeutralStroke2)',
  elements: {
    breadcrumbs: {
      fontSize: '14px',
      color: 'var(--colorNeutralForeground2)',
      separator: 'ChevronRightIcon'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'var(--colorNeutralForeground1)'
    },
    actions: {
      gap: '12px',
      alignItems: 'center'
    }
  }
};
```

### 2. Data Display Components

#### Service/VE Cards
```typescript
interface CardDesignSpec {
  container: {
    background: 'var(--colorNeutralBackground1)';
    border: '1px solid var(--colorNeutralStroke2)';
    borderRadius: '8px';
    boxShadow: '0 1px 2px rgba(0,0,0,0.14), 0 0px 2px rgba(0,0,0,0.12)';
    padding: '24px';
    transition: 'all 0.2s cubic-bezier(0.33, 0, 0.67, 1)';
  };
  
  hover: {
    boxShadow: '0 2px 4px rgba(0,0,0,0.14), 0 0px 2px rgba(0,0,0,0.12)';
    borderColor: 'var(--colorNeutralStroke1)';
    cursor: 'pointer';
  };
  
  header: {
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'space-between';
    marginBottom: '16px';
  };
  
  icon: {
    width: '48px';
    height: '48px';
    borderRadius: '12px';
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
  };
  
  metrics: {
    display: 'grid';
    gridTemplateColumns: 'repeat(3, 1fr)';
    gap: '24px';
    textAlign: 'center';
  };
}
```

#### Status Indicators
```typescript
const StatusDesign = {
  success: {
    color: 'var(--colorStatusSuccess)',
    background: 'var(--colorStatusSuccessBackground)',
    icon: 'CheckCircleIcon',
    text: 'Ready to Deploy'
  },
  warning: {
    color: 'var(--colorStatusWarning)',
    background: 'var(--colorStatusWarningBackground)',
    icon: 'WarningIcon',
    text: 'Configuration Issue'
  },
  error: {
    color: 'var(--colorStatusDanger)',
    background: 'var(--colorStatusDangerBackground)',
    icon: 'ErrorCircleIcon',
    text: 'Deployment Failed'
  },
  info: {
    color: 'var(--colorStatusInfo)',
    background: 'var(--colorStatusInfoBackground)',
    icon: 'InfoIcon',
    text: 'In Progress'
  },
  neutral: {
    color: 'var(--colorNeutralForeground2)',
    background: 'var(--colorNeutralBackground3)',
    icon: 'CircleIcon',
    text: 'Not Deployed'
  }
};
```

### 3. Interactive Components

#### Primary Action Buttons
```typescript
const ButtonDesign = {
  primary: {
    background: 'var(--colorBrandBackground)',
    color: '#ffffff',
    border: '1px solid transparent',
    borderRadius: '4px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    minHeight: '32px',
    cursor: 'pointer',
    transition: 'all 0.1s cubic-bezier(0.33, 0, 0.67, 1)'
  },
  
  primaryHover: {
    background: 'var(--colorBrandBackgroundHover)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.14)'
  },
  
  secondary: {
    background: 'transparent',
    color: 'var(--colorNeutralForeground2)',
    border: '1px solid var(--colorNeutralStroke1)',
    borderRadius: '4px',
    padding: '8px 16px'
  },
  
  secondaryHover: {
    background: 'var(--colorNeutralBackground3)',
    color: 'var(--colorNeutralForeground1)'
  }
};
```

#### Data Tables
```typescript
const TableDesign = {
  container: {
    background: 'var(--colorNeutralBackground1)',
    border: '1px solid var(--colorNeutralStroke2)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  
  header: {
    background: 'var(--colorNeutralBackground2)',
    borderBottom: '1px solid var(--colorNeutralStroke2)',
    height: '40px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--colorNeutralForeground2)'
  },
  
  row: {
    height: '56px',
    borderBottom: '1px solid var(--colorNeutralStroke2)',
    padding: '0 24px',
    transition: 'background-color 0.1s ease'
  },
  
  rowHover: {
    background: 'var(--colorNeutralBackground2)'
  },
  
  cell: {
    fontSize: '14px',
    color: 'var(--colorNeutralForeground1)',
    verticalAlign: 'middle'
  }
};
```

### 4. Modal and Overlay Design

#### Modal Dialog
```typescript
const ModalDesign = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  
  container: {
    background: 'var(--colorNeutralBackground1)',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.14), 0 0px 2px rgba(0,0,0,0.12)',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'hidden',
    animation: 'modalSlideIn 0.2s cubic-bezier(0.33, 0, 0.67, 1)'
  },
  
  header: {
    padding: '24px 24px 0',
    borderBottom: '1px solid var(--colorNeutralStroke2)'
  },
  
  content: {
    padding: '24px',
    maxHeight: '60vh',
    overflowY: 'auto'
  },
  
  footer: {
    padding: '16px 24px 24px',
    borderTop: '1px solid var(--colorNeutralStroke2)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  }
};
```

## Page-Specific Design Guidelines

### 1. Dashboard Design

#### Layout Structure
```typescript
const DashboardLayout = {
  header: {
    title: 'Good morning, {userName}',
    subtitle: 'Here's what's happening with your virtual environments today.',
    spacing: 'var(--spacing-xxxl)'
  },
  
  statsCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--spacing-xl)',
    marginBottom: 'var(--spacing-xxxl)'
  },
  
  contentSections: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: 'var(--spacing-xxxl)'
  }
};
```

#### Stats Card Design
```typescript
const StatsCard = {
  structure: [
    'Icon (48x48px) + Value (32px, semibold)',
    'Horizontal separator (1px)',
    'Trend indicator + Badge'
  ],
  
  colors: {
    totalVEs: { icon: 'var(--colorStatusInfo)', background: '#e3f2fd' },
    activeServices: { icon: 'var(--colorStatusSuccess)', background: '#dff6dd' },
    deployments: { icon: 'var(--colorStatusWarning)', background: '#fff4ce' }
  },
  
  interactions: {
    hover: 'Subtle elevation increase',
    click: 'Navigate to relevant section'
  }
};
```

### 2. VE Management Design

#### Filter and Search Bar
```typescript
const SearchFilterDesign = {
  container: {
    background: 'var(--colorNeutralBackground1)',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: 'var(--spacing-xxxl)'
  },
  
  layout: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
    flexWrap: 'wrap'
  },
  
  searchInput: {
    minWidth: '320px',
    flex: '1',
    position: 'relative',
    icon: 'SearchIcon (16px, positioned left)'
  },
  
  filters: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    flexWrap: 'wrap'
  }
};
```

#### VE Cards Grid
```typescript
const VECardsGrid = {
  desktop: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: 'var(--spacing-xl)'
  },
  
  tablet: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'var(--spacing-lg)'
  },
  
  mobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-lg)'
  }
};
```

### 3. Service Detail Design

#### Pipeline Management Section
```typescript
const PipelineSection = {
  header: {
    title: 'Pipeline Management',
    subtitle: 'Manage build pipelines and deployment configurations',
    actions: ['Default pipeline indicator', 'Configuration button']
  },
  
  pipelineCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'var(--spacing-lg)'
  },
  
  pipelineCard: {
    structure: [
      'Header: Icon + Name + Status badge',
      'Description text',
      'Build information (version, drop URL)',
      'Actions: Set as default button'
    ],
    
    defaultPipeline: {
      border: '2px solid var(--colorBrandForeground1)',
      background: 'var(--colorStatusInfoBackground)'
    }
  }
};
```

#### Quick Deploy Section
```typescript
const QuickDeploySection = {
  background: 'var(--colorNeutralBackground1)',
  padding: 'var(--spacing-xl)',
  borderRadius: '8px',
  marginBottom: 'var(--spacing-xxxl)',
  
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 'var(--spacing-lg)'
  },
  
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
    flexWrap: 'wrap'
  },
  
  actions: {
    display: 'flex',
    gap: 'var(--spacing-md)'
  }
};
```

## Responsive Design Guidelines

### Breakpoint System
```css
/* Mobile First Approach */
:root {
  --bp-mobile: 320px;      /* Small phones */
  --bp-mobile-lg: 480px;   /* Large phones */
  --bp-tablet: 768px;      /* Tablets */
  --bp-desktop: 1024px;    /* Desktop */
  --bp-desktop-lg: 1440px; /* Large desktop */
}

/* Media Queries */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

### Responsive Patterns
```typescript
const ResponsivePatterns = {
  navigation: {
    mobile: 'Hamburger menu + overlay sidebar',
    tablet: 'Collapsible sidebar',
    desktop: 'Fixed sidebar'
  },
  
  dataDisplay: {
    mobile: 'Stack cards vertically, hide table columns',
    tablet: 'Show essential table columns, card grid 2 columns',
    desktop: 'Full table display, card grid 3+ columns'
  },
  
  modals: {
    mobile: 'Full screen modals',
    tablet: 'Centered modals with margins',
    desktop: 'Standard modal sizes'
  }
};
```

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
```typescript
const AccessibilityRequirements = {
  colorContrast: {
    normal: '4.5:1 minimum ratio',
    large: '3:1 minimum ratio (18px+ or 14px+ bold)',
    implementation: 'Use Fluent UI color tokens for compliance'
  },
  
  keyboardNavigation: {
    focusManagement: 'Visible focus indicators on all interactive elements',
    tabOrder: 'Logical tab sequence through interface',
    shortcuts: 'Standard keyboard shortcuts (Ctrl+F for search, etc.)',
    modals: 'Focus trap within modal dialogs'
  },
  
  screenReaders: {
    landmarks: 'Proper ARIA landmarks (main, nav, aside)',
    labels: 'Descriptive ARIA labels for all controls',
    announcements: 'Status updates announced via aria-live',
    tables: 'Proper table headers and captions'
  },
  
  motorImpairments: {
    targetSize: 'Minimum 44x44px touch targets',
    spacing: 'Adequate spacing between clickable elements',
    alternatives: 'Alternative input methods for drag/drop'
  }
};
```

### Screen Reader Optimizations
```typescript
const ScreenReaderPatterns = {
  dataTable: {
    structure: '<table role="table" aria-label="Services in VE">',
    headers: '<th scope="col" aria-sort="ascending">Service Name</th>',
    cells: '<td aria-describedby="status-help">Ready to Deploy</td>'
  },
  
  statusIndicators: {
    pattern: '<span role="status" aria-label="Service status: Ready to deploy">',
    liveRegion: '<div aria-live="polite" id="status-announcements">'
  },
  
  navigation: {
    landmarks: '<nav aria-label="Primary navigation">',
    breadcrumbs: '<nav aria-label="Breadcrumb">',
    skipLinks: '<a href="#main-content" class="skip-link">Skip to main content</a>'
  }
};
```

## Animation and Transitions

### Motion Guidelines
```css
/* Fluent UI Motion Tokens */
:root {
  --duration-ultra-fast: 50ms;      /* Micro-interactions */
  --duration-faster: 100ms;         /* Simple transitions */
  --duration-fast: 150ms;           /* Standard transitions */
  --duration-normal: 200ms;         /* Complex transitions */
  --duration-slow: 300ms;           /* Layout changes */
  
  --easing-accelerate: cubic-bezier(0.9, 0.1, 1, 0.2);
  --easing-decelerate: cubic-bezier(0.1, 0.9, 0.2, 1);
  --easing-standard: cubic-bezier(0.33, 0, 0.67, 1);
}

/* Animation Classes */
.fade-in {
  animation: fadeIn var(--duration-normal) var(--easing-decelerate);
}

.slide-up {
  animation: slideUp var(--duration-normal) var(--easing-decelerate);
}

.scale-in {
  animation: scaleIn var(--duration-fast) var(--easing-standard);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(16px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

### Loading States
```typescript
const LoadingStates = {
  skeleton: {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite'
  },
  
  spinner: {
    size: '20px',
    color: 'var(--colorBrandForeground1)',
    animation: 'spin 1s linear infinite'
  },
  
  progressBar: {
    height: '4px',
    background: 'var(--colorNeutralBackground3)',
    borderRadius: '2px',
    fill: 'var(--colorBrandForeground1)'
  }
};
```

## Error States and Messaging

### Error Message Design
```typescript
const ErrorDesign = {
  banner: {
    background: 'var(--colorStatusDangerBackground)',
    border: '1px solid var(--colorStatusDanger)',
    borderRadius: '8px',
    padding: 'var(--spacing-lg)',
    color: 'var(--colorStatusDanger)'
  },
  
  inline: {
    fontSize: '12px',
    color: 'var(--colorStatusDanger)',
    marginTop: 'var(--spacing-xs)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)'
  },
  
  emptyState: {
    textAlign: 'center',
    padding: 'var(--spacing-xxxl)',
    color: 'var(--colorNeutralForeground2)'
  }
};
```

This comprehensive UI/UX design guide ensures consistency, accessibility, and usability across the entire Griffin PF Deployment AI platform while maintaining alignment with Fluent UI v9 design principles.