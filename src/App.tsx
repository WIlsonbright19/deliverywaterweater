import React, { useState, useEffect, useRef, useCallback } from 'react';
import heroWaterHeaterImg from './assets/images/hero_water_heater_editorial_1790887393048.jpg';
import waterHeaterManifoldImg from './assets/images/water_heater_manifold_sf_1790887933909.jpg';
import editorialPipeworkImg from './assets/images/editorial_pipework_detail_1790887404219.jpg';
import residentialFixtureImg from './assets/images/residential_fixture_valve_work_1790887946243.jpg';
import diagnosticValveImg from './assets/images/diagnostic_valve_inspection_1790889718474.jpg';
import drainTrapImg from './assets/images/drain_trap_precision_work_1790889730937.jpg';

type ServiceTopic = 'Water Heaters' | 'Plumbing Repairs' | 'Urgent Plumbing';
type ActionIntent = 'call' | 'service';
type ReviewCategory = 'Water Heaters' | 'Leaks & Pipes' | 'Toilets & Drains';

const SERVICES_DATA: Array<{
  num: string;
  id: string;
  title: ServiceTopic;
  description: string;
  delayMs: number;
}> = [
  {
    num: 'SERVICE 01',
    id: 'water-heaters',
    title: 'Water Heaters',
    description: 'Repair, replacement, and water-heater problems.',
    delayMs: 0
  },
  {
    num: 'SERVICE 02',
    id: 'plumbing-repairs',
    title: 'Plumbing Repairs',
    description: 'Leaks, toilets, drains, fixtures, and everyday plumbing issues.',
    delayMs: 80
  },
  {
    num: 'SERVICE 03',
    id: 'urgent-plumbing',
    title: 'Urgent Plumbing',
    description: 'Fast help when a plumbing problem cannot wait.',
    delayMs: 160
  }
];

const WATER_HEATER_SYSTEMS_ITEMS = [
  {
    num: '01',
    title: 'Tank Water Heaters',
    detail: 'Diagnosis and replacement for leaking tanks, pilot issues, and temperature drops.',
    delayMs: 0
  },
  {
    num: '02',
    title: 'Water Heater Connections',
    detail: 'Copper supply lines, shutoff valves, relief valves, and clean utility room fittings.',
    delayMs: 80
  },
  {
    num: '03',
    title: 'No-Hot-Water Calls',
    detail: 'Clear troubleshooting to determine whether a unit needs a part or full replacement.',
    delayMs: 160
  }
];

const RESIDENTIAL_CARE_ITEMS = [
  {
    num: '01',
    title: 'Leaks & Shutoff Valves',
    detail: 'Under-sink leaks, dripping shutoff stops, and supply line replacements.',
    delayMs: 0
  },
  {
    num: '02',
    title: 'Clogged Toilets & Drains',
    detail: 'Clearing blocked toilets, slow bathroom sinks, and main household drain backups.',
    delayMs: 80
  },
  {
    num: '03',
    title: 'Everyday Fixture Repairs',
    detail: 'Fixing running toilets, worn cartridges, and leaking kitchen or bath faucets.',
    delayMs: 160
  }
];

const LEAK_DIAGNOSIS_ITEMS = [
  {
    num: '01',
    title: 'Main & Branch Shutoffs',
    detail: 'Isolating active water leaks quickly and replacing seized or dripping shutoff valves.',
    delayMs: 0
  },
  {
    num: '02',
    title: 'Copper & Pipe Joint Repairs',
    detail: 'Repairing pinhole leaks, corroded fittings, and damaged supply lines.',
    delayMs: 80
  },
  {
    num: '03',
    title: 'Clear Upfront Answers',
    detail: 'Showing you where the leak started and explaining what it takes to fix it.',
    delayMs: 160
  }
];

const DRAIN_AND_TOILET_ITEMS = [
  {
    num: '01',
    title: 'Clogged & Running Toilets',
    detail: 'Clearing stubborn toilet blockages and replacing worn flappers, fill valves, and seals.',
    delayMs: 0
  },
  {
    num: '02',
    title: 'Kitchen & Bath Drains',
    detail: 'Restoring flow to slow or backed-up sinks, tubs, showers, and utility drains.',
    delayMs: 80
  },
  {
    num: '03',
    title: 'Traps & Under-Sink Piping',
    detail: 'Replacing corroded P-traps, tailpieces, and leaking waste connections.',
    delayMs: 160
  }
];

const PROCESS_STEPS: Array<{
  num: string;
  title: string;
  description: string;
  delayMs: number;
}> = [
  {
    num: '01',
    title: 'Call',
    description: "Tell us what's happening.",
    delayMs: 0
  },
  {
    num: '02',
    title: 'Diagnose',
    description: "Find the problem and explain what's next.",
    delayMs: 80
  },
  {
    num: '03',
    title: 'Fix',
    description: 'Get the plumbing working properly again.',
    delayMs: 160
  }
];

interface ClientReview {
  id: string;
  name: string;
  neighborhood: string;
  category: ReviewCategory;
  quote: string;
  serviceNote: string;
}

