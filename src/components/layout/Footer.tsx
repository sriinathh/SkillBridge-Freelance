import { Link, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { navigate } from '@/lib/router';

const sections = [
  {
    title: 'For Clients',
    links: [
      { label: 'How to Hire', path: '/gigs' },
      { label: 'Browse Gigs', path: '/gigs' },
      { label: 'Post a Job', path: '/jobs' },
      { label: 'Enterprise', path: '/pricing' },
    ],
  },
  {
    title: 'For Freelancers',
    links: [
      { label: 'Find Work', path: '/jobs' },
      { label: 'Create a Gig', path: '/dashboard' },
      { label: 'Community', path: '/' },
      { label: 'Success Stories', path: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Blog', path: '/' },
      { label: 'Contact', path: '/' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', path: '/' },
      { label: 'Trust & Safety', path: '/' },
      { label: 'Privacy Policy', path: '/' },
      { label: 'Terms of Service', path: '/' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-200 dark:border-ink-800 bg-white/50 dark:bg-ink-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Link className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-ink-900 dark:text-white">
                Skill<span className="gradient-text">Bridge</span>
              </span>
            </button>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-4 max-w-xs">
              Connect. Hire. Build Together. The premium freelance marketplace for ambitious teams and talented freelancers.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <Icon className="w-4.5 h-4.5" />
                </button>
              ))}
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-semibold text-ink-900 dark:text-ink-50 mb-3">{s.title}</h4>
              <ul className="space-y-2">
                {s.links.map((l, i) => (
                  <li key={i}>
                    <button
                      onClick={() => navigate(l.path)}
                      className="text-sm text-ink-500 dark:text-ink-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-ink-200 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-400">
            (c) {new Date().getFullYear()} SkillBridge Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-xs text-ink-400 hover:text-ink-600 dark:hover:text-ink-200">Privacy</button>
            <button className="text-xs text-ink-400 hover:text-ink-600 dark:hover:text-ink-200">Terms</button>
            <button className="text-xs text-ink-400 hover:text-ink-600 dark:hover:text-ink-200">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