const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-01',
    name: 'David M.',
    neighborhood: 'Ocean Ave, SF',
    category: 'Water Heaters',
    quote:
      'Our garage water heater started pooling water in the morning. They came out, showed us the tank seam failure, and replaced the unit cleanly the same day.',
    serviceNote: 'Water heater replacement'
  },
  {
    id: 'rev-02',
    name: 'Elena R.',
    neighborhood: 'Ingleside, SF',
    category: 'Leaks & Pipes',
    quote:
      'Had a steady leak behind the laundry area wall. No sales pitch—just found the cracked copper fitting, explained the fix, and got the water back on.',
    serviceNote: 'Copper pipe leak repair'
  },
  {
    id: 'rev-03',
    name: 'Marcus T.',
    neighborhood: 'Sunset District, SF',
    category: 'Water Heaters',
    quote:
      'Woke up to cold water before work. They diagnosed the thermostat and pilot assembly right away and had hot water running before the afternoon.',
    serviceNote: 'Water heater repair'
  },
  {
    id: 'rev-04',
    name: 'Claire H.',
    neighborhood: 'West Portal, SF',
    category: 'Toilets & Drains',
    quote:
      'Main hallway toilet was completely backed up. Arrived when they said they would, cleared the blockage without leaving a mess, and checked the flush valve.',
    serviceNote: 'Clogged toilet & drain clearing'
  },
  {
    id: 'rev-05',
    name: 'Raymond K.',
    neighborhood: 'Noe Valley, SF',
    category: 'Water Heaters',
    quote:
      'Replaced an old water heater in a tight basement utility closet. New copper lines and shutoff valve look super clean and organized.',
    serviceNote: 'Basement water heater install'
  },
  {
    id: 'rev-06',
    name: 'Hannah S.',
    neighborhood: 'Glen Park, SF',
    category: 'Leaks & Pipes',
    quote:
      'A shutoff valve under our kitchen sink snapped and started spraying. Fast response and very calm, straightforward work to replace both angle stops.',
    serviceNote: 'Urgent shutoff valve replacement'
  },
  {
    id: 'rev-07',
    name: 'Victor L.',
    neighborhood: 'Excelsior, SF',
    category: 'Water Heaters',
    quote:
      'Appreciated how direct they were. Explained clearly why our tank was losing pressure, replaced the relief valve and expansion connection, and left the space spotless.',
    serviceNote: 'Water heater valve service'
  },
  {
    id: 'rev-08',
    name: 'Sophia W.',
    neighborhood: 'Bernal Heights, SF',
    category: 'Toilets & Drains',
    quote:
      'Our upstairs bathroom sink and tub were draining slowly for weeks. Cleared the line properly and tested everything before wrapping up.',
    serviceNote: 'Bathroom drain service'
  },
  {
    id: 'rev-09',
    name: 'Kenneth P.',
    neighborhood: 'Sunnyside, SF',
    category: 'Leaks & Pipes',
    quote:
      'Burst pipe fitting in our downstairs utility area. They got the water isolated quickly, replaced the damaged section, and checked the rest of the line.',
    serviceNote: 'Burst pipe repair'
  },
  {
    id: 'rev-10',
    name: 'Natalie C.',
    neighborhood: 'Richmond District, SF',
    category: 'Water Heaters',
    quote:
      'Needed a new water heater after our old one finally gave out. Straightforward communication from the first phone call to the final check.',
    serviceNote: 'Residential water heater replacement'
  },
  {
    id: 'rev-11',
    name: 'Arthur B.',
    neighborhood: 'Balboa Park, SF',
    category: 'Toilets & Drains',
    quote:
      'Fixed a constantly running toilet and a leaking supply connection in one visit. Practical, polite, and no wasted time.',
    serviceNote: 'Toilet repair & supply line'
  },
  {
    id: 'rev-12',
    name: 'Grace Y.',
    neighborhood: 'Miraloma Park, SF',
    category: 'Leaks & Pipes',
    quote:
      'Tracked down a ceiling drip coming from an upstairs bathroom connection. Clear explanation of what was wrong and a clean repair.',
    serviceNote: 'Leak diagnosis & repair'
  }
];

// Cubic-bezier(0.22, 1, 0.36, 1) evaluator for smooth programmatic scrolling (600-800ms)
function cubicBezier022(t: number): number {
  return 1 - Math.pow(1 - t, 3.4);
}

// Resilient Editorial Image with Zero-Broken-Image Fallback
const EditorialImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ src, alt, className = '', style }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={style}
        className={`flex flex-col justify-between bg-[#f5f5f5] border border-[#e0e0e0] p-6 text-[#080808] ${className}`}
      >
        <span className="wf-label text-[#080808]/60">DELIVERY WATER HEATER, INC.</span>
        <p className="wf-body text-[#080808]/80 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={style}
      className={className}
    />
  );
};

export default function App() {
  // Navigation scroll transition state (scroll > 40px) & Mobile/Tablet Slide-In Drawer state
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    'plumbing' | 'water-heaters' | 'residential' | 'reviews' | 'contact' | ''
  >('');

  // Viewport reveal states
  const [servicesVisible, setServicesVisible] = useState(false);
  const [whSystemsVisible, setWhSystemsVisible] = useState(false);
  const [proofVisible, setProofVisible] = useState(false);
  const [splitVisible, setSplitVisible] = useState(false);
  const [residentialVisible, setResidentialVisible] = useState(false);
  const [diagnosisVisible, setDiagnosisVisible] = useState(false);
  const [drainsVisible, setDrainsVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);

  // Subtle ~5% vertical parallax offsets for large editorial images on desktop
  const [splitParallax, setSplitParallax] = useState(0);
  const [whSystemsParallax, setWhSystemsParallax] = useState(0);
  const [residentialParallax, setResidentialParallax] = useState(0);
  const [diagnosisParallax, setDiagnosisParallax] = useState(0);
  const [drainsParallax, setDrainsParallax] = useState(0);

  // Interactive Request State (activated by Call Now / Get Service)
  const [actionIntent, setActionIntent] = useState<ActionIntent>('call');
  const [selectedService, setSelectedService] = useState<ServiceTopic>('Water Heaters');
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Section & Image Refs
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const whSystemsSectionRef = useRef<HTMLElement | null>(null);
  const whSystemsImageRef = useRef<HTMLDivElement | null>(null);
  const proofSectionRef = useRef<HTMLElement | null>(null);
  const splitSectionRef = useRef<HTMLElement | null>(null);
  const splitImageWrapperRef = useRef<HTMLDivElement | null>(null);
  const residentialSectionRef = useRef<HTMLElement | null>(null);
  const residentialImageRef = useRef<HTMLDivElement | null>(null);
  const diagnosisSectionRef = useRef<HTMLElement | null>(null);
  const diagnosisImageRef = useRef<HTMLDivElement | null>(null);
  const drainsSectionRef = useRef<HTMLElement | null>(null);
  const drainsImageRef = useRef<HTMLDivElement | null>(null);
  const processSectionRef = useRef<HTMLElement | null>(null);
  const reviewsSectionRef = useRef<HTMLElement | null>(null);
  const finalCtaSectionRef = useRef<HTMLElement | null>(null);
  const contactInputRef = useRef<HTMLInputElement | null>(null);

  // Dynamic Canonical & og:url resolution for any host (Netlify, custom domain, etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentUrl = window.location.origin + window.location.pathname;

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    let ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.setAttribute('content', currentUrl);
  }, []);

  // Lock body scroll when mobile/tablet drawer is open + close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
      }
    };

    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileDrawerOpen]);

  // Smooth scroll with 700ms duration and cubic-bezier(0.22, 1, 0.36, 1)
  const smoothScrollTo = useCallback((targetId: string, focusInput = false) => {
    setIsMobileDrawerOpen(false);

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const navOffset = 72;
    const startY = window.scrollY;
    const targetY = Math.max(
      0,
      targetEl.getBoundingClientRect().top + window.scrollY - navOffset
    );

    if (prefersReduced) {
      window.scrollTo(0, targetY);
      if (focusInput && contactInputRef.current) {
        contactInputRef.current.focus();
      }
      return;
    }

    const duration = 700;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = cubicBezier022(progress);
      window.scrollTo(0, startY + (targetY - startY) * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (focusInput && contactInputRef.current) {
        contactInputRef.current.focus({ preventScroll: true });
      }
    };

    requestAnimationFrame(step);
  }, []);

  const handlePrimaryCallAction = useCallback(
    (topic?: ServiceTopic) => {
      setActionIntent('call');
      if (topic) setSelectedService(topic);
      setRequestSubmitted(false);
      smoothScrollTo('contact', true);
    },
    [smoothScrollTo]
  );

  const handleGetServiceAction = useCallback(
    (topic?: ServiceTopic) => {
      setActionIntent('service');
      if (topic) setSelectedService(topic);
      setRequestSubmitted(false);
      smoothScrollTo('contact', true);
    },
    [smoothScrollTo]
  );

  // Scroll listener for Navigation (> 40px), active section, Reveal Triggers (82% and 70%), and 5% Parallax
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setServicesVisible(true);
      setWhSystemsVisible(true);
      setProofVisible(true);
      setSplitVisible(true);
      setResidentialVisible(true);
      setDiagnosisVisible(true);
      setDrainsVisible(true);
      setProcessVisible(true);
      setReviewsVisible(true);
      setFinalCtaVisible(true);
    }

    const computeParallax = (el: HTMLDivElement | null, vh: number): number => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        const centerProgress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
        const maxShift = rect.height * 0.05;
        return Math.max(-maxShift, Math.min(maxShift, centerProgress * maxShift * 1.5));
      }
      return 0;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Navigation scroll state (> 40px)
      setIsNavScrolled(scrollY > 40);

      // Section reveal at ~82% viewport height
      const trigger82 = vh * 0.82;
      // Final CTA reveal at ~70% viewport visibility
      const trigger70 = vh * 0.7;

      if (servicesSectionRef.current && !servicesVisible) {
        if (servicesSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setServicesVisible(true);
        }
      }

      if (whSystemsSectionRef.current && !whSystemsVisible) {
        if (whSystemsSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setWhSystemsVisible(true);
        }
      }

      if (proofSectionRef.current && !proofVisible) {
        if (proofSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setProofVisible(true);
        }
      }

      if (splitSectionRef.current && !splitVisible) {
        if (splitSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setSplitVisible(true);
        }
      }

      if (residentialSectionRef.current && !residentialVisible) {
        if (residentialSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setResidentialVisible(true);
        }
      }

      if (diagnosisSectionRef.current && !diagnosisVisible) {
        if (diagnosisSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setDiagnosisVisible(true);
        }
      }

      if (drainsSectionRef.current && !drainsVisible) {
        if (drainsSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setDrainsVisible(true);
        }
      }

      if (processSectionRef.current && !processVisible) {
        if (processSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setProcessVisible(true);
        }
      }

      if (reviewsSectionRef.current && !reviewsVisible) {
        if (reviewsSectionRef.current.getBoundingClientRect().top <= trigger82) {
          setReviewsVisible(true);
        }
      }

      if (finalCtaSectionRef.current && !finalCtaVisible) {
        if (finalCtaSectionRef.current.getBoundingClientRect().top <= trigger70) {
          setFinalCtaVisible(true);
        }
      }

      // Active navigation highlight
      const contactRect = finalCtaSectionRef.current?.getBoundingClientRect();
      const reviewsRect = reviewsSectionRef.current?.getBoundingClientRect();
      const whRect = whSystemsSectionRef.current?.getBoundingClientRect();
      const servicesRect = servicesSectionRef.current?.getBoundingClientRect();

      if (contactRect && contactRect.top <= vh * 0.5) {
        setActiveSection('contact');
      } else if (reviewsRect && reviewsRect.top <= vh * 0.5) {
        setActiveSection('reviews');
      } else if (whRect && whRect.top <= vh * 0.5) {
        setActiveSection('water-heaters');
      } else if (servicesRect && servicesRect.top <= vh * 0.5) {
        setActiveSection('plumbing');
      } else {
        setActiveSection('');
      }

      // Desktop-only subtle ~5% vertical parallax on large editorial images
      if (!prefersReduced && window.innerWidth >= 1024) {
        setSplitParallax(computeParallax(splitImageWrapperRef.current, vh));
        setWhSystemsParallax(computeParallax(whSystemsImageRef.current, vh));
        setResidentialParallax(computeParallax(residentialImageRef.current, vh));
        setDiagnosisParallax(computeParallax(diagnosisImageRef.current, vh));
        setDrainsParallax(computeParallax(drainsImageRef.current, vh));
      } else {
        setSplitParallax(0);
        setWhSystemsParallax(0);
        setResidentialParallax(0);
        setDiagnosisParallax(0);
        setDrainsParallax(0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [
    servicesVisible,
    whSystemsVisible,
    proofVisible,
    splitVisible,
    residentialVisible,
    diagnosisVisible,
    drainsVisible,
    processVisible,
    reviewsVisible,
    finalCtaVisible
  ]);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your name.');
      return;
    }

    if (!customerContact.trim() || customerContact.trim().length < 7) {
      setFormError('Please enter a valid phone number or email so we can reach you.');
      return;
    }

    if (!issueDescription.trim()) {
      setFormError("Please briefly describe what's happening.");
      return;
    }

    setRequestSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#080808] flex flex-col">
      {/* NAVIGATION — Minimal Webflow-inspired navigation with refined mobile/tablet header */}
      <header
        style={{
          backgroundColor: isNavScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: isNavScrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: isNavScrolled ? 'blur(10px)' : 'none',
          transform: isNavScrolled ? 'translateY(0)' : 'translateY(-3px)',
          borderBottom: isNavScrolled ? '1px solid #e0e0e0' : '1px solid transparent',
          transition:
            'background-color 250ms cubic-bezier(0.22, 1, 0.36, 1), transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 250ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}
        className="sticky top-0 z-50 w-full anim-nav-load"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-[14px] lg:py-[20px] flex items-center justify-between gap-[12px] lg:gap-[24px]">
          {/* Left: Styled Editorial Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('top');
            }}
            className="wf-logo shrink-0 focus-visible:outline-2 focus-visible:outline-[#146ef5]"
          >
            <span className="wf-logo-mark" aria-hidden="true">
              <span className="wf-logo-glyph">DW</span>
            </span>
            <span className="wf-logo-text">
              <span className="wf-logo-primary">Delivery</span>
              <span className="wf-logo-secondary">Water Heater, Inc.</span>
            </span>
          </a>

          {/* Center: Desktop Navigation Links (lg and above) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-[48px]"
          >
            <a
              href="#plumbing"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('plumbing');
                smoothScrollTo('plumbing');
              }}
              className={`wf-nav-link ${
                activeSection === 'plumbing' ? 'wf-nav-link-active' : ''
              }`}
            >
              Plumbing
            </a>
            <a
              href="#water-heater-systems"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('water-heaters');
                smoothScrollTo('water-heater-systems');
              }}
              className={`wf-nav-link ${
                activeSection === 'water-heaters' ? 'wf-nav-link-active' : ''
              }`}
            >
              Water Heaters
            </a>
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('reviews');
                smoothScrollTo('reviews');
              }}
              className={`wf-nav-link ${
                activeSection === 'reviews' ? 'wf-nav-link-active' : ''
              }`}
            >
              Reviews
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('contact');
                smoothScrollTo('contact');
              }}
              className={`wf-nav-link ${
                activeSection === 'contact' ? 'wf-nav-link-active' : ''
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Right: Desktop Primary Blue CTA + Mobile/Tablet Hamburger Toggle */}
          <div className="flex items-center gap-[10px] shrink-0">
            {/* Desktop Primary CTA */}
            <button
              type="button"
              onClick={() => handlePrimaryCallAction()}
              className="hidden lg:inline-flex wf-btn-primary"
            >
              Call Now
            </button>

            {/* Mobile & Tablet Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
              aria-expanded={isMobileDrawerOpen}
              aria-controls="wf-mobile-drawer"
              aria-label={isMobileDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden wf-hamburger-btn inline-flex flex-col items-center justify-center w-[40px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#080808] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#146ef5]"
            >
              <span
                style={{
                  transform: isMobileDrawerOpen
                    ? 'translateY(5px) rotate(45deg)'
                    : 'translateY(0) rotate(0)',
                  transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="w-[18px] h-[1.5px] bg-[#080808] block"
              />
              <span
                style={{
                  opacity: isMobileDrawerOpen ? 0 : 1,
                  transition: 'opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="w-[18px] h-[1.5px] bg-[#080808] block my-[3.5px]"
              />
              <span
                style={{
                  transform: isMobileDrawerOpen
                    ? 'translateY(-5px) rotate(-45deg)'
                    : 'translateY(0) rotate(0)',
                  transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                className="w-[18px] h-[1.5px] bg-[#080808] block"
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE & TABLET SLIDE-IN DRAWER */}
      <div
        id="wf-mobile-drawer"
        aria-hidden={!isMobileDrawerOpen}
        style={{
          pointerEvents: isMobileDrawerOpen ? 'auto' : 'none'
        }}
        className="fixed inset-0 z-50 lg:hidden"
      >
        {/* Subtle Backdrop */}
        <div
          onClick={() => setIsMobileDrawerOpen(false)}
          style={{
            opacity: isMobileDrawerOpen ? 1 : 0,
            transition: 'opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)'
          }}
          className="absolute inset-0 bg-[#080808]/30 backdrop-blur-[2px]"
        />

        {/* Slide-In Drawer Panel */}
        <aside
          aria-label="Mobile and Tablet Navigation Drawer"
          style={{
            transform: isMobileDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)'
          }}
          className="absolute top-0 right-0 h-full w-[84%] max-w-[360px] bg-[#ffffff] border-l border-[#e0e0e0] flex flex-col justify-between p-[24px]"
        >
          {/* Drawer Top Bar */}
          <div>
            <div className="flex items-center justify-between pb-[20px] border-b border-[#e0e0e0]">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('top');
                }}
                className="wf-logo"
              >
                <span className="wf-logo-mark" aria-hidden="true">
                  <span className="wf-logo-glyph">DW</span>
                </span>
                <span className="wf-logo-text">
                  <span className="wf-logo-primary">Delivery</span>
                  <span className="wf-logo-secondary">Water Heater, Inc.</span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                aria-label="Close menu"
                className="w-[38px] h-[38px] rounded-[4px] border border-[#e0e0e0] bg-[#f0f0f0] flex items-center justify-center text-[#080808] hover:bg-[#146ef5] hover:text-[#ffffff] hover:border-[#146ef5] transition-colors cursor-pointer"
              >
                <span className="text-[18px] leading-none">×</span>
              </button>
            </div>

            {/* Staggered Drawer Links */}
            <nav aria-label="Drawer Navigation" className="mt-[24px] flex flex-col">
              {(
                [
                  { label: 'Plumbing', target: 'plumbing', delay: 40 },
                  { label: 'Water Heaters', target: 'water-heater-systems', delay: 80 },
                  { label: 'Residential Care', target: 'residential-care', delay: 120 },
                  { label: 'Reviews', target: 'reviews', delay: 160 },
                  { label: 'Contact', target: 'contact', delay: 200 }
                ] as const
              ).map((item) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(item.target);
                  }}
                  style={{
                    opacity: isMobileDrawerOpen ? 1 : 0,
                    transform: isMobileDrawerOpen ? 'translateX(0)' : 'translateX(12px)',
                    transition: `opacity 320ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delay}ms, transform 320ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delay}ms, color 240ms cubic-bezier(0.22, 1, 0.36, 1), border-color 240ms cubic-bezier(0.22, 1, 0.36, 1), padding-left 240ms cubic-bezier(0.22, 1, 0.36, 1)`
                  }}
                  className="wf-drawer-link py-[16px] border-b border-[#e0e0e0] text-[20px] font-semibold text-[#080808] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="wf-drawer-arrow text-[14px] font-normal text-[#080808]/50">→</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Bottom Actions & SF Location */}
          <div className="pt-[24px] border-t border-[#e0e0e0] space-y-[20px]">
            <div className="flex flex-col gap-[10px]">
              <button
                type="button"
                onClick={() => handlePrimaryCallAction()}
                className="wf-btn-primary w-full"
              >
                Call Now
              </button>
              <button
                type="button"
                onClick={() => handleGetServiceAction()}
                className="wf-btn-secondary w-full border border-[#e0e0e0]"
              >
                Get Service
              </button>
            </div>

            <div className="text-[14px] leading-[22px] text-[#080808]">
              <p className="font-medium">248 Ocean Ave</p>
              <p>San Francisco, CA 94112</p>
            </div>
          </div>
        </aside>
      </div>

      <main id="top" className="flex-1">
        {/* HERO SECTION */}
        <section className="max-w-[1360px] mx-auto px-6 sm:px-12 pt-[48px] pb-[48px] lg:pt-[72px] lg:pb-[96px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-center">
            {/* Left Column: Oversized Editorial Headline & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="anim-hero-headline">
                <p className="wf-label text-[#080808] mb-[24px]">
                  SAN FRANCISCO PLUMBING
                </p>
                <h1 className="wf-hero-display">
                  <span className="block">Plumbing problems.</span>
                  <span className="block">Handled fast.</span>
                </h1>
              </div>

              <p className="wf-body text-[#080808] mt-[24px] max-w-[480px] anim-hero-support">
                Reliable plumbing service for water heaters, leaks, toilets, drains, and urgent plumbing problems.
              </p>

              <div className="mt-[48px] flex flex-wrap items-center gap-[10px] anim-hero-cta">
                <button
                  type="button"
                  onClick={() => handlePrimaryCallAction()}
                  className="wf-btn-primary"
                >
                  Call Now
                </button>
                <button
                  type="button"
                  onClick={() => handleGetServiceAction()}
                  className="wf-btn-secondary"
                >
                  Get Service
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Technical Water-Heater Image with Mask Reveal */}
            <div className="lg:col-span-5">
              <div className="wf-image-container overflow-hidden rounded-[8px] border border-[#e0e0e0] bg-[#f5f5f5] anim-hero-mask">
                <div className="anim-hero-img-scale">
                  <EditorialImage
                    src={heroWaterHeaterImg}
                    alt="Residential water heater installation with soldered copper pipework and brass shutoff valve in San Francisco"
                    className="w-full aspect-4/3 object-cover block wf-image-hover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="plumbing"
          ref={servicesSectionRef}
          className="border-t border-[#e0e0e0] bg-[#ffffff]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            {/* Section Header Group */}
            <div
              style={{
                opacity: servicesVisible ? 1 : 0,
                transform: servicesVisible
                  ? 'translateY(0)'
                  : 'translateY(calc(24px * var(--motion-scale)))',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              className="mb-[48px]"
            >
              <p className="wf-label text-[#080808] mb-[20px]">SERVICES</p>
              <h2 className="wf-headline-lg max-w-[720px]">
                Plumbing, without the runaround.
              </h2>
            </div>

            {/* Three Horizontal Editorial Service Blocks with Stagger (0ms, 80ms, 160ms) */}
            <div className="flex flex-col">
              {SERVICES_DATA.map((service) => (
                <div
                  key={service.id}
                  id={service.id}
                  onClick={() => handleGetServiceAction(service.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleGetServiceAction(service.title);
                    }
                  }}
                  style={{
                    opacity: servicesVisible ? 1 : 0,
                    transform: servicesVisible
                      ? undefined
                      : 'translateY(calc(20px * var(--motion-scale)))',
                    transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${service.delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${service.delayMs}ms, border-color 250ms cubic-bezier(0.22, 1, 0.36, 1)`
                  }}
                  className="wf-service-row py-[24px] lg:py-[48px] grid grid-cols-1 lg:grid-cols-12 gap-[20px] lg:gap-[24px] items-baseline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#146ef5]"
                >
                  <div className="lg:col-span-3">
                    <span className="wf-label text-[#080808]">{service.num}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="wf-headline-md wf-service-title">{service.title}</h3>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="wf-body text-[#080808]">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW IMAGE SECTION 1: WATER HEATER SYSTEMS & REPLACEMENTS */}
        <section
          id="water-heater-systems"
          ref={whSystemsSectionRef}
          className="border-t border-[#e0e0e0] bg-[#f5f5f5]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-center">
              {/* Left Column: Editorial Breakdown with Staggered Rows */}
              <div className="lg:col-span-6">
                <div
                  style={{
                    opacity: whSystemsVisible ? 1 : 0,
                    transform: whSystemsVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(24px * var(--motion-scale)))',
                    transition:
                      'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <p className="wf-label text-[#080808] mb-[20px]">WATER HEATERS</p>
                  <h2 className="wf-headline-lg">
                    Hot water restored properly.
                  </h2>
                  <p className="wf-body text-[#080808] mt-[24px] max-w-[520px]">
                    Whether a water heater is leaking in the garage or losing heat in a basement utility area, we inspect the unit and handle the repair or replacement cleanly.
                  </p>
                </div>

                <div className="mt-[48px] flex flex-col">
                  {WATER_HEATER_SYSTEMS_ITEMS.map((item) => (
                    <div
                      key={item.num}
                      onClick={() => handleGetServiceAction('Water Heaters')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleGetServiceAction('Water Heaters');
                        }
                      }}
                      style={{
                        opacity: whSystemsVisible ? 1 : 0,
                        transform: whSystemsVisible
                          ? undefined
                          : 'translateY(calc(20px * var(--motion-scale)))',
                        transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delayMs}ms, border-color 250ms cubic-bezier(0.22, 1, 0.36, 1)`
                      }}
                      className="wf-service-row py-[20px] grid grid-cols-1 sm:grid-cols-12 gap-[10px] sm:gap-[20px] items-baseline cursor-pointer"
                    >
                      <span className="sm:col-span-2 wf-label text-[#080808]">
                        {item.num}
                      </span>
                      <div className="sm:col-span-10 space-y-[6px]">
                        <h3 className="wf-headline-md wf-service-title">{item.title}</h3>
                        <p className="wf-body text-[#080808]">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Mask Reveal + Scroll Parallax Water Heater System Image */}
              <div className="lg:col-span-6">
                <div
                  ref={whSystemsImageRef}
                  style={{
                    clipPath: whSystemsVisible
                      ? 'inset(0 0 0% 0)'
                      : 'inset(0 0 100% 0)',
                    transition: 'clip-path 850ms cubic-bezier(0.22, 1, 0.36, 1) 100ms'
                  }}
                  className="wf-image-container overflow-hidden rounded-[8px] border border-[#e0e0e0] bg-[#ffffff]"
                >
                  <div
                    style={{
                      transform: `translate3d(0, ${whSystemsParallax.toFixed(1)}px, 0) scale(1.06)`,
                      transition: 'transform 120ms linear'
                    }}
                  >
                    <EditorialImage
                      src={waterHeaterManifoldImg}
                      alt="Residential water heater with clean copper water lines, brass shutoff valve, and seismic strapping in San Francisco"
                      className="w-full aspect-4/3 object-cover block wf-image-hover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF / TRUST SECTION */}
        <section
          ref={proofSectionRef}
          className="border-t border-[#e0e0e0] bg-[#ffffff]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            <div
              style={{
                opacity: proofVisible ? 1 : 0,
                transform: proofVisible
                  ? 'translateY(0)'
                  : 'translateY(calc(24px * var(--motion-scale)))',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-[48px] items-start"
            >
              <div className="lg:col-span-7">
                <h2 className="wf-headline-lg">When water can&apos;t wait.</h2>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-[10px]">
                <p className="wf-headline-md">Fast response.</p>
                <p className="wf-headline-md">Clear explanations.</p>
                <p className="wf-headline-md">Problems handled properly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EMERGENCY / PROBLEM SECTION — Editorial Split Section */}
        <section
          ref={splitSectionRef}
          className="border-t border-[#e0e0e0] bg-[#f5f5f5]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            <div
              style={{
                opacity: splitVisible ? 1 : 0,
                transform: splitVisible
                  ? 'translateY(0)'
                  : 'translateY(calc(24px * var(--motion-scale)))',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-center"
            >
              {/* Left: Large Technical Image with Subtle 5% Scroll Parallax */}
              <div className="lg:col-span-6">
                <div
                  ref={splitImageWrapperRef}
                  className="wf-image-container overflow-hidden rounded-[8px] border border-[#e0e0e0] bg-[#ffffff]"
                >
                  <div
                    style={{
                      transform: `translate3d(0, ${splitParallax.toFixed(1)}px, 0) scale(1.06)`,
                      transition: 'transform 120ms linear'
                    }}
                  >
                    <EditorialImage
                      src={editorialPipeworkImg}
                      alt="Plumbing technician adjusting a brass union on residential copper pipework"
                      className="w-full aspect-4/3 object-cover block wf-image-hover"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Restrained Editorial Copy & Action */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <p className="wf-label text-[#080808] mb-[20px]">WHEN IT MATTERS</p>
                <h2 className="wf-headline-lg">From leaks to water heaters.</h2>
                <div className="mt-[24px] space-y-[10px] max-w-[480px]">
                  <p className="wf-body text-[#080808]">
                    Plumbing problems can escalate quickly.
                  </p>
                  <p className="wf-body text-[#080808]">
                    Get the issue identified and handled before it becomes a bigger problem.
                  </p>
                </div>
                <div className="mt-[48px]">
                  <button
                    type="button"
                    onClick={() => handleGetServiceAction('Urgent Plumbing')}
                    className="wf-btn-primary"
                  >
                    Get Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW IMAGE SECTION 2: RESIDENTIAL REPAIRS, DRAINS & FIXTURES */}
        <section
          id="residential-care"
          ref={residentialSectionRef}
          className="border-t border-[#e0e0e0] bg-[#ffffff]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-center">
              {/* Left Column: Staggered Editorial Content */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div
                  style={{
                    opacity: residentialVisible ? 1 : 0,
                    transform: residentialVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(24px * var(--motion-scale)))',
                    transition:
                      'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <p className="wf-label text-[#080808] mb-[20px]">EVERYDAY PLUMBING</p>
                  <h2 className="wf-headline-lg">
                    Clean work inside your home.
                  </h2>
                  <p className="wf-body text-[#080808] mt-[24px] max-w-[520px]">
                    Leaking shutoff valves, backed-up toilets, and slow drains are handled with careful diagnosis and respect for your living space.
                  </p>
                </div>

                <div className="mt-[48px] flex flex-col">
                  {RESIDENTIAL_CARE_ITEMS.map((item) => (
                    <div
                      key={item.num}
                      onClick={() => handleGetServiceAction('Plumbing Repairs')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleGetServiceAction('Plumbing Repairs');
                        }
                      }}
                      style={{
                        opacity: residentialVisible ? 1 : 0,
                        transform: residentialVisible
                          ? undefined
                          : 'translateY(calc(20px * var(--motion-scale)))',
                        transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delayMs}ms, border-color 250ms cubic-bezier(0.22, 1, 0.36, 1)`
                      }}
                      className="wf-service-row py-[20px] grid grid-cols-1 sm:grid-cols-12 gap-[10px] sm:gap-[20px] items-baseline cursor-pointer"
                    >
                      <span className="sm:col-span-2 wf-label text-[#080808]">
                        {item.num}
                      </span>
                      <div className="sm:col-span-10 space-y-[6px]">
                        <h3 className="wf-headline-md wf-service-title">{item.title}</h3>
                        <p className="wf-body text-[#080808]">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Mask Reveal + Scroll Parallax Fixture Valve Image */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div
                  ref={residentialImageRef}
                  style={{
                    clipPath: residentialVisible
                      ? 'inset(0 0 0% 0)'
                      : 'inset(0 0 100% 0)',
                    transition: 'clip-path 850ms cubic-bezier(0.22, 1, 0.36, 1) 100ms'
                  }}
                  className="wf-image-container overflow-hidden rounded-[8px] border border-[#e0e0e0] bg-[#f5f5f5]"
                >
                  <div
                    style={{
                      transform: `translate3d(0, ${residentialParallax.toFixed(1)}px, 0) scale(1.06)`,
                      transition: 'transform 120ms linear'
                    }}
                  >
                    <EditorialImage
                      src={residentialFixtureImg}
                      alt="Plumber installing a chrome and brass shutoff valve and braided stainless supply line beneath a residential sink"
                      className="w-full aspect-4/3 object-cover block wf-image-hover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADDED IMAGE SECTION 3: LEAK & PIPE DIAGNOSIS */}
        <section
          id="leak-diagnosis"
          ref={diagnosisSectionRef}
          className="border-t border-[#e0e0e0] bg-[#f5f5f5]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-center">
              {/* Left Column: Mask Reveal + Scroll Parallax Valve & Pipe Diagnosis Image */}
              <div className="lg:col-span-6">
                <div
                  ref={diagnosisImageRef}
                  style={{
                    clipPath: diagnosisVisible
                      ? 'inset(0 0 0% 0)'
                      : 'inset(0 0 100% 0)',
                    transition: 'clip-path 850ms cubic-bezier(0.22, 1, 0.36, 1) 100ms'
                  }}
                  className="wf-image-container overflow-hidden rounded-[8px] border border-[#e0e0e0] bg-[#ffffff]"
                >
                  <div
                    style={{
                      transform: `translate3d(0, ${diagnosisParallax.toFixed(1)}px, 0) scale(1.06)`,
                      transition: 'transform 120ms linear'
                    }}
                  >
                    <EditorialImage
                      src={diagnosticValveImg}
                      alt="Plumbing technician inspecting a brass main water shutoff valve and copper pipe manifold in a San Francisco utility room"
                      className="w-full aspect-4/3 object-cover block wf-image-hover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Copy, Staggered Rows & CTA */}
              <div className="lg:col-span-6">
                <div
                  style={{
                    opacity: diagnosisVisible ? 1 : 0,
                    transform: diagnosisVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(24px * var(--motion-scale)))',
                    transition:
                      'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <p className="wf-label text-[#080808] mb-[20px]">LEAK &amp; PIPE DIAGNOSIS</p>
                  <h2 className="wf-headline-lg">
                    Find the source. Stop the damage.
                  </h2>
                  <p className="wf-body text-[#080808] mt-[24px] max-w-[520px]">
                    Active pipe leaks and faulty shutoff valves require calm, accurate troubleshooting. We trace the problem to the exact fitting or line and explain the repair before work begins.
                  </p>
                </div>

                <div className="mt-[48px] flex flex-col">
                  {LEAK_DIAGNOSIS_ITEMS.map((item) => (
                    <div
                      key={item.num}
                      onClick={() => handleGetServiceAction('Urgent Plumbing')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleGetServiceAction('Urgent Plumbing');
                        }
                      }}
                      style={{
                        opacity: diagnosisVisible ? 1 : 0,
                        transform: diagnosisVisible
                          ? undefined
                          : 'translateY(calc(20px * var(--motion-scale)))',
                        transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delayMs}ms, border-color 250ms cubic-bezier(0.22, 1, 0.36, 1)`
                      }}
                      className="wf-service-row py-[20px] grid grid-cols-1 sm:grid-cols-12 gap-[10px] sm:gap-[20px] items-baseline cursor-pointer"
                    >
                      <span className="sm:col-span-2 wf-label text-[#080808]">
                        {item.num}
                      </span>
                      <div className="sm:col-span-10 space-y-[6px]">
                        <h3 className="wf-headline-md wf-service-title">{item.title}</h3>
                        <p className="wf-body text-[#080808]">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    opacity: diagnosisVisible ? 1 : 0,
                    transform: diagnosisVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(16px * var(--motion-scale)))',
                    transition:
                      'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 220ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 220ms'
                  }}
                  className="mt-[48px] flex flex-wrap items-center gap-[10px]"
                >
                  <button
                    type="button"
                    onClick={() => handlePrimaryCallAction('Urgent Plumbing')}
                    className="wf-btn-primary"
                  >
                    Call Now
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGetServiceAction('Urgent Plumbing')}
                    className="wf-btn-secondary"
                  >
                    Get Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADDED IMAGE SECTION 4: DRAINS, TOILETS & UNDER-SINK PIPING */}
        <section
          id="drains-and-toilets"
          ref={drainsSectionRef}
          className="border-t border-[#e0e0e0] bg-[#ffffff]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-center">
              {/* Left Column: Editorial Copy, Staggered Rows & CTA */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div
                  style={{
                    opacity: drainsVisible ? 1 : 0,
                    transform: drainsVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(24px * var(--motion-scale)))',
                    transition:
                      'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <p className="wf-label text-[#080808] mb-[20px]">DRAINS &amp; TOILETS</p>
                  <h2 className="wf-headline-lg">
                    Keep everyday plumbing moving.
                  </h2>
                  <p className="wf-body text-[#080808] mt-[24px] max-w-[520px]">
                    Clogged toilets, slow sinks, and leaking drain traps disrupt the whole household. We clear blockages properly and replace worn traps, flush valves, and under-sink connections.
                  </p>
                </div>

                <div className="mt-[48px] flex flex-col">
                  {DRAIN_AND_TOILET_ITEMS.map((item) => (
                    <div
                      key={item.num}
                      onClick={() => handleGetServiceAction('Plumbing Repairs')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleGetServiceAction('Plumbing Repairs');
                        }
                      }}
                      style={{
                        opacity: drainsVisible ? 1 : 0,
                        transform: drainsVisible
                          ? undefined
                          : 'translateY(calc(20px * var(--motion-scale)))',
                        transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delayMs}ms, border-color 250ms cubic-bezier(0.22, 1, 0.36, 1)`
                      }}
                      className="wf-service-row py-[20px] grid grid-cols-1 sm:grid-cols-12 gap-[10px] sm:gap-[20px] items-baseline cursor-pointer"
                    >
                      <span className="sm:col-span-2 wf-label text-[#080808]">
                        {item.num}
                      </span>
                      <div className="sm:col-span-10 space-y-[6px]">
                        <h3 className="wf-headline-md wf-service-title">{item.title}</h3>
                        <p className="wf-body text-[#080808]">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    opacity: drainsVisible ? 1 : 0,
                    transform: drainsVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(16px * var(--motion-scale)))',
                    transition:
                      'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 220ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 220ms'
                  }}
                  className="mt-[48px] flex flex-wrap items-center gap-[10px]"
                >
                  <button
                    type="button"
                    onClick={() => handleGetServiceAction('Plumbing Repairs')}
                    className="wf-btn-primary"
                  >
                    Get Service
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrimaryCallAction('Plumbing Repairs')}
                    className="wf-btn-secondary"
                  >
                    Call Now
                  </button>
                </div>
              </div>

              {/* Right Column: Mask Reveal + Scroll Parallax Under-Sink P-Trap Image */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div
                  ref={drainsImageRef}
                  style={{
                    clipPath: drainsVisible
                      ? 'inset(0 0 0% 0)'
                      : 'inset(0 0 100% 0)',
                    transition: 'clip-path 850ms cubic-bezier(0.22, 1, 0.36, 1) 100ms'
                  }}
                  className="wf-image-container overflow-hidden rounded-[8px] border border-[#e0e0e0] bg-[#f5f5f5]"
                >
                  <div
                    style={{
                      transform: `translate3d(0, ${drainsParallax.toFixed(1)}px, 0) scale(1.06)`,
                      transition: 'transform 120ms linear'
                    }}
                  >
                    <EditorialImage
                      src={drainTrapImg}
                      alt="Newly installed polished chrome brass P-trap and shutoff valves inside a spotless residential sink cabinet"
                      className="w-full aspect-4/3 object-cover block wf-image-hover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section
          ref={processSectionRef}
          className="border-t border-[#e0e0e0] bg-[#f5f5f5]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            <div
              style={{
                opacity: processVisible ? 1 : 0,
                transform: processVisible
                  ? 'translateY(0)'
                  : 'translateY(calc(24px * var(--motion-scale)))',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              className="mb-[48px]"
            >
              <p className="wf-label text-[#080808] mb-[20px]">HOW IT WORKS</p>
              <h2 className="wf-headline-lg">Simple from the first call.</h2>
            </div>

            {/* Three Minimal Steps with Thin Borders & Sequential Reveal (0ms, 80ms, 160ms) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] lg:gap-[48px]">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.num}
                  style={{
                    opacity: processVisible ? 1 : 0,
                    transform: processVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(18px * var(--motion-scale)))',
                    transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${step.delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${step.delayMs}ms`
                  }}
                  className="border-t border-[#e0e0e0] pt-[24px] flex flex-col gap-[20px]"
                >
                  <span className="wf-label text-[#080808]">{step.num}</span>
                  <h3 className="wf-headline-md">{step.title}</h3>
                  <p className="wf-body text-[#080808]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW REVIEWS SECTION WITH MANY REVIEWS & MOTION EFFECTS */}
        <section
          id="reviews"
          ref={reviewsSectionRef}
          className="border-t border-[#e0e0e0] bg-[#ffffff] overflow-hidden"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 pt-[48px] lg:pt-[96px]">
            <div
              style={{
                opacity: reviewsVisible ? 1 : 0,
                transform: reviewsVisible
                  ? 'translateY(0)'
                  : 'translateY(calc(24px * var(--motion-scale)))',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-[24px] mb-[48px]"
            >
              <div>
                <p className="wf-label text-[#080808] mb-[20px]">REVIEWS</p>
                <h2 className="wf-headline-lg">
                  What San Francisco homeowners say.
                </h2>
              </div>
            </div>
          </div>

          {/* Motion Stream: Continuous Horizontal Ticker of San Francisco Reviews */}
          <div
            style={{
              opacity: reviewsVisible ? 1 : 0,
              transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 80ms'
            }}
            className="border-t border-[#e0e0e0] bg-[#f5f5f5] py-[24px] lg:py-[48px]"
            aria-label="Scrolling customer reviews stream"
          >
            <div className="wf-marquee-track gap-[24px] px-[12px]">
              {[...CLIENT_REVIEWS, ...CLIENT_REVIEWS].map((item, idx) => (
                <div
                  key={`${item.id}-ticker-${idx}`}
                  className="w-[320px] sm:w-[380px] shrink-0 bg-[#ffffff] border border-[#e0e0e0] rounded-[8px] p-[20px] flex flex-col justify-between mr-[24px]"
                >
                  <p className="wf-body text-[#080808]">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-[20px] pt-[12px] border-t border-[#e0e0e0] flex items-center justify-between text-[14px] text-[#080808]">
                    <span className="font-medium">{item.name}</span>
                    <span>
                      {item.neighborhood} · {item.serviceNote}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA & SERVICE REQUEST SECTION */}
        <section
          id="contact"
          ref={finalCtaSectionRef}
          className="border-t border-[#e0e0e0] bg-[#f5f5f5]"
        >
          <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px] lg:py-[96px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-start">
              {/* Left Column: High-Impact Final CTA */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <div
                  style={{
                    opacity: finalCtaVisible ? 1 : 0,
                    transform: finalCtaVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(28px * var(--motion-scale)))',
                    transition:
                      'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 0ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 0ms'
                  }}
                >
                  <h2 className="wf-hero-display">Need a plumber?</h2>
                  <p className="wf-body text-[#080808] mt-[24px]">
                    Let&apos;s get the problem handled.
                  </p>
                </div>

                <div
                  style={{
                    opacity: finalCtaVisible ? 1 : 0,
                    transform: finalCtaVisible
                      ? 'translateY(0)'
                      : 'translateY(calc(16px * var(--motion-scale)))',
                    transition:
                      'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 120ms'
                  }}
                  className="mt-[48px] flex flex-wrap items-center gap-[10px]"
                >
                  <button
                    type="button"
                    onClick={() => handlePrimaryCallAction()}
                    className="wf-btn-primary"
                  >
                    Call Now
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGetServiceAction()}
                    className="wf-btn-secondary"
                  >
                    Get Service
                  </button>
                </div>

                {/* Location Block */}
                <div className="mt-[48px] pt-[24px] border-t border-[#e0e0e0] w-full max-w-[360px]">
                  <p className="wf-label text-[#080808] mb-[10px]">
                    Delivery Water Heater, Inc.
                  </p>
                  <p className="wf-body text-[#080808]">248 Ocean Ave</p>
                  <p className="wf-body text-[#080808]">San Francisco, CA 94112</p>
                </div>
              </div>

              {/* Right Column: Flat Webflow Card for Callback / Service Dispatch */}
              <div className="lg:col-span-6">
                <div className="wf-card p-[24px] sm:p-[48px]">
                  {/* Mode Switcher */}
                  <div className="flex items-center gap-[10px] pb-[20px] mb-[24px] border-b border-[#e0e0e0]">
                    <button
                      type="button"
                      onClick={() => {
                        setActionIntent('call');
                        setRequestSubmitted(false);
                      }}
                      className={`wf-tab-btn flex-1 sm:flex-initial ${
                        actionIntent === 'call'
                          ? 'wf-tab-btn-active'
                          : 'wf-tab-btn-inactive'
                      }`}
                    >
                      Call Now
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActionIntent('service');
                        setRequestSubmitted(false);
                      }}
                      className={`wf-tab-btn flex-1 sm:flex-initial ${
                        actionIntent === 'service'
                          ? 'wf-tab-btn-active'
                          : 'wf-tab-btn-inactive'
                      }`}
                    >
                      Get Service
                    </button>
                  </div>

                  {requestSubmitted ? (
                    <div className="py-[24px] space-y-[20px]">
                      <p className="wf-label text-[#146ef5]">REQUEST RECEIVED</p>
                      <h3 className="wf-headline-md">We have your details.</h3>
                      <p className="wf-body text-[#080808]">
                        {actionIntent === 'call'
                          ? `We will call ${customerContact} regarding your ${selectedService.toLowerCase()} request.`
                          : `Your ${selectedService.toLowerCase()} service request for ${customerName} has been logged.`}
                      </p>
                      <div className="pt-[20px] border-t border-[#e0e0e0]">
                        <button
                          type="button"
                          onClick={() => {
                            setRequestSubmitted(false);
                            setIssueDescription('');
                          }}
                          className="wf-btn-secondary px-0 justify-start min-w-0"
                        >
                          Send another request
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitRequest} className="space-y-[20px]" noValidate>
                      <div>
                        <p className="wf-label text-[#080808] mb-[10px]">
                          {actionIntent === 'call'
                            ? 'Request an immediate call'
                            : 'Request plumbing service'}
                        </p>
                        <p className="wf-body text-[#080808]">
                          {actionIntent === 'call'
                            ? "Enter your number and tell us what's happening."
                            : 'Select the issue and let us know where in San Francisco you are located.'}
                        </p>
                      </div>

                      {/* Service Selector */}
                      <div>
                        <span className="block wf-label mb-[10px]">Service needed</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
                          {(
                            ['Water Heaters', 'Plumbing Repairs', 'Urgent Plumbing'] as const
                          ).map((topic) => (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => setSelectedService(topic)}
                              className={`wf-service-chip text-left px-[16px] py-[10px] rounded-[4px] border wf-body cursor-pointer ${
                                selectedService === topic
                                  ? 'border-[#146ef5] bg-[#146ef5] text-[#ffffff] font-medium'
                                  : 'border-[#e0e0e0] bg-[#f0f0f0] text-[#080808]'
                              }`}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                        <div>
                          <label htmlFor="wf-name" className="block wf-label mb-[10px]">
                            Name
                          </label>
                          <input
                            ref={contactInputRef}
                            id="wf-name"
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-[16px] py-[12px] rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#080808] wf-body focus:outline-none focus:border-[#146ef5]"
                          />
                        </div>

                        <div>
                          <label htmlFor="wf-contact" className="block wf-label mb-[10px]">
                            Phone or email
                          </label>
                          <input
                            id="wf-contact"
                            type="text"
                            value={customerContact}
                            onChange={(e) => setCustomerContact(e.target.value)}
                            placeholder="Callback phone or email"
                            className="w-full px-[16px] py-[12px] rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#080808] wf-body focus:outline-none focus:border-[#146ef5]"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="wf-address" className="block wf-label mb-[10px]">
                          San Francisco address or neighborhood (optional)
                        </label>
                        <input
                          id="wf-address"
                          type="text"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="e.g., Ocean Ave / Excelsior / Sunset"
                          className="w-full px-[16px] py-[12px] rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#080808] wf-body focus:outline-none focus:border-[#146ef5]"
                        />
                      </div>

                      <div>
                        <label htmlFor="wf-issue" className="block wf-label mb-[10px]">
                          What&apos;s happening?
                        </label>
                        <textarea
                          id="wf-issue"
                          rows={3}
                          value={issueDescription}
                          onChange={(e) => setIssueDescription(e.target.value)}
                          placeholder="Water heater leaking, no hot water, clogged toilet, pipe leak..."
                          className="w-full px-[16px] py-[12px] rounded-[4px] border border-[#e0e0e0] bg-[#ffffff] text-[#080808] wf-body focus:outline-none focus:border-[#146ef5]"
                        />
                      </div>

                      {formError && (
                        <p className="wf-body text-[#d92d20]">{formError}</p>
                      )}

                      <div className="pt-[10px]">
                        <button type="submit" className="wf-btn-primary">
                          {actionIntent === 'call' ? 'Call Now' : 'Get Service'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e0e0e0] bg-[#ffffff]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-12 py-[48px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] lg:gap-[48px] pb-[48px] border-b border-[#e0e0e0]">
            <div className="md:col-span-6 space-y-[16px]">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('top');
                }}
                className="wf-logo"
              >
                <span className="wf-logo-mark" aria-hidden="true">
                  <span className="wf-logo-glyph">DW</span>
                </span>
                <span className="wf-logo-text">
                  <span className="wf-logo-primary">Delivery</span>
                  <span className="wf-logo-secondary">Water Heater, Inc.</span>
                </span>
              </a>
              <address className="not-italic wf-body text-[#080808]">
                <div>248 Ocean Ave</div>
                <div>San Francisco, CA 94112</div>
              </address>
            </div>

            <div className="md:col-span-6 flex flex-wrap items-start md:justify-end gap-[24px] lg:gap-[48px]">
              <a
                href="#plumbing"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('plumbing');
                }}
                className="wf-nav-link"
              >
                Plumbing
              </a>
              <a
                href="#water-heater-systems"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('water-heater-systems');
                }}
                className="wf-nav-link"
              >
                Water Heaters
              </a>
              <a
                href="#reviews"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('reviews');
                }}
                className="wf-nav-link"
              >
                Reviews
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('contact');
                }}
                className="wf-nav-link"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="pt-[24px]">
            <p className="wf-body text-[#080808]">
              © Delivery Water Heater, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
